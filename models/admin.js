import mongoose from "mongoose";

const def = {
  type: String,
  required: true
};

const adminSchema = mongoose.Schema({
  name: def,
  credential: {
    username: def,
    password: def
  }
});

const admin = mongoose.model('adminDB', adminSchema);

export default admin;