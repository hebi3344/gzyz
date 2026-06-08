# 📊 数据分析学习平台

一个专为商务数据分析与应用专业学生设计的在线学习平台，提供完整的Python数据分析、统计分析、数据收集与预处理等课程学习体验。

![Platform Preview](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20data%20analysis%20learning%20platform%20interface&image_size=landscape_16_9)

---

## ✨ 核心特性

### 📚 完整课程体系
- **数据分析基础**: 数据分析概述、数据类型与结构、数据可视化
- **统计分析基础**: 描述性统计、概率分布、假设检验
- **数据收集与预处理**: 数据收集方法、数据清洗、特征工程
- **Python编程基础**: Python语法、数据结构、函数与模块

### 💻 交互式代码编辑器
- Monaco Editor集成
- Python语法高亮
- 10+数据科学代码片段
- 自动代码补全
- Python代码检查
- 一键代码格式化

### 🎯 智能评分系统
- 自动评分反馈
- 多维度评价
- 友好的错误提示
- 学习进度追踪
- 成就徽章系统

### 🎨 现代化用户体验
- 流畅的动画效果
- 响应式设计
- 面包屑导航
- 键盘快捷键
- Toast反馈机制
- 实时搜索过滤

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

---

## 📁 项目结构

```
/workspace
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Auth/        # 认证组件
│   │   ├── CodeEditor.tsx      # 代码编辑器
│   │   ├── CodeResult.tsx      # 代码结果展示
│   │   ├── CodeGradeResult.tsx # 评分结果展示
│   │   ├── Toast.tsx           # Toast提示
│   │   ├── Loading.tsx         # 加载组件
│   │   └── ErrorBoundary.tsx   # 错误边界
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx           # 首页
│   │   ├── Courses.tsx         # 课程中心
│   │   ├── CourseDetail.tsx   # 课程详情
│   │   ├── LessonContent.tsx   # 课程内容
│   │   ├── Learning.tsx       # 学习中心
│   │   ├── Profile.tsx         # 个人中心

│   ├── services/        # 服务层
│   │   ├── codeRunService.ts   # 代码运行服务
│   │   ├── codeGradeService.ts # 代码评分服务
│   │   └── recommendationService.ts # 推荐服务
│   ├── data/            # 数据层
│   │   └── courses.ts   # 课程内容数据
│   ├── store/            # 状态管理
│   │   └── useProgressStore.ts # 进度管理
│   ├── contexts/         # React上下文
│   │   └── FeedbackContext.tsx  # 反馈系统
│   ├── hooks/            # 自定义Hooks
│   │   ├── useAsync.ts      # 异步操作
│   │   ├── useRetry.ts      # 重试机制
│   │   └── useNetwork.ts    # 网络状态
│   ├── lib/              # 工具库
│   │   ├── utils.ts         # 通用工具
│   │   ├── errors.ts        # 错误类型定义
│   │   └── supabase.ts      # Supabase配置
│   └── App.tsx            # 应用入口
├── api/                  # 后端API
│   ├── server.js         # API服务器
│   ├── run.js           # 代码执行
│   └── grade.js         # 代码评分
├── public/              # 静态资源
├── tailwind.config.js   # Tailwind配置
└── vite.config.ts       # Vite配置

```

---

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **路由**: React Router v6
- **状态管理**: Zustand
- **代码编辑器**: Monaco Editor
- **后端服务**: Supabase

### 后端API
- **运行环境**: Node.js
- **代码执行**: Python subprocess
- **评分系统**: 自定义评分逻辑

---

## 📊 性能优化

### 已实施的优化
- ✅ 代码分割和懒加载
- ✅ 资源压缩和优化
- ✅ 首屏加载体积减少60%
- ✅ 加载速度提升57%
- ✅ React组件懒加载
- ✅ Vendor chunk分离

### 性能指标
| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首屏加载体积 | ~2.5MB | ~1.0MB | ↓60% |
| 首屏加载时间 | ~3.5s | ~1.5s | ↓57% |
| JS解析时间 | ~800ms | ~400ms | ↓50% |

---

## 🎨 用户体验

### 界面设计
- 渐变背景卡片
- 13种自定义动画效果
- 流畅的过渡动画
- 微交互动画

### 导航功能
- 面包屑导航
- 快速跳转 (Alt+J)
- 侧边栏折叠 (Alt+B)
- 上一节/下一节 (Alt+←/→)

### 键盘快捷键
| 快捷键 | 功能 |
|--------|------|
| Alt + J | 快速跳转 |
| Alt + B | 切换侧边栏 |
| Alt + ← | 上一节 |
| Alt + → | 下一节 |
| Ctrl + K | 搜索课程 |

---

## 🏆 成就系统

平台内置学习成就系统，激励学习者持续学习：

- 🎖️ **初学者**: 完成第一门课程
- 🔥 **坚持不懈**: 连续学习7天
- 📚 **知识达人**: 完成5个学习模块
- ⏱️ **学习达人**: 累计学习10小时
- 🎓 **课程完成者**: 完成3门课程
- 💯 **满分达人**: 测评成绩达到90分

---

## 📖 学习路径

### 入门阶段
1. Python编程基础
2. 数据分析基础
3. 统计分析基础

### 进阶阶段
4. 数据收集与预处理
5. 数据可视化
6. NumPy数据处理

### 高级阶段
7. Pandas数据处理
8. 机器学习入门
9. 项目实战

---

## 🔧 开发指南

### 添加新课程
1. 在 `src/data/courses.ts` 中添加课程数据
2. 更新课程ID映射
3. 添加对应的路由

### 自定义主题
编辑 `tailwind.config.js` 中的主题配置：
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
    },
  },
}
```

### 添加代码片段
在 `CodeEditor` 组件中修改 `customSnippets` 配置。

---

## 📝 文档

- [网站评分报告](./website-scoring-report.md) - 完整的产品评分和改进建议
- [优化指南](./OPTIMIZATION.md) - 性能优化最佳实践

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 👥 联系方式

- **项目主页**: https://github.com/hebi3344/gzyz
- **问题反馈**: https://github.com/hebi3344/gzyz/issues

---

**Made with ❤️ for data analysis learners**
