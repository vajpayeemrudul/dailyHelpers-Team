import express from "express";
import { 
  getCustomerData,
  addCustomer, 
  deleteCustomer,
  getCustomerDataWithId,
  bookService,
  removeCurrentService,
  updateCustomerDetails
} from '../controllers/customer.js';

const customerRouter = express.Router();

customerRouter.get('/', getCustomerData);
customerRouter.post('/', addCustomer);
customerRouter.get('/:id', getCustomerDataWithId);
customerRouter.post('/:id', removeCurrentService);
customerRouter.delete('/:id', deleteCustomer);
customerRouter.put('/:id', updateCustomerDetails);
customerRouter.get('/:cid/:sid', bookService);

export default customerRouter;