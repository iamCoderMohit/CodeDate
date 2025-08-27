import express from 'express';
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import intrestRouter from './routes/intrest.route.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/intrest', intrestRouter);
export default app;
//# sourceMappingURL=app.js.map