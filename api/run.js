import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/run', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.json({ success: false, output: '', error: 'No code provided' });
  }

  // 创建临时Python文件
  const tempFileName = `temp_${Date.now()}.py`;
  const tempFilePath = path.join('/tmp', tempFileName);
  
  try {
    fs.writeFileSync(tempFilePath, code);
    
    // 执行Python代码
    const pythonProcess = spawn('python3', [tempFilePath], {
      timeout: 3000, // 3秒超时
      killSignal: 'SIGINT'
    });
    
    let output = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // 清理临时文件
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      
      res.json({
        success: code === 0,
        output,
        error
      });
    });
    
    pythonProcess.on('error', (err) => {
      // 清理临时文件
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      
      res.json({
        success: false,
        output: '',
        error: `Error executing code: ${err.message}`
      });
    });
    
  } catch (err) {
    // 清理临时文件
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    
    res.json({
      success: false,
      output: '',
      error: `Error: ${err.message}`
    });
  }
});

export default router;