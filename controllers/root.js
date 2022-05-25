import Admin from "../models/admin.js";
import ServiceProvider from "../models/serviceProvider.js";
import Customer from "../models/customer.js";

export const authenticateUser = async (req, res) => {
  let credentials = {
    username: req.params.username,
    password: req.params.password
  }
  console.log(credentials);
  let adminData = await Admin.find({credential: credentials});
  if(adminData.length!=0) {
    res.status(200).json({
      message: 'Ok',
      id: adminData[0].id,
      position: 'Admin'
    })
    return;
  }

  let serviceProviderData = await ServiceProvider.find({credential: credentials});
  if(serviceProviderData.length!=0) {
    res.status(200).json({
      message: 'Ok',
      id: serviceProviderData[0].id,
      position: 'ServiceProvider'
    })
    return;
  }

  let customerData = await Customer.find({credential: credentials});
  if(customerData.length!=0) {
    res.status(200).json({
      message: 'Ok',
      id: customerData[0].id,
      position: 'Customer'
    })
    return;
  }

  res.status(200).json({
    message: 'Incorrect UserId or Password'
  })
}

export const createAccount = async (req, res) => {
  try {

  }
  catch (err) {
    
  }
}

export const Welcome = (req, res) => {
  res.status(200).send("Welcome to Daily Helpers API !!");
}