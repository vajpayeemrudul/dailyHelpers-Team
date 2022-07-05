import mongoose from "mongoose";

const def = {
  type: String,
  required: true
};

const customerSchema = mongoose.Schema({
  name: def,
  location: def,
  credential: {
    username: def,
    password: def
  },
  email: def,
  profileImg: String,
  currentService: {
    service: {type: String, default: ""},
    date: {type: Date, default: new Date()}
  },
  history: {type: [{ serviceProviderId: String, days: Number, charge: Number }], default: []}
});

const customer = mongoose.model('customerDB', customerSchema);

export default customer;