import Customer from "../models/customer.js";

export const authenticateUser = async (req, res) => {
  let credentials = {
    username: req.params.username,
    password: req.params.password
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

export const Welcome = (req, res) => {
  res.status(200).send("Welcome to Daily Helpers API !!");
}
