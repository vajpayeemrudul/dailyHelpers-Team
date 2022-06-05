import express from "express";
import { 
  getCustomerData,
  addCustomer, 
  deleteCustomer,
  getCustomerDataWithId,
  bookService,
  removeCurrentService
} from '../controllers/customer.js';

const customerRouter = express.Router();

customerRouter.get('/', getCustomerData);
customerRouter.post('/', addCustomer);
customerRouter.get('/:id', getCustomerDataWithId);
customerRouter.delete('/:id', deleteCustomer);
customerRouter.post('/:cid/:sid', bookService);
customerRouter.post('/:id', removeCurrentService);

export default customerRouter;