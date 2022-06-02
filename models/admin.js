import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  customerId: {type: String, required: true}
});

const admin = mongoose.model('adminDB', adminSchema);

export default admin;