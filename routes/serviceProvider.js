import express from "express";
import { 
  getServiceProviderData,
  deleteServiceProvider,
  getServiceProviderDataWithId,
  getServiceProviderDataWithService
} from '../controllers/serviceProvider.js';

const serviceProviderRouter = express.Router();

serviceProviderRouter.get('/', getServiceProviderData);
serviceProviderRouter.get('/:id', getServiceProviderDataWithId);
serviceProviderRouter.delete('/:id', deleteServiceProvider);
serviceProviderRouter.post('/search', getServiceProviderDataWithService);

export default serviceProviderRouter;