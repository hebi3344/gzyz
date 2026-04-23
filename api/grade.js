import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// 代码评分函数
const gradeCode = (code, expectedOutput, testCases) => {
  let score = 0;
  let feedback = [];
  
  // 检查代码是否有语法错误
  const syntaxCheck = checkSyntax(code);
  if (!syntaxCheck.success) {
    return {
      score: 0,
      feedback: ["代码存在语法错误: " + syntaxCheck.error],
      correct: false
    };
  }
  
  // 执行代码并检查结果
  let allCorrect = true;
  for (const testCase of testCases) {
    const result = executeCode(code, testCase.input);
    if (result.success) {
      if (result.output.trim() === testCase.expectedOutput.trim()) {
        score += 100 / testCases.length;
      } else {
        allCorrect = false;
        feedback.push(`测试用例 ${testCases.indexOf(testCase) + 1} 失败: 期望输出 "${testCase.expectedOutput}"，实际输出 "${result.output.trim()}"`);
      }
    } else {
      allCorrect = false;
      feedback.push(`测试用例 ${testCases.indexOf(testCase) + 1} 执行失败: ${result.error}`);
    }
  }
  
  // 代码质量评估
  const qualityScore = evaluateCodeQuality(code);
  score = Math.min(100, score + qualityScore);
  
  // 添加代码质量反馈
  if (qualityScore < 20) {
    feedback.push("代码质量需要改进: 考虑添加注释、优化变量命名和代码结构");
  } else if (qualityScore < 10) {
    feedback.push("代码质量较差: 缺少注释、变量命名不规范、代码结构混乱");
  }
  
  return {
    score: Math.round(score),
    feedback,
    correct: allCorrect && score >= 90
  };
};

// 检查代码语法
const checkSyntax = (code) => {
  const tempFileName = `syntax_${Date.now()}.py`;
  const tempFilePath = path.join('/tmp', tempFileName);
  
  try {
    fs.writeFileSync(tempFilePath, code);
    const pythonProcess = spawn('python3', ['-m', 'py_compile', tempFilePath]);
    
    let error = '';
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    pythonProcess.waitSync();
    
    fs.unlinkSync(tempFilePath);
    if (pythonProcess.exitCode === 0) {
      return { success: true, error: '' };
    } else {
      return { success: false, error };
    }
  } catch (err) {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    return { success: false, error: err.message };
  }
};

// 执行代码
const executeCode = (code, input) => {
  const tempFileName = `execute_${Date.now()}.py`;
  const tempFilePath = path.join('/tmp', tempFileName);
  
  try {
    fs.writeFileSync(tempFilePath, code);
    const pythonProcess = spawn('python3', [tempFilePath], {
      timeout: 2000, // 2秒超时
      killSignal: 'SIGINT'
    });
    
    let output = '';
    let error = '';
    
    // 输入测试数据
    if (input) {
      pythonProcess.stdin.write(input);
      pythonProcess.stdin.end();
    }
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    pythonProcess.waitSync();
    
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    return {
      success: pythonProcess.exitCode === 0,
      output,
      error
    };
  } catch (err) {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    return {
      success: false,
      output: '',
      error: err.message
    };
  }
};

// 评估代码质量
const evaluateCodeQuality = (code) => {
  let score = 20;
  
  // 检查注释
  const hasComments = code.includes('#');
  if (!hasComments) score -= 5;
  
  // 检查变量命名
  const variableNames = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
  const badNames = variableNames.filter(name => name.length <= 2 && !['i', 'j', 'k', 'x', 'y', 'z'].includes(name));
  if (badNames.length > 0) score -= Math.min(5, badNames.length);
  
  // 检查代码长度
  const lines = code.split('\n').length;
  if (lines > 50) score -= 2;
  if (lines > 100) score -= 3;
  
  // 检查代码复杂度
  const ifStatements = (code.match(/\bif\b/g) || []).length;
  const loops = (code.match(/\bfor\b|\bwhile\b/g) || []).length;
  const complexity = ifStatements + loops;
  if (complexity > 10) score -= 2;
  if (complexity > 20) score -= 3;
  
  return Math.max(0, score);
};

// 评分路由
router.post('/grade', (req, res) => {
  const { code, expectedOutput, testCases } = req.body;
  
  if (!code) {
    return res.json({ success: false, error: 'No code provided' });
  }
  
  if (!testCases || testCases.length === 0) {
    return res.json({ success: false, error: 'No test cases provided' });
  }
  
  try {
    const result = gradeCode(code, expectedOutput, testCases);
    res.json({
      success: true,
      score: result.score,
      feedback: result.feedback,
      correct: result.correct
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

export default router;