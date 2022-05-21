import mongoose from "mongoose";

const def = {
  type: String,
  required: true
};

const serviceProviderSchema = mongoose.Schema({
  name: def,
  service: def,
  approved: {type: Boolean, default: false},
  charge: {type: Number, default: 500, min: 200},
  location: def,
  credential: {
    username: def, 
    password: def
  },
  profileImg: def,
  status: {type: String, default: "available"}
});

const serviceProvider = mongoose.model('serviceProviderDB', serviceProviderSchema);

export default serviceProvider;