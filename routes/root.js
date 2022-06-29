import express from 'express';
import { authenticateUser, Welcome } from '../controllers/root.js';

const app = express.Router();

app.get('/', Welcome)
app.post('/', authenticateUser);
// app.post('/create', createAccount);

export default app;