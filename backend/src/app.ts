import express from 'express';
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import intrestRouter from './routes/intrest.route.js';

const app = express()
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/intrest', intrestRouter)

export default app