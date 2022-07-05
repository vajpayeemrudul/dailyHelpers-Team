import Customer from "../models/customer.js";
import ServiceProvider from "../models/serviceProvider.js";

export const authenticateUser = async (req, res) => {
  let credentials = {
    username: req.body.username,
    password: req.body.password
  }

  let customerData = await Customer.find({credential: credentials});

  if(customerData.length!=0) {
    let serviceProviderData = await ServiceProvider.find({customerId: customerData[0].id.valueOf()});
    res.status(200).json({
      message: 'Ok',
      position: (serviceProviderData.length ? "ServiceProvider": "Customer"),
      customerData: customerData[0],
      serviceProviderData: serviceProviderData[0] || ""
    })
  }
  else {
    res.status(200).json({
      message: 'Incorrect UserId or Password'
    })
  }
}

export const Welcome = (req, res) => {
  res.status(200).send("Welcome to Daily Helpers API !!");
}
