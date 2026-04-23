import express from 'express';
import cors from 'cors';
import runRouter from './run.js';
import gradeRouter from './grade.js';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api', runRouter);
app.use('/api', gradeRouter);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;