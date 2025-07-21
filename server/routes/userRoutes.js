import express from 'express';
import { clearkWebhooks } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clearkWebhooks);

export default userRouter;
