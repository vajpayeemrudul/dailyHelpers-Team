import ServiceProvider from '../models/serviceProvider.js';
import Customer from '../models/customer.js';

export const getServiceProviderData = async (req, res) => {
  try {
    const serviceProviderData = await ServiceProvider.find();
    let data = [];
    for(let i=0; i<serviceProviderData.length; i++) {
      let curData = serviceProviderData[i];
      let customerData = await Customer.findById(curData.customerId);
      data.push({
        status: curData.status,
        approved: curData.approved,
        charge: curData.charge,
        customerId: curData.customerId,
        service: curData.service,
        location: customerData.location,
        email: customerData.email,
        name: customerData.name
      })
    }
    res.status(200).json(data);
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
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

export const getServiceProviderDataWithService = async (req, res) => {
  let service = req.body.service;
  try {
    const data = await Customer.find({ service: service });
    res.status(200).json(data);
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
