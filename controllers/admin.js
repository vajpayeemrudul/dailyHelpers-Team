import Admin from "../models/admin.js";

export const getAdminData = async (req, res) => {
  try {
    const data = await Admin.find();
    res.status(200).json(JSON.stringify(data));
  }
  catch (err) {
    res.status(404).json({message: err.message});
    console.log(err.message);
  }
}

export const getAdminDataWithId = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Admin.findById(id);
    res.status(200).json(JSON.stringify(data));
  }
  catch (err) {
    res.status(404).json({message: err.message});
    console.log(err.message);
  }
}

export const addAdmin = async (req, res) => {
  const { name, location, username, password, profileImg} = req.body;
  try {
    let admin = new Admin();
    admin.name = name;
    admin.location=location;
    admin.credential.username = username;
    admin.credential.password = password;
    admin.profileImg=profileImg;
    await admin.save();
    console.log("Data saved !!");
    res.status(200).json({ message: "Data Saved !!" });
  }
  catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err.message);
  }
}

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    await Admin.findByIdAndDelete(id);
    console.log("Admin deleted Successfully !!");
    res.status(200).json({ message: "Admin deleted Successfully !!" });
  }
  catch (err) {
    res.status(404).json({message1: err.message});
    console.log(err.message);
  }
}
