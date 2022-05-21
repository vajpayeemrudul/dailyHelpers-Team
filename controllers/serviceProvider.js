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
  const { name, service, charge, username, password, location, profileImg } = req.body;

  try {
    const serviceProvider = new ServiceProvider();
    serviceProvider.name = name;
    serviceProvider.service = service;
    serviceProvider.charge = charge;
    serviceProvider.credential.username = username;
    serviceProvider.credential.password = password;
    serviceProvider.location = location;
    serviceProvider.profileImg = profileImg;

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