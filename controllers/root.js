import Admin from "../models/admin.js";
import ServiceProvider from "../models/serviceProvider.js";
import Customer from "../models/customer.js";

export const authenticateUser = async (req, res) => {
  let credentials = {
    username: req.params.username,
    password: req.params.password
  }
  console.log(credentials);

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

// export const createAccount = async (req, res) => {
//   try {
//     let credentials = {
//       username: req.params.username,
//       password: req.params.password
//     }
//     let customer = new Customer();
//     customer.name = req.params.name;
//     customer.credential = credentials;
//     customer.location = req.params.location;
//     await customer.save();
//     console.log("data saved !!");

//     if(req.params.type === 'serviceprovider') {
//       // let serviceProvider = new ServiceProvider();
//       // serviceProvider.service = req.params.service;
//       // serviceProvider.charge = req.params.charge;
//       const data = await Customer.find({credentials: credentials});
//       console.log(data);
//     }

//     res.status(200).json({ message: 'Ok'});
//   }
//   catch (err) {
//     console.log(err.message);
//     res.status(404).json({ message: err.message });
//   }
// }

export const Welcome = (req, res) => {
  res.status(200).send("Welcome to Daily Helpers API !!");
}