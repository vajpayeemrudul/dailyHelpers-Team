import express from 'express';
import { authenticateUser, createAccount, Welcome } from '../controllers/root.js';

const app = express.Router();

app.get('/:username/:password', authenticateUser);
app.post('/create', createAccount);
app.get('/', Welcome)

export default app;