import express from 'express';
import { authenticateUser, Welcome } from '../controllers/root.js';

const app = express.Router();

app.get('/', Welcome)
app.post('/', authenticateUser);

export default app;