import ServiceProvider from '../models/serviceProvider.js';

export const getServiceProviderData = async (req, res) => {
  try {
    const data = await ServiceProvider.find();
    res.status(200).send(JSON.stringify(data));
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const getServiceProviderDataWithId = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ServiceProvider.findById(id);
    res.status(200).send(JSON.stringify(data));
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const addServiceProvider = async (req, res) => {
  const { service, charge, id } = req.body;

  try {
    console.log(id);
    const serviceProvider = new ServiceProvider();
    serviceProvider.service = service;
    serviceProvider.charge = charge;
    serviceProvider.customerId = id;
    
    await serviceProvider.save();
    console.log("Data saved !!");
    res.status(200).json({ message: "Data saved !!" });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const deleteServiceProvider = async (req, res) => {
  const id = req.params.id;
  try {
    await ServiceProvider.findByIdAndDelete(id);
    console.log("Service Provider deleted Successfully !!");
    res.send(200).json({ message: "Service Provider deleted Successfully !!" });
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}