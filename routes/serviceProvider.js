import express from "express";
import { 
  getServiceProviderData,
  addServiceProvider, 
  deleteServiceProvider,
  getServiceProviderDataWithId
} from '../controllers/serviceProvider.js';

const serviceProviderRouter = express.Router();

serviceProviderRouter.get('/', getServiceProviderData);
serviceProviderRouter.post('/', addServiceProvider);
serviceProviderRouter.get('/:id', getServiceProviderDataWithId);
serviceProviderRouter.delete('/:id', deleteServiceProvider);

export default serviceProviderRouter;