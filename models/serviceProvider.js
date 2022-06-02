import mongoose from "mongoose";

const serviceProviderSchema = mongoose.Schema({
  customerId: {type: String, required: true},
  service: {type: String, required: true},
  charge: {type: Number, min: 200},
  status: {type: String, default: "available"},
  approved: {type: Boolean, default: false},
});

const serviceProvider = mongoose.model('serviceProviderDB', serviceProviderSchema);

export default serviceProvider;