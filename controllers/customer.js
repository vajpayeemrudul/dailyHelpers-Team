import Customer from '../models/customer.js';
import ServiceProvider from '../models/serviceProvider.js';

export const getCustomerData = async (req, res) => {
  try {
    const data = await Customer.find();
    res.status(200).json(data);
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

    res.status(200).json(data);
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const addCustomer = async (req, res) => {
  const { name, location, username, password, profileImg, email, service, charge } = req.body;

  try {
    const customer = new Customer();
    customer.name = name;
    customer.credential.username = username;
    customer.credential.password = password;
    customer.location = location;
    customer.email = email;
    customer.profileImg = profileImg;
    await customer.save();
    console.log("Customer data saved !!");

    if(service !== '') {
      const serviceProvider = new ServiceProvider();
      serviceProvider.customerId = customer._id.valueOf();
      serviceProvider.service = service;
      serviceProvider.charge = charge;
      await serviceProvider.save();
      console.log("Service Provider data saved !!");
    }
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
  const days = 0, charge = 0;
  try {
    const serviceProvider = await ServiceProvider.find({ customerId: serviceProviderId });
    const customer = await Customer.findById(customerId);
    console.log(serviceProvider[0]);
    console.log(customer);
    if(serviceProvider[0].status === 'available' && customer.currentService.service === '') {
      serviceProvider[0].status = "busy";
      customer.currentService.service = serviceProviderId;
      customer.history.push({
        serviceProviderId: serviceProviderId,
        days: days,
        charge: charge
      })
      await ServiceProvider.findByIdAndUpdate(serviceProvider[0]._id, { ...serviceProvider[0] });
      await Customer.findByIdAndUpdate(customer._id, { ...customer });
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
    const serviceProvider = await ServiceProvider.findById(customer.id);
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