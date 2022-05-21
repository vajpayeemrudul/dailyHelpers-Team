import express from "express";
import { 
  getAdminData, 
  getAdminDataWithId, 
  addAdmin, 
  deleteAdmin 
} from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.get('/', getAdminData);
adminRouter.post('/', addAdmin);
adminRouter.get('/:id', getAdminDataWithId);
adminRouter.delete('/:id', deleteAdmin);

export default adminRouter;
