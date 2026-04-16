import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../services/recommendationService';

const LessonContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const course = courses.find(c => c.id === courseId);

  const courseLessons = {
    '1': {
      title: '数据分析基础',
      chapters: [
        {
          title: '第一章：数据分析概述',
          lessons: [
            {
              title: '1.1 数据分析的定义和重要性',
              content: `
# 数据分析的定义和重要性

## 基础知识

### 什么是数据分析
数据分析是指用适当的统计分析方法对收集来的大量数据进行分析，提取有用信息和形成结论而对数据加以详细研究和概括总结的过程。

### 数据分析的类型
- **描述性分析**：描述过去发生的事情
- **诊断性分析**：解释为什么会发生
- **预测性分析**：预测未来可能发生的事情
- **规范性分析**：建议应该采取什么行动

## 重要知识

### 数据分析的重要性
1. 帮助企业做出更好的决策
2. 发现潜在的业务机会
3. 优化业务流程
4. 提高效率和降低成本
5. 预测未来趋势

### 数据分析在不同行业的应用
- 金融：风险评估、欺诈检测、投资分析
- 零售：客户行为分析、库存管理、销售预测
- 医疗：患者数据分析、疾病预测、医疗资源优化
- 制造：质量控制、生产优化、供应链管理

## 关键知识

### 数据分析的核心技能
1. 数据收集和处理能力
2. 统计分析能力
3. 数据可视化能力
4. 业务理解能力
5. 沟通表达能力

## 进阶知识

### 数据分析的挑战
- 数据质量问题
- 数据安全和隐私
- 分析结果的解读和应用
- 技术工具的选择和使用

## 课后练习

1. 请列举3个你认为数据分析可以解决的业务问题
2. 分析你所在行业中数据分析的应用场景
3. 思考如何将数据分析思维应用到你的学习和工作中
            `
            },
            {
              title: '1.2 数据分析的流程',
              content: `
# 数据分析的流程

## 基础知识

### 数据分析的基本步骤
1. **数据收集**：确定数据源并收集相关数据
2. **数据清洗**：处理缺失值、异常值和重复数据
3. **数据探索**：使用统计方法和可视化工具探索数据
4. **数据分析**：应用适当的分析方法
5. **结果解释**：解释分析结果
6. **决策支持**：将结果应用于业务决策

## 重要知识

### 数据收集的方法
- **问卷调查**：通过问卷收集数据
- **网络爬虫**：从网页收集数据
- **数据库查询**：从数据库提取数据
- **API调用**：通过API获取数据
- **日志分析**：分析系统日志

### 数据清洗的重要性
- 提高数据质量
- 减少分析误差
- 确保分析结果的可靠性

## 关键知识

### 数据探索的方法
- **描述性统计**：均值、中位数、标准差等
- **数据可视化**：直方图、散点图、箱线图等
- **相关性分析**：探索变量之间的关系

## 进阶知识

### 高级分析方法
- **统计推断**：从样本推断总体
- **机器学习**：使用算法自动学习模式
- **文本分析**：分析非结构化文本数据

## 课后练习

1. 描述一个你需要分析的实际问题，按照数据分析流程设计解决方案
2. 列举数据清洗中常见的问题及解决方法
3. 选择一个数据集，使用描述性统计和可视化方法进行探索性分析
            `
            }
          ]
        },
        {
          title: '第二章：数据收集与清洗',
          lessons: [
            {
              title: '2.1 数据收集的方法',
              content: `
# 数据收集的方法

## 基础知识

### 数据类型
- **结构化数据**：表格形式的数据，如Excel表格、数据库
- **半结构化数据**：有一定结构但不严格的数��，如JSON、XML
- **非结构化数据**：没有固定结构的数据，如文本、图像、音频

### 数据来源
- **内部数据**：企业内部产生的数据，如销售记录、客户信息
- **外部数据**：从外部获取的数据，如市场调研、公开数据集

## 重要知识

### 常见的数据收集方法
1. **问卷调查**：通过问卷收集数据
   - 设计原则：问题明确、逻辑清晰、长度适中
   - 分发渠道：线上、线下、电话

2. **网络爬虫**：从网页收集数据
   - 工具：Python的Requests、BeautifulSoup、Scrapy
   - 注意事项：遵守网站robots.txt规则，避免过度请求

3. **数据库查询**：从数据库提取数据
   - SQL语言：SELECT、FROM、WHERE、GROUP BY、ORDER BY
   - 优化技巧：使用索引、避免全表扫描

4. **API调用**：通过API获取数据
   - RESTful API：使用HTTP请求获取数据
   - 认证方式：API Key、OAuth

5. **日志分析**：分析系统日志
   - 日志格式：JSON、CSV、自定义格式
   - 分析工具：ELK Stack、Splunk

## 关键知识

### 数据收集的最佳实践
- 明确数据需求
- 选择合适的收集方法
- 确保数据质量
- 遵守数据伦理和法规

## 进阶知识

### 大规模数据收集
- 分布式爬虫
- 流数据处理
- 数据湖和数据仓库

## 课后练习

1. 设计一个问卷调查，收集关于学生学习习惯的数据
2. 使用Python编写一个简单的网络爬虫，从一个公开网站收集数据
3. 编写SQL查询语句，从数据库中提取特定条件的数据
            `
            },
            {
              title: '2.2 数据清洗技术',
              content: `
# 数据清洗技术

## 基础知识

### 数据清洗的定义
数据清洗是指识别并处理数据中的错误、缺失值、异常值和重复数据，以提高数据质量的过程。

### 数据质量问题类型
- **缺失值**：数据不完整
- **异常值**：与其他数据明显不同的值
- **重复数据**：相同的数据出现多次
- **不一致数据**：数据格式或内容不一致
- **错误数据**：明显错误的数据

## 重要知识

### 缺失值处理方法
1. **删除**：删除包含缺失值的行或列
   - 适用于缺失值比例较小的情况

2. **填充**：使用其他值填充缺失值
   - 均值/中位数/众数填充
   - 前向/后向填充
   - 基于模型的填充

3. **插值**：使用数学方法估计缺失值
   - 线性插值
   - 多项式插值
   - 样条插值

### 异常值检测方法
1. **统计方法**：
   - 箱线图方法：IQR（四分位距）
   - Z-score方法：基于正态分布

2. **机器学习方法**：
   - 孤立森林
   - One-class SVM
   - DBSCAN聚类

## 关键知识

### 重复数据处理
- 识别重复记录
- 保留一个记录，删除其他重复记录
- 合并重复记录中的信息

### 数据格式标准化
- 日期格式统一
- 数值格式统一
- 文本格式统一（大小写、拼写）

## 进阶知识

### 自动化数据清洗
- 使用脚本自动化清洗过程
- 建立数据质量监控系统
- 实施数据治理策略

## 课后练习

1. 给定一个包含缺失值的数据集，使用不同方法处理缺失值并比较结果
2. 识别并处理数据集中的异常值
3. 编写Python代码，自动化完成数据清洗的主要步骤
            `
            }
          ]
        }
      ]
    },
    '7': {
      title: 'Python编程基础',
      chapters: [
        {
          title: '第一章：Python入门',
          lessons: [
            {
              title: '1.1 Python简介',
              content: `
# Python简介

## 基础知识

### 什么是Python
Python是一种高级编程语言，具有简单易读的语法，广泛应用于数据分析、人工智能、Web开发等领域。

### Python的历史
- 1989年由Guido van Rossum创建
- 1991年发布第一个版本
- 2000年发布Python 2.0
- 2008年发布Python 3.0
- 2020年停止对Python 2的支持

## 重要知识

### Python的特点
1. **简单易学**：语法简洁，代码可读性高
2. **丰富的库和框架**：NumPy、Pandas、Matplotlib等
3. **强大的数据处理能力**：适合数据分析和科学计算
4. **跨平台**：可在Windows、macOS、Linux等系统上运行
5. **活跃的社区**：大量的文档和支持

### Python的应用领域
- **数据分析**：Pandas、NumPy、SciPy
- **人工智能**：TensorFlow、PyTorch、scikit-learn
- **Web开发**：Django、Flask、FastAPI
- **自动化**：脚本编写、测试自动化
- **游戏开发**：Pygame、PyOpenGL

## 关键知识

### Python的安装
- **官方网站**：https://www.python.org/
- **包管理工具**：pip
- **集成开发环境**：PyCharm、VS Code、Jupyter Notebook

### Python的版本
- **Python 3**：当前主流版本
- **Python 2**：已停止支持

## 进阶知识

### Python的生态系统
- **数据科学**：Anaconda、Jupyter生态
- **Web开发**：Django REST framework、Flask extensions
- **DevOps**：Ansible、Fabric

## 课后练习

1. 安装Python和一个集成开发环境
2. 编写你的第一个Python程序：Hello World
3. 探索Python的基本功能和特性
            `
            },
            {
              title: '1.2 Python基础语法',
              content: `
# Python基础语法

## 基础知识

### 变量和数据类型

\`\`\`python
# 定义变量
name = "数据分析"
age = 25
height = 1.75
is_student = True

# 数据类型
# 字符串(str)、整数(int)、浮点数(float)、布尔值(bool)
\`\`\`

### 运算符

\`\`\`python
# 算术运算符
x = 10 + 5  # 加法
x = 10 - 5  # 减法
x = 10 * 5  # 乘法
x = 10 / 5  # 除法
x = 10 // 5  # 整除
x = 10 % 5  # 取余
x = 10 ** 2  # 幂运算

# 比较运算符
x = 10 > 5  # 大于
x = 10 < 5  # 小于
x = 10 == 5  # 等于
x = 10 != 5  # 不等于

# 逻辑运算符
x = True and False  # 与
x = True or False  # 或
x = not True  # 非
\`\`\`

## 重要知识

### 控制流

\`\`\`python
# if语句
age = 18
if age >= 18:
    print("成年")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# for循环
for i in range(5):
    print(i)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### 函数

\`\`\`python
# 定义函数
def greet(name):
    """问候函数"""
    return f"Hello, {name}!"

# 调用函数
result = greet("World")
print(result)

# 带默认参数的函数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
\`\`\`

## 关键知识

### 数据结构

\`\`\`python
# 列表(list)
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")

# 元组(tuple)
coordinates = (10.0, 20.0)

# 字典(dict)
person = {"name": "John", "age": 30, "city": "New York"}

# 集合(set)
unique_numbers = {1, 2, 3, 4, 5}
\`\`\`

### 模块和包

\`\`\`python
# 导入模块
import math
print(math.pi)

# 从模块中导入特定函数
from math import sqrt
print(sqrt(16))

# 导入并给模块起别名
import numpy as np
\`\`\`

## 进阶知识

### 面向对象编程

\`\`\`python
# 定义类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name}"

# 创建对象
person = Person("John", 30)
print(person.greet())
\`\`\`

### 异常处理

\`\`\`python
try:
    x = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
except Exception as e:
    print(f"发生错误: {e}")
finally:
    print("无论是否发生错误，都会执行")
\`\`\`

## 课后练习

1. 编写一个Python程序，计算1到100的和
2. 编写一个函数，判断一个数是否为质数
3. 创建一个列表，包含10个随机数，并对其进行排序
4. 编写一个程序，统计一段文本中每个单词出现的次数
            `
            }
          ]
        },
        {
          title: '第二章：Python数据结构',
          lessons: [
            {
              title: '2.1 列表和元组',
              content: `
# 列表和元组

## 基础知识

### 列表(List)
列表是Python中最常用的数据结构之一，用于存储有序的元素集合。

\`\`\`python
# 创建列表
fruits = ["apple", "banana", "cherry"]

# 访问元素
print(fruits[0])  # 访问第一个元素
print(fruits[-1])  # 访问最后一个元素

# 切片
print(fruits[1:3])  # 访问索引1到2的元素
\`\`\`

### 元组(Tuple)
元组与列表类似，但元素不可修改。

\`\`\`python
# 创建元组
coordinates = (10.0, 20.0)

# 访问元素
print(coordinates[0])
\`\`\`

## 重要知识

### 列表操作

\`\`\`python
# 添加元素
fruits.append("orange")  # 在末尾添加
fruits.insert(1, "grape")  # 在指定位置插入

# 删除元素
fruits.remove("banana")  # 删除指定元素
fruits.pop()  # 删除末尾元素
fruits.pop(0)  # 删除指定位置元素

# 其他操作
fruits.sort()  # 排序
fruits.reverse()  # 反转
len(fruits)  # 获取长度
\`\`\`

### 列表推导式

\`\`\`python
# 创建平方数列表
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件的列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]
\`\`\`

## 关键知识

### 列表和元组的区别
- **可变性**：列表可变，元组不可变
- **性能**：元组访问速度更快
- **内存**：元组占用内存更少
- **用途**：列表用于需要修改的数据，元组用于不需要修改的数据

### 嵌套数据结构

\`\`\`python
# 嵌套列表
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[0][1])  # 访问第一行第二列元素

# 列表和元组的组合
data = [("John", 30), ("Alice", 25), ("Bob", 35)]
\`\`\`

## 进阶知识

### 高级列表操作

\`\`\`python
# 列表去重
numbers = [1, 2, 2, 3, 4, 4, 5]
unique_numbers = list(set(numbers))
print(unique_numbers)  # [1, 2, 3, 4, 5]

# 列表合并
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# 列表复制
list_copy = list1.copy()
# 或
list_copy = list1[:]
\`\`\`

## 课后练习

1. 创建一个包含10个元素的列表，然后进行添加、删除、修改操作
2. 使用列表推导式创建一个包含1到20之间所有偶数的列表
3. 编写一个函数，接受一个列表，返回列表中的最大值和最小值
4. 创建一个嵌套列表，表示一个3x3的矩阵，然后计算矩阵的转置
            `
            },
            {
              title: '2.2 字典和集合',
              content: `
# 字典和集合

## 基础知识

### 字典(Dict)
字典是一种键值对数据结构，用于存储映射关系。

\`\`\`python
# 创建字典
person = {"name": "John", "age": 30, "city": "New York"}

# 访问值
print(person["name"])
print(person.get("age"))

# 修改值
person["age"] = 31

# 添加新键值对
person["job"] = "Engineer"
\`\`\`

### 集合(Set)
集合是一种无序的、不重复的元素集合。

\`\`\`python
# 创建集合
fruits = {"apple", "banana", "cherry"}

# 添加元素
fruits.add("orange")

# 删除元素
fruits.remove("banana")
\`\`\`

## 重要知识

### 字典操作

\`\`\`python
# 获取所有键
keys = person.keys()

# 获取所有值
values = person.values()

# 获取所有键值对
items = person.items()

# 检查键是否存在
if "name" in person:
    print("Name exists")

# 删除键值对
del person["city"]
\`\`\`

### 集合操作

\`\`\`python
# 集合运算
a = {1, 2, 3}
b = {3, 4, 5}

# 并集
print(a | b)  # {1, 2, 3, 4, 5}

# 交集
print(a & b)  # {3}

# 差集
print(a - b)  # {1, 2}

# 对称差集
print(a ^ b)  # {1, 2, 4, 5}
\`\`\`

## 关键知识

### 字典推导式

\`\`\`python
# 创建字典
numbers = {x: x**2 for x in range(5)}
print(numbers)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 带条件的字典推导式
even_numbers = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_numbers)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
\`\`\`

### 集合推导式

\`\`\`python
# 创建集合
squares = {x**2 for x in range(10)}
print(squares)  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# 带条件的集合推导式
even_squares = {x**2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0, 64, 4, 36, 16}
\`\`\`

## 进阶知识

### 高级字典操作

\`\`\`python
# 合并字典
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
merged = {**dict1, **dict2}
print(merged)  # {"a": 1, "b": 3, "c": 4}

# 字典排序
sorted_dict = dict(sorted(person.items(), key=lambda item: item[1]))
\`\`\`

### 集合的应用场景
- **去重**：快速去除重复元素
- **成员检测**：快速检查元素是否存在
- **数学集合运算**：并集、交集、差集等

## 课后练习

1. 创建一个字典，存储5个学生的姓名和成绩，然后计算平均成绩
2. 使用字典推导式创建一个字典，包含1到10的数字及其对应的平方
3. 给定两个列表，使用字典推导式创建一个映射关系
4. 使用集合对一个列表进行去重操作
5. 计算两个集合的并集、交集和差集
            `
            }
          ]
        }
      ]
    },
    '4': {
      title: 'Python数据分析',
      chapters: [
        {
          title: '第一章：Python数据分析概述',
          lessons: [
            {
              title: '1.1 Python数据分析生态系统',
              content: `
# Python数据分析生态系统

## 基础知识

### Python数据分析的优势
- **强大的库支持**：NumPy、Pandas、Matplotlib等
- **简洁易读的语法**：减少代码量，提高开发效率
- **丰富的社区资源**：大量的文档和示例
- **跨平台兼容性**：可在多种操作系统上运行

### 常用的Python数据分析库
- **NumPy**：数值计算库，提供多维数组和矩阵操作
- **Pandas**：数据分析库，提供DataFrame等数据结构
- **Matplotlib**：数据可视化库，用于创建图表
- **Seaborn**：基于Matplotlib的统计数据可视化库
- **SciPy**：科学计算库，提供统计分析、优化等功能
- **scikit-learn**：机器学习库，提供各种算法

## 重要知识

### 数据科学生态系统

#### 数据获取和存储
- **SQLAlchemy**：数据库ORM
- **PyMySQL**：MySQL数据库接口
- **psycopg2**：PostgreSQL数据库接口
- **pymongo**：MongoDB数据库接口

#### 数据处理和分析
- **Pandas**：数据清洗、转换、分析
- **NumPy**：数值计算
- **SciPy**：科学计算
- **Dask**：大规模数据处理

#### 数据可视化
- **Matplotlib**：基础可视化库
- **Seaborn**：统计数据可视化
- **Plotly**：交互式可视化
- **Bokeh**：交互式Web可视化
- **Altair**：声明式可视化

#### 机器学习
- **scikit-learn**：传统机器学习算法
- **TensorFlow**：深度学习框架
- **PyTorch**：深度学习框架
- **XGBoost**：梯度提升算法

## 关键知识

### 环境配置

#### Anaconda
- 提供了Python和常用数据科学库的发行版
- 包含conda包管理工具
- 支持创建隔离的环境

#### Jupyter Notebook
- 交互式计算环境
- 支持代码、文本、图像等混合编辑
- 便于数据探索和分析报告生成

#### JupyterLab
- 更强大的交互式开发环境
- 支持多文档界面
- 集成了更多功能

## 进阶知识

### 高级数据分析工具
- **Apache Spark**：大规模数据处理
- **Apache Airflow**：工作流编排
- **Prefect**：现代工作流管理
- **MLflow**：机器学习生命周期管理

### 数据科学最佳实践
- **版本控制**：使用Git管理代码
- **数据版本控制**：使用DVC等工具
- **代码质量**：使用pytest、flake8等工具
- **容器化**：使用Docker部署

## 课后练习

1. 安装Anaconda并创建一个数据科学环境
2. 启动Jupyter Notebook并创建一个新的笔记本
3. 导入常用的数据分析库并检查版本
4. 探索Python数据分析库的文档和示例
            `
            },
            {
              title: '1.2 数据分析工作流程',
              content: `
# 数据分析工作流程

## 基础知识

### 典型的数据分析工作流程
1. **问题定义**：明确分析目标和问题
2. **数据收集**：获取相关数据
3. **数据清洗**：处理缺失值、异常值等
4. **数据探索**：了解数据结构和特征
5. **特征工程**：创建和选择特征
6. **模型构建**：选择和训练模型
7. **模型评估**：评估模型性能
8. **结果解释**：解释分析结果
9. **部署和监控**：部署模型并监控效果

## 重要知识

### 数据探索步骤

#### 数据概览
- 查看数据形状（行数和列数）
- 查看数据类型
- 查看前几行数据
- 查看数据统计摘要

#### 数据质量检查
- 检查缺失值
- 检查异常值
- 检查重复值
- 检查数据一致性

#### 数据可视化
- 单变量可视化：直方图、箱线图等
- 双变量可视化：散点图、相关热力图等
- 多变量可视化：平行坐标图等

### 特征工程

#### 特征创建
- 数值特征：对数变换、标准化等
- 类别特征：独热编码、标签编码等
- 时间特征：提取年、月、日等
- 文本特征：词袋模型、TF-IDF等

#### 特征选择
- 过滤法：相关系数、方差分析等
- 包装法：递归特征消除等
- 嵌入法：使用模型系数等

## 关键知识

### 模型选择

#### 监督学习
- **分类**：逻辑回归、决策树、随机森林、SVM等
- **回归**：线性回归、 Ridge回归、Lasso回归、随机森林回归等

#### 无监督学习
- **聚类**：K-means、层次聚类、DBSCAN等
- **降维**：PCA、t-SNE、UMAP等
- **关联规则**：Apriori算法等

### 模型评估指标

#### 分类模型
- 准确率（Accuracy）
- 精确率（Precision）
- 召回率（Recall）
- F1分数（F1-Score）
- ROC曲线和AUC

#### 回归模型
- 均方误差（MSE）
- 均方根误差（RMSE）
- 平均绝对误差（MAE）
- R²分数

## 进阶知识

### 高级分析技术
- **时间序列分析**：ARIMA、Prophet等
- **文本分析**：情感分析、主题建模等
- **图像分析**：卷积神经网络等
- **推荐系统**：协同过滤、内容推荐等

### 模型部署
- **API部署**：使用Flask、FastAPI等
- **批处理部署**：使用Airflow等
- **实时部署**：使用Kafka、Spark Streaming等

## 课后练习

1. 描述一个你感兴趣的数据分析问题，并设计完整的分析流程
2. 使用Python进行数据探索，包括数据概览、质量检查和可视化
3. 为一个分类问题选择合适的模型并进行评估
4. 为一个回归问题选择合适的模型并进行评估
            `
            }
          ]
        },
        {
          title: '第二章：NumPy基础',
          lessons: [
            {
              title: '2.1 NumPy数组基础',
              content: `
# NumPy数组基础

## 基础知识

### 什么是NumPy
NumPy（Numerical Python）是Python的一个核心库，用于科学计算，提供了高效的多维数组对象和相关操作。

### NumPy数组的优势
- **高效存储**：比Python列表更节省内存
- **快速计算**：底层使用C实现，计算速度快
- **广播功能**：支持不同形状数组之间的运算
- **丰富的数学函数**：提供大量数学运算函数

## 重要知识

### 创建NumPy数组

\`\`\`python
import numpy as np

# 从列表创建
arr1 = np.array([1, 2, 3, 4, 5])

# 创建指定形状的数组
arr2 = np.zeros((3, 4))  # 创建3x4的全0数组
arr3 = np.ones((2, 3))   # 创建2x3的全1数组
arr4 = np.full((2, 2), 7)  # 创建2x2的全7数组
arr5 = np.arange(0, 10, 2)  # 创建0到10（不包含）步长为2的数组
arr6 = np.linspace(0, 1, 5)  # 创建0到1之间的5个等间隔数
arr7 = np.random.rand(2, 3)  # 创建2x3的随机数组
\`\`\`

### 数组属性

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)  # 数组形状
print(arr.ndim)   # 数组维度
print(arr.size)   # 数组元素个数
print(arr.dtype)  # 数组数据类型
\`\`\`

## 关键知识

### 数组索引和切片

\`\`\`python
# 一维数组索引
arr = np.array([1, 2, 3, 4, 5])
print(arr[0])  # 第一个元素
print(arr[-1])  # 最后一个元素

# 一维数组切片
print(arr[1:4])  # 索引1到3的元素
print(arr[:3])   # 前3个元素
print(arr[2:])   # 从索引2开始的元素
print(arr[::2])  # 步长为2的元素

# 二维数组索引
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr[0, 0])  # 第一行第一列
print(arr[1, :])  # 第二行所有元素
print(arr[:, 1])  # 所有行的第二列
print(arr[0:2, 1:3])  # 第一、二行，第二、三列
\`\`\`

### 数组运算

\`\`\`python
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])

# 元素级运算
print(arr1 + arr2)  # 加法
print(arr1 - arr2)  # 减法
print(arr1 * arr2)  # 乘法
print(arr1 / arr2)  # 除法

# 标量运算
print(arr1 + 5)  # 加5
print(arr1 * 2)  # 乘2

# 广播
arr3 = np.array([[1, 2, 3], [4, 5, 6]])
arr4 = np.array([10, 20, 30])
print(arr3 + arr4)  # 广播运算
\`\`\`

## 进阶知识

### 高级数组操作

\`\`\`python
# 数组重塑
arr = np.array([1, 2, 3, 4, 5, 6])
print(arr.reshape(2, 3))  # 重塑为2x3数组

# 数组转置
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.T)  # 转置

# 数组连接
arr1 = np.array([[1, 2], [3, 4]])
arr2 = np.array([[5, 6], [7, 8]])
print(np.concatenate((arr1, arr2), axis=0))  # 垂直连接
print(np.concatenate((arr1, arr2), axis=1))  # 水平连接

# 数组分割
arr = np.array([1, 2, 3, 4, 5, 6])
print(np.split(arr, 3))  # 分割为3个相等的部分
\`\`\`

### 数学函数

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

print(np.sqrt(arr))  # 平方根
print(np.exp(arr))  # 指数
print(np.log(arr))  # 自然对数
print(np.sin(arr))  # 正弦
print(np.cos(arr))  # 余弦

# 统计函数
print(np.sum(arr))  # 求和
print(np.mean(arr))  # 均值
print(np.median(arr))  # 中位数
print(np.std(arr))  # 标准差
print(np.min(arr))  # 最小值
print(np.max(arr))  # 最大值
\`\`\`

## 课后练习

1. 创建一个5x5的随机数组，并计算其均值、标准差和最大值
2. 使用NumPy创建一个等差数列，从0到10，共11个元素
3. 对一个二维数组进行转置操作
4. 实现两个矩阵的乘法运算
5. 使用NumPy的广播功能，计算一个数组与标量的运算
            `
            },
            {
              title: '2.2 NumPy高级操作',
              content: `
# NumPy高级操作

## 基础知识

### 布尔索引
布尔索引是一种通过布尔数组来索引数组的方法，非常适合条件筛选。

\`\`\`python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9])

# 创建布尔数组
mask = arr > 5
print(mask)  # [False False False False False  True  True  True  True]

# 使用布尔索引
print(arr[mask])  # [6 7 8 9]

# 直接在索引中使用条件
print(arr[arr > 5])  # [6 7 8 9]
\`\`\`

### 花式索引
花式索引是使用整数数组进行索引的方法，可以按照指定的顺序获取元素。

\`\`\`python
arr = np.array([10, 20, 30, 40, 50])

# 一维花式索引
indices = [0, 2, 4]
print(arr[indices])  # [10 30 50]

# 二维花式索引
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
row_indices = [0, 1, 2]
col_indices = [1, 2, 0]
print(arr[row_indices, col_indices])  # [2 6 7]
\`\`\`

## 重要知识

### 数组排序

\`\`\`python
# 一维数组排序
arr = np.array([3, 1, 4, 1, 5, 9, 2, 6])
sorted_arr = np.sort(arr)
print(sorted_arr)  # [1 1 2 3 4 5 6 9]

# 二维数组排序
arr = np.array([[3, 1, 4], [1, 5, 9], [2, 6, 5]])
sorted_arr = np.sort(arr, axis=0)  # 按列排序
print(sorted_arr)

# 按行排序
sorted_arr = np.sort(arr, axis=1)
print(sorted_arr)
\`\`\`

### 搜索

\`\`\`python
arr = np.array([3, 1, 4, 1, 5, 9, 2, 6])

# 查找最大值索引
print(np.argmax(arr))  # 5

# 查找最小值索引
print(np.argmin(arr))  # 1

# 查找非零元素索引
print(np.nonzero(arr > 5))  # (array([5, 7]),)

# 查找元素
print(np.where(arr > 5))  # (array([5, 7]),)
\`\`\`

## 关键知识

### 线性代数操作

\`\`\`python
# 矩阵乘法
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.dot(A, B))  # 矩阵乘法
print(A @ B)  # 矩阵乘法（Python 3.5+）

# 矩阵转置
print(A.T)  # 转置

# 矩阵求逆
from numpy.linalg import inv
print(inv(A))  # 求逆

# 特征值和特征向量
from numpy.linalg import eig
values, vectors = eig(A)
print(values)  # 特征值
print(vectors)  # 特征向量

# 奇异值分解
from numpy.linalg import svd
U, S, V = svd(A)
print(U)  # 左奇异向量
print(S)  # 奇异值
print(V)  # 右奇异向量
\`\`\`

### 随机数生成

\`\`\`python
# 生成均匀分布的随机数
print(np.random.rand(3, 3))  # 0-1之间的随机数

# 生成正态分布的随机数
print(np.random.randn(3, 3))  # 标准正态分布

# 生成指定范围的随机整数
print(np.random.randint(0, 10, size=(3, 3)))  # 0-9之间的随机整数

# 随机打乱
arr = np.array([1, 2, 3, 4, 5])
np.random.shuffle(arr)
print(arr)  # 打乱后的数组

# 随机选择
print(np.random.choice(arr, size=2))  # 随机选择2个元素
\`\`\`

## 进阶知识

### 广播机制
广播是NumPy的一个强大特性，允许不同形状的数组进行算术运算。

\`\`\`python
# 标量与数组
arr = np.array([1, 2, 3])
print(arr + 5)  # [6 7 8]

# 一维数组与二维数组
arr1 = np.array([[1, 2, 3], [4, 5, 6]])
arr2 = np.array([10, 20, 30])
print(arr1 + arr2)  # 广播运算

# 不同维度的数组
arr1 = np.array([1, 2, 3])
arr2 = np.array([[4], [5], [6]])
print(arr1 + arr2)  # 广播运算
\`\`\`

### 内存管理

\`\`\`python
# 视图（浅拷贝）
arr = np.array([1, 2, 3, 4, 5])
view = arr.view()
view[0] = 100
print(arr)  # [100   2   3   4   5]，原数组被修改

# 副本（深拷贝）
arr = np.array([1, 2, 3, 4, 5])
copy = arr.copy()
copy[0] = 100
print(arr)  # [1 2 3 4 5]，原数组未被修改

# 节省内存的操作
arr = np.array([1, 2, 3, 4, 5])
arr += 1  # 原地操作，节省内存
print(arr)  # [2 3 4 5 6]
\`\`\`

## 课后练习

1. 使用布尔索引从一个数组中筛选出所有偶数
2. 使用花式索引按照指定顺序重新排列数组元素
3. 对一个二维数组按行和列进行排序
4. 计算两个矩阵的点积
5. 生成一个3x3的随机矩阵，并计算其特征值和特征向量
6. 使用广播机制计算一个数组与不同形状数组的运算
            `
            }
          ]
        }
      ]
    }
  };

  const defaultLessons = {
    title: course?.title || '课程内容',
    chapters: [
      {
        title: '第一章：课程介绍',
        lessons: [
          {
            title: '1.1 课程概述',
            content: `
# ${course?.title || '课程概述'}

欢迎学习本课程！

## 课程目标

通过本课程的学习，您将掌握：
- 相关的理论知识
- 实用的操作技能
- 解决实际问题的能力

## 学习建议

1. 认真阅读每节课的内容
2. 完成相关的练习
3. 多动手实践
4. 遇到问题及时查阅资料
            `
          }
        ]
      }
    ]
  };

  const content = courseLessons[courseId as keyof typeof courseLessons] || defaultLessons;
  const currentChapterData = content.chapters[currentChapter];
  const currentLessonData = currentChapterData?.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">数据分析学习平台</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  首页
                </a>
                <a href="/courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  课程中心
                </a>
                <a href="/learning" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  学习中心
                </a>
                <a href="/community" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  社区中心
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a href="/profile" className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">查看个人资料</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-blue-600">
                <h3 className="text-lg font-medium text-white">
                  {content.title}
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <nav className="px-4 py-4">
                  {content.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {chapter.title}
                      </h4>
                      <ul className="space-y-1">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex}>
                            <button
                              onClick={() => {
                                setCurrentChapter(chapterIndex);
                                setCurrentLesson(lessonIndex);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                                currentChapter === chapterIndex && currentLesson === lessonIndex
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {lesson.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentLessonData?.title}
                  </h2>
                  <Link
                    to={`/courses/${courseId}`}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    返回课程详情
                  </Link>
                </div>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <div className="prose max-w-none">
                  {currentLessonData?.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">{line.slice(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-6">{line.slice(3)}</h2>;
                    } else if (line.trim().startsWith('```')) {
                      return null;
                    } else if (line.trim()) {
                      return <p key={index} className="text-gray-700 mb-4">{line}</p>;
                    }
                    return null;
                  })}
                </div>

                {/* 导航按钮 */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (currentLesson > 0) {
                        setCurrentLesson(currentLesson - 1);
                      } else if (currentChapter > 0) {
                        const prevChapter = content.chapters[currentChapter - 1];
                        setCurrentChapter(currentChapter - 1);
                        setCurrentLesson(prevChapter.lessons.length - 1);
                      }
                    }}
                    disabled={currentChapter === 0 && currentLesson === 0}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一节
                  </button>
                  <button
                    onClick={() => {
                      const currentChapterLessons = currentChapterData?.lessons.length || 0;
                      if (currentLesson < currentChapterLessons - 1) {
                        setCurrentLesson(currentLesson + 1);
                      } else if (currentChapter < content.chapters.length - 1) {
                        setCurrentChapter(currentChapter + 1);
                        setCurrentLesson(0);
                      }
                    }}
                    disabled={
                      currentChapter === content.chapters.length - 1 &&
                      currentLesson === (currentChapterData?.lessons.length || 0) - 1
                    }
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一节
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium">数据分析学习平台</h3>
              <p className="mt-2 text-gray-300 text-sm">
                专为商务数据分析与应用专业学生设计的在线教育平台
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">快速链接</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white text-sm">首页</a></li>
                <li><a href="/courses" className="text-gray-300 hover:text-white text-sm">课程中心</a></li>
                <li><a href="/learning" className="text-gray-300 hover:text-white text-sm">学习中心</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-white text-sm">社区中心</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">联系我们</h3>
              <p className="mt-2 text-gray-300 text-sm">
                邮箱: contact@example.com
              </p>
              <p className="mt-1 text-gray-300 text-sm">
                电话: +86 123 4567 8910
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 数据分析学习平台. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LessonContent;
