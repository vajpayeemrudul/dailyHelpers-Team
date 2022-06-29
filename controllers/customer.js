import Customer from '../models/customer.js';
import ServiceProvider from '../models/serviceProvider.js';

export const getCustomerData = async (req, res) => {
  try {
    const data = await Customer.find();
    res.status(200).send(JSON.stringify(data));
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const getCustomerDataWithId = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Customer.findById(id);

    res.status(200).send(JSON.stringify(data));
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const addCustomer = async (req, res) => {
  const { name, location, username, password, profileImg } = req.body;

  try {
    const customer = new Customer();
    customer.name = name;
    customer.credential.username = username;
    customer.credential.password = password;
    customer.location = location;
    customer.profileImg = profileImg;
    await customer.save();
    console.log("Data saved !!");
    res.status(200).json({ message: "Data saved !!", id: customer._id.valueOf() });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    await Customer.findByIdAndDelete(id);
    console.log("Customer deleted Successfully !!");
    res.send(200).json({ message: "Customer deleted Successfully !!" });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const bookService = async (req, res) => {
  const customerId = req.params.cid, serviceProviderId = req.params.sid;
  try {
    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    const customer = await Customer.findById(customerId);

    if(serviceProvider.status === "available" && customer.currentService === null) {
      serviceProvider.status = "busy";
      customer.currentService = serviceProvider.id;
      await serviceProvider.save();
      await customer.save();
      console.log("Booked");
      res.status(200).json({ message: "Booked" });
    }
    else {
      console.log("Not Available");
      res.status(200).json({ message: "Not Available" });
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const removeCurrentService = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findById(id);
    const serviceProvider = await ServiceProvider.findById(customer.currentService.service);
    serviceProvider.status = "available";
    let days = Math.ceil(Math.abs((new Date()) - customer.currentService.date) / (1000 * 60 * 60 * 24));
    customer.charge = customer.charge + days * serviceProvider.charge;
    customer.currentService.service = "";
    await serviceProvider.save();
    await customer.save();
    res.status(200).json({ message: "Done !!" });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const updateCustomerDetails = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      credential: {
        username: req.body.credential.username,
        password: req.body.credential.password
      },
      location: req.body.location,
      profileImg: req.body.profileImg
    }, (err, docs) => {
      console.log((err? err: docs));
    });
    
    const data = await ServiceProvider.find({ customerId: req.params.id });
    if(data.length > 0) {
      
    }

    console.log("Data updated !!");
    res.status(200).json({ message: "Data updated !!" });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}