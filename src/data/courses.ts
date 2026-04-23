import type { Course } from "../services/recommendationService";

export interface Chapter {
  id: string;
  title: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
}

export interface Example {
  id: string;
  title: string;
  content: string;
  code: string;
  output: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  codeTemplate: string;
  testCases: TestCase[];
  difficulty: "easy" | "medium" | "hard";
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface CourseWithContent extends Course {
  chapters: Chapter[];
  image: string;
}

export const coursesWithContent: CourseWithContent[] = [
  {
    id: "1",
    title: "数据分析基础",
    description: "本课程介绍数据分析的基本概念、方法和工具，帮助学习者掌握数据分析的核心技能。",
    level: "beginner",
    estimatedTime: 10,
    category: "基础",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analysis%20basics%20concept%20visualization&image_size=landscape_16_9",
    chapters: [
      {
        id: "da-chapter-1",
        title: "数据分析概述",
        content: "数据分析是指通过收集、处理、分析和解释数据，以发现有价值的信息和洞察的过程。它涉及多个学科领域，包括统计学、计算机科学、业务管理等。数据分析的主要步骤包括：数据收集、数据清洗、数据探索、数据建模和结果解释。在当今数据驱动的时代，数据分析已成为企业决策和个人发展的重要工具。",
        examples: [
          {
            id: "da-example-1",
            title: "销售数据分析",
            content: "通过分析销售数据，企业可以了解产品销售趋势、客户购买行为，从而优化营销策略。",
            code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# 加载销售数据\nsales_data = pd.read_csv('sales.csv')\n\n# 分析月度销售趋势\nmonthly_sales = sales_data.groupby('month')['sales'].sum()\n\n# 可视化销售趋势\nplt.figure(figsize=(10, 6))\nmonthly_sales.plot(kind='bar')\nplt.title('月度销售趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.show()",
            output: "显示月度销售趋势条形图"
          }
        ],
        exercises: [
          {
            id: "da-exercise-1",
            title: "计算销售平均值",
            description: "编写代码计算销售数据的平均值。",
            codeTemplate: "import pandas as pd\n\n# 加载销售数据\nsales_data = pd.read_csv('sales.csv')\n\n# TODO: 计算销售平均值\naverage_sales = \n\nprint(f'平均销售额: {average_sales}')",
            testCases: [
              {
                input: "sales.csv 包含数据: [100, 200, 300, 400, 500]",
                expectedOutput: "平均销售额: 300.0"
              }
            ],
            difficulty: "easy"
          }
        ]
      },
      {
        id: "da-chapter-2",
        title: "数据类型与结构",
        content: "在数据分析中，了解不同的数据类型和结构非常重要。常见的数据类型包括数值型、分类型、日期型等。数据结构则包括表格、时间序列、文本等。不同的数据类型和结构需要使用不同的分析方法和工具。例如，数值型数据可以进行统计分析，分类型数据可以进行频率分析，时间序列数据可以进行趋势分析。",
        examples: [
          {
            id: "da-example-2",
            title: "数据类型转换",
            content: "将分类型数据转换为数值型数据，以便进行统计分析。",
            code: "import pandas as pd\n\n# 创建示例数据\ndata = pd.DataFrame({\n    'category': ['A', 'B', 'A', 'C', 'B'],\n    'value': [10, 20, 30, 40, 50]\n})\n\n# 将分类列转换为数值型\ndata['category_code'] = pd.Categorical(data['category']).codes\n\nprint(data)",
            output: "   category  value  category_code\n0        A     10              0\n1        B     20              1\n2        A     30              0\n3        C     40              2\n4        B     50              1"
          }
        ],
        exercises: [
          {
            id: "da-exercise-2",
            title: "数据结构转换",
            description: "将时间序列数据转换为适合分析的结构。",
            codeTemplate: "import pandas as pd\n\n# 创建时间序列数据\ndate_rng = pd.date_range('2023-01-01', periods=10, freq='D')\ndata = pd.DataFrame(date_rng, columns=['date'])\ndata['value'] = range(10)\n\n# TODO: 将日期列设置为索引\ndata = \n\nprint(data.head())",
            testCases: [
              {
                input: "时间序列数据",
                expectedOutput: "            value\ndate              \n2023-01-01      0\n2023-01-02      1\n2023-01-03      2\n2023-01-04      3\n2023-01-05      4"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "da-chapter-3",
        title: "数据可视化基础",
        content: "数据可视化是数据分析的重要组成部分，它通过图形化的方式展示数据，帮助人们更直观地理解数据中的模式和趋势。常见的数据可视化图表包括条形图、折线图、散点图、饼图、热力图等。选择合适的可视化方式取决于数据的类型和分析的目的。例如，条形图适合比较不同类别的数据，折线图适合展示时间序列数据的趋势，散点图适合分析两个变量之间的关系。",
        examples: [
          {
            id: "da-example-3",
            title: "多变量数据可视化",
            content: "使用散点图矩阵展示多个变量之间的关系。",
            code: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 加载示例数据\niris = sns.load_dataset('iris')\n\n# 创建散点图矩阵\nsns.pairplot(iris, hue='species')\nplt.title('鸢尾花数据集变量关系')\nplt.show()",
            output: "显示鸢尾花数据集的散点图矩阵，不同颜色代表不同物种"
          }
        ],
        exercises: [
          {
            id: "da-exercise-3",
            title: "创建热力图",
            description: "使用热力图展示数据的相关性矩阵。",
            codeTemplate: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 加载示例数据\niris = sns.load_dataset('iris')\n\n# 计算相关性矩阵\ncorr_matrix = iris.corr()\n\n# TODO: 创建热力图\n\nplt.title('鸢尾花数据集相关性热力图')\nplt.show()",
            testCases: [
              {
                input: "鸢尾花数据集",
                expectedOutput: "显示相关性热力图，颜色深浅表示相关程度"
              }
            ],
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "统计分析基础",
    description: "本课程介绍统计分析的基本概念、方法和应用，帮助学习者掌握统计分析的核心技能。",
    level: "beginner",
    estimatedTime: 12,
    category: "统计",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=statistics%20analysis%20concept%20visualization&image_size=landscape_16_9",
    chapters: [
      {
        id: "stats-chapter-1",
        title: "描述性统计",
        content: "描述性统计是统计分析的基础，它通过计算各种统计量来描述数据的基本特征。常见的描述性统计量包括：集中趋势度量（如均值、中位数、众数）、离散程度度量（如方差、标准差、四分位数）、分布形状度量（如偏度、峰度）等。描述性统计可以帮助我们了解数据的整体情况，为进一步的分析提供基础。",
        examples: [
          {
            id: "stats-example-1",
            title: "计算描述性统计量",
            content: "使用Python计算数据集的描述性统计量。",
            code: "import pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\n\n# 计算描述性统计量\nmean = data.mean()\nmedian = data.median()\nstd = data.std()\nvar = data.var()\nmin_val = data.min()\nmax_val = data.max()\n\nprint(f'均值: {mean}')\nprint(f'中位数: {median}')\nprint(f'标准差: {std}')\nprint(f'方差: {var}')\nprint(f'最小值: {min_val}')\nprint(f'最大值: {max_val}')",
            output: "均值: 5.5\n中位数: 5.5\n标准差: 3.0276503540974917\n方差: 9.166666666666666\n最小值: 1\n最大值: 10"
          }
        ],
        exercises: [
          {
            id: "stats-exercise-1",
            title: "计算四分位数",
            description: "编写代码计算数据集的四分位数。",
            codeTemplate: "import pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\n\n# TODO: 计算四分位数\nq1 = \nq2 = \nq3 = \n\nprint(f'第一四分位数 (Q1): {q1}')\nprint(f'第二四分位数 (Q2): {q2}')\nprint(f'第三四分位数 (Q3): {q3}')",
            testCases: [
              {
                input: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
                expectedOutput: "第一四分位数 (Q1): 3.25\n第二四分位数 (Q2): 5.5\n第三四分位数 (Q3): 7.75"
              }
            ],
            difficulty: "easy"
          }
        ]
      },
      {
        id: "stats-chapter-2",
        title: "概率分布",
        content: "概率分布是描述随机变量取值概率的数学模型。常见的概率分布包括：正态分布、二项分布、泊松分布、指数分布等。不同的概率分布适用于不同的场景。例如，正态分布适用于描述许多自然现象和测量误差，二项分布适用于描述二分类试验的结果，泊松分布适用于描述单位时间内事件发生的次数。",
        examples: [
          {
            id: "stats-example-2",
            title: "正态分布模拟",
            content: "使用Python模拟正态分布数据并绘制直方图。",
            code: "import numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# 生成正态分布数据\nmu, sigma = 0, 1  # 均值和标准差\ndata = np.random.normal(mu, sigma, 1000)\n\n# 绘制直方图\nplt.figure(figsize=(10, 6))\nsns.histplot(data, kde=True)\nplt.title('正态分布直方图')\nplt.xlabel('值')\nplt.ylabel('频率')\nplt.show()",
            output: "显示正态分布的直方图，带有密度曲线"
          }
        ],
        exercises: [
          {
            id: "stats-exercise-2",
            title: "二项分布模拟",
            description: "编写代码模拟二项分布数据并计算概率。",
            codeTemplate: "import numpy as np\nimport matplotlib.pyplot as plt\n\n# 二项分布参数\nn = 10  # 试验次数\np = 0.5  # 成功概率\n\n# TODO: 生成二项分布数据\ndata = \n\n# 计算成功次数为5的概率\nprob = \n\nprint(f'成功次数为5的概率: {prob}')\n\n# 绘制直方图\nplt.hist(data, bins=range(n+2), align='left', alpha=0.7)\nplt.title('二项分布直方图')\nplt.xlabel('成功次数')\nplt.ylabel('频率')\nplt.show()",
            testCases: [
              {
                input: "n=10, p=0.5",
                expectedOutput: "成功次数为5的概率: 0.24609375"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "stats-chapter-3",
        title: "假设检验",
        content: "假设检验是统计推断的重要方法，它通过样本数据来检验关于总体参数的假设。常见的假设检验包括：t检验、卡方检验、方差分析等。假设检验的基本步骤包括：建立原假设和备择假设、选择显著性水平、计算检验统计量、确定临界值或p值、做出决策。假设检验可以帮助我们判断样本数据是否支持某个关于总体的假设。",
        examples: [
          {
            id: "stats-example-3",
            title: "t检验示例",
            content: "使用Python进行单样本t检验。",
            code: "import numpy as np\nfrom scipy import stats\n\n# 创建示例数据\ndata = np.array([1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0])\n\n# 单样本t检验，检验均值是否等于1.5\nt_stat, p_value = stats.ttest_1samp(data, 1.5)\n\nprint(f't统计量: {t_stat}')\nprint(f'p值: {p_value}')\n\n# 做出决策\nalpha = 0.05\nif p_value < alpha:\n    print('拒绝原假设，均值不等于1.5')\nelse:\n    print('不拒绝原假设，均值等于1.5')",
            output: "t统计量: 0.0\np值: 1.0\n不拒绝原假设，均值等于1.5"
          }
        ],
        exercises: [
          {
            id: "stats-exercise-3",
            title: "独立样本t检验",
            description: "编写代码进行独立样本t检验。",
            codeTemplate: "import numpy as np\nfrom scipy import stats\n\n# 创建两组示例数据\ngroup1 = np.array([1, 2, 3, 4, 5])\ngroup2 = np.array([6, 7, 8, 9, 10])\n\n# TODO: 进行独立样本t检验\nt_stat, p_value = \n\nprint(f't统计量: {t_stat}')\nprint(f'p值: {p_value}')\n\n# 做出决策\nalpha = 0.05\nif p_value < alpha:\n    print('拒绝原假设，两组均值存在显著差异')\nelse:\n    print('不拒绝原假设，两组均值无显著差异')",
            testCases: [
              {
                input: "group1=[1,2,3,4,5], group2=[6,7,8,9,10]",
                expectedOutput: "t统计量: -7.0710678118654755\np值: 2.4671668507415816e-05\n拒绝原假设，两组均值存在显著差异"
              }
            ],
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "13",
    title: "数据收集与预处理",
    description: "本课程介绍数据收集的方法和数据预处理的技术，帮助学习者掌握数据处理的核心技能。",
    level: "beginner",
    estimatedTime: 10,
    category: "基础",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20collection%20and%20preprocessing%20concept%20visualization&image_size=landscape_16_9",
    chapters: [
      {
        id: "dcp-chapter-1",
        title: "数据收集方法",
        content: "数据收集是数据分析的第一步，它直接影响分析结果的质量。常见的数据收集方法包括：问卷调查、访谈、观察、实验、二手数据收集等。不同的数据收集方法适用于不同的研究目的和场景。例如，问卷调查适合收集大量样本的结构化数据，访谈适合收集深入的质性数据，实验适合研究因果关系。在数据收集中，需要注意数据的代表性、可靠性和有效性。",
        examples: [
          {
            id: "dcp-example-1",
            title: "网络数据采集",
            content: "使用Python的requests和BeautifulSoup库采集网页数据。",
            code: "import requests\nfrom bs4 import BeautifulSoup\n\n# 发送HTTP请求\nurl = 'https://example.com'\nresponse = requests.get(url)\n\n# 解析HTML\nsoup = BeautifulSoup(response.text, 'html.parser')\n\n# 提取标题\ntitle = soup.find('h1').text\n\n# 提取段落\nparagraphs = [p.text for p in soup.find_all('p')]\n\nprint(f'标题: {title}')\nprint('段落:')\nfor i, p in enumerate(paragraphs):\n    print(f'{i+1}. {p}')",
            output: "显示网页的标题和段落内容"
          }
        ],
        exercises: [
          {
            id: "dcp-exercise-1",
            title: "API数据采集",
            description: "编写代码从API获取数据。",
            codeTemplate: "import requests\n\n# API URL\nurl = 'https://jsonplaceholder.typicode.com/posts'\n\n# TODO: 发送请求并获取数据\nresponse = \ndata = \n\n# 打印前5条数据\nprint('前5条数据:')\nfor item in data[:5]:\n    print(f'ID: {item[\'id\']}, 标题: {item[\'title\']}')",
            testCases: [
              {
                input: "API请求",
                expectedOutput: "前5条数据:\nID: 1, 标题: sunt aut facere repellat provident occaecati excepturi optio reprehenderit\nID: 2, 标题: qui est esse\nID: 3, 标题: ea molestias quasi exercitationem repellat qui ipsa sit aut\nID: 4, 标题: eum et est occaecati\nID: 5, 标题: nesciunt quas odio"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "dcp-chapter-2",
        title: "数据清洗",
        content: "数据清洗是数据预处理的重要步骤，它包括处理缺失值、异常值、重复值等。缺失值处理方法包括删除、插值、填充等。异常值处理方法包括删除、替换、转换等。重复值处理方法包括删除重复记录。数据清洗的质量直接影响后续分析的结果，因此需要仔细处理。",
        examples: [
          {
            id: "dcp-example-2",
            title: "处理缺失值",
            content: "使用Python处理数据集中的缺失值。",
            code: "import pandas as pd\nimport numpy as np\n\n# 创建包含缺失值的数据集\ndata = pd.DataFrame({\n    'A': [1, 2, np.nan, 4, 5],\n    'B': [6, np.nan, 8, 9, 10],\n    'C': [11, 12, 13, np.nan, 15]\n})\n\nprint('原始数据:')\nprint(data)\n\n# 删除包含缺失值的行\ndata_dropna = data.dropna()\nprint('\n删除缺失值后:')\nprint(data_dropna)\n\n# 用均值填充缺失值\ndata_fillna = data.fillna(data.mean())\nprint('\n用均值填充后:')\nprint(data_fillna)",
            output: "原始数据:\n     A     B     C\n0  1.0   6.0  11.0\n1  2.0   NaN  12.0\n2  NaN   8.0  13.0\n3  4.0   9.0   NaN\n4  5.0  10.0  15.0\n\n删除缺失值后:\n     A     B     C\n0  1.0   6.0  11.0\n4  5.0  10.0  15.0\n\n用均值填充后:\n     A     B     C\n0  1.0   6.0  11.0\n1  2.0   8.25 12.0\n2  3.0   8.0  13.0\n3  4.0   9.0  12.75\n4  5.0  10.0  15.0"
          }
        ],
        exercises: [
          {
            id: "dcp-exercise-2",
            title: "处理异常值",
            description: "编写代码检测和处理数据集中的异常值。",
            codeTemplate: "import pandas as pd\nimport numpy as np\n\n# 创建包含异常值的数据集\ndata = pd.DataFrame({\n    'value': [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10]\n})\n\nprint('原始数据:')\nprint(data)\n\n# TODO: 使用IQR方法检测异常值\nQ1 = \nQ3 = \nIQR = \nlower_bound = \nupper_bound = \n\n# 识别异常值\noutliers = data[(data['value'] < lower_bound) | (data['value'] > upper_bound)]\nprint('\n异常值:')\nprint(outliers)\n\n# 处理异常值（替换为中位数）\ndata['value'] = data['value'].apply(lambda x: data['value'].median() if x < lower_bound or x > upper_bound else x)\nprint('\n处理后的数据:')\nprint(data)",
            testCases: [
              {
                input: "[1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10]",
                expectedOutput: "原始数据:\n    value\n0       1\n1       2\n2       3\n3       4\n4       5\n5     100\n6       6\n7       7\n8       8\n9       9\n10     10\n\n异常值:\n    value\n5     100\n\n处理后的数据:\n    value\n0       1\n1       2\n2       3\n3       4\n4       5\n5       5\n6       6\n7       7\n8       8\n9       9\n10     10"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "dcp-chapter-3",
        title: "特征工程",
        content: "特征工程是数据预处理的重要环节，它包括特征选择、特征提取、特征转换等。特征选择是从原始特征中选择最相关的特征，特征提取是从原始特征中提取新的特征，特征转换是对原始特征进行变换以提高模型性能。常见的特征工程技术包括：标准化、归一化、独热编码、主成分分析等。",
        examples: [
          {
            id: "dcp-example-3",
            title: "特征标准化",
            content: "使用Python对数据进行标准化处理。",
            code: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\n\n# 创建示例数据\ndata = pd.DataFrame({\n    'feature1': [1, 2, 3, 4, 5],\n    'feature2': [10, 20, 30, 40, 50]\n})\n\nprint('原始数据:')\nprint(data)\n\n# 标准化处理\nscaler = StandardScaler()\ndata_scaled = scaler.fit_transform(data)\ndata_scaled = pd.DataFrame(data_scaled, columns=data.columns)\n\nprint('\n标准化后的数据:')\nprint(data_scaled)\nprint(f'\n均值: {data_scaled.mean().values}')\nprint(f'标准差: {data_scaled.std().values}')",
            output: "原始数据:\n   feature1  feature2\n0         1        10\n1         2        20\n2         3        30\n3         4        40\n4         5        50\n\n标准化后的数据:\n   feature1  feature2\n0 -1.414214 -1.414214\n1 -0.707107 -0.707107\n2  0.000000  0.000000\n3  0.707107  0.707107\n4  1.414214  1.414214\n\n均值: [-3.55271368e-17 -3.55271368e-17]\n标准差: [1. 1.]"
          }
        ],
        exercises: [
          {
            id: "dcp-exercise-3",
            title: "独热编码",
            description: "编写代码对分类特征进行独热编码。",
            codeTemplate: "import pandas as pd\nfrom sklearn.preprocessing import OneHotEncoder\n\n# 创建包含分类特征的数据集\ndata = pd.DataFrame({\n    'category': ['A', 'B', 'A', 'C', 'B']\n})\n\nprint('原始数据:')\nprint(data)\n\n# TODO: 进行独热编码\nencoder = \nencoded_data = \nencoded_df = \n\nprint('\n独热编码后的数据:')\nprint(encoded_df)",
            testCases: [
              {
                input: "['A', 'B', 'A', 'C', 'B']",
                expectedOutput: "原始数据:\n  category\n0        A\n1        B\n2        A\n3        C\n4        B\n\n独热编码后的数据:\n   category_A  category_B  category_C\n0         1.0         0.0         0.0\n1         0.0         1.0         0.0\n2         1.0         0.0         0.0\n3         0.0         0.0         1.0\n4         0.0         1.0         0.0"
              }
            ],
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "7",
    title: "Python编程基础",
    description: "本课程介绍Python编程的基本概念、语法和应用，帮助学习者掌握Python编程的核心技能。",
    level: "beginner",
    estimatedTime: 15,
    category: "编程",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=python%20programming%20basics%20concept%20visualization&image_size=landscape_16_9",
    chapters: [
      {
        id: "python-chapter-1",
        title: "Python语法基础",
        content: "Python是一种简单易学的编程语言，它具有清晰的语法和丰富的库。Python的基本语法包括：变量定义、数据类型、运算符、控制流（条件语句、循环语句）、函数定义等。Python的数据类型包括：整数、浮点数、字符串、布尔值、列表、元组、字典、集合等。Python的控制流包括：if-else语句、for循环、while循环等。",
        examples: [
          {
            id: "python-example-1",
            title: "基本语法示例",
            content: "Python基本语法的综合示例。",
            code: "# 变量定义\nx = 10\ny = 3.14\ns = \"Hello, Python!\"\nb = True\n\n# 列表\nlst = [1, 2, 3, 4, 5]\n\n# 字典\ndct = {'name': 'Alice', 'age': 25}\n\n# 条件语句\nif x > 5:\n    print(f'{x} 大于 5')\nelse:\n    print(f'{x} 小于或等于 5')\n\n# 循环语句\nprint('列表元素:')\nfor item in lst:\n    print(item)\n\n# 函数定义\ndef greet(name):\n    return f'Hello, {name}!\n\nprint(greet('Bob'))",
            output: "10 大于 5\n列表元素:\n1\n2\n3\n4\n5\nHello, Bob!"
          }
        ],
        exercises: [
          {
            id: "python-exercise-1",
            title: "计算斐波那契数列",
            description: "编写代码计算斐波那契数列的前n项。",
            codeTemplate: "def fibonacci(n):\n    # TODO: 实现斐波那契数列\n    pass\n\n# 测试函数\nprint('斐波那契数列前10项:')\nfor i in range(1, 11):\n    print(fibonacci(i))",
            testCases: [
              {
                input: "n=10",
                expectedOutput: "斐波那契数列前10项:\n1\n1\n2\n3\n5\n8\n13\n21\n34\n55"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "python-chapter-2",
        title: "Python数据结构",
        content: "Python提供了丰富的数据结构，包括列表、元组、字典、集合等。列表是有序的可变序列，元组是有序的不可变序列，字典是键值对的集合，集合是无序的唯一元素集合。这些数据结构各有特点，适用于不同的场景。例如，列表适合存储有序的可变数据，元组适合存储不可变的数据，字典适合通过键快速查找值，集合适合去重和集合运算。",
        examples: [
          {
            id: "python-example-2",
            title: "数据结构操作",
            content: "Python数据结构的基本操作示例。",
            code: "# 列表操作\nlst = [1, 2, 3, 4, 5]\nprint('原始列表:', lst)\n\nlst.append(6)\nprint('添加元素后:', lst)\n\nlst.remove(3)\nprint('删除元素后:', lst)\n\n# 字典操作\ndct = {'name': 'Alice', 'age': 25}\nprint('\n原始字典:', dct)\n\ndct['city'] = 'New York'\nprint('添加键值对后:', dct)\n\ndel dct['age']\nprint('删除键值对后:', dct)\n\n# 集合操作\nset1 = {1, 2, 3, 4, 5}\nset2 = {4, 5, 6, 7, 8}\nprint('\n集合1:', set1)\nprint('集合2:', set2)\nprint('交集:', set1 & set2)\nprint('并集:', set1 | set2)\nprint('差集:', set1 - set2)",
            output: "原始列表: [1, 2, 3, 4, 5]\n添加元素后: [1, 2, 3, 4, 5, 6]\n删除元素后: [1, 2, 4, 5, 6]\n\n原始字典: {'name': 'Alice', 'age': 25}\n添加键值对后: {'name': 'Alice', 'age': 25, 'city': 'New York'}\n删除键值对后: {'name': 'Alice', 'city': 'New York'}\n\n集合1: {1, 2, 3, 4, 5}\n集合2: {4, 5, 6, 7, 8}\n交集: {4, 5}\n并集: {1, 2, 3, 4, 5, 6, 7, 8}\n差集: {1, 2, 3}"
          }
        ],
        exercises: [
          {
            id: "python-exercise-2",
            title: "统计字符串中字符出现次数",
            description: "编写代码统计字符串中每个字符出现的次数。",
            codeTemplate: "def count_characters(s):\n    # TODO: 统计字符出现次数\n    pass\n\n# 测试函数\ns = \"hello world\"\nprint(f'字符串: {s}')\nprint('字符出现次数:')\nresult = count_characters(s)\nfor char, count in result.items():\n    print(f'{char}: {count}')",
            testCases: [
              {
                input: "hello world",
                expectedOutput: "字符串: hello world\n字符出现次数:\nh: 1\ne: 1\nl: 3\no: 2\n : 1\nw: 1\nr: 1\nd: 1"
              }
            ],
            difficulty: "medium"
          }
        ]
      },
      {
        id: "python-chapter-3",
        title: "Python函数与模块",
        content: "函数是Python中组织代码的基本单位，它可以将重复的代码封装起来，提高代码的复用性和可维护性。模块是Python中组织代码的更高层次结构，它可以将相关的函数、类和变量组织在一起。Python的标准库提供了丰富的模块，如math、random、datetime等。此外，还可以创建自定义模块和导入第三方模块。",
        examples: [
          {
            id: "python-example-3",
            title: "函数与模块示例",
            content: "Python函数定义和模块导入的示例。",
            code: "# 导入模块\nimport math\nimport random\n\n# 自定义函数\ndef calculate_circle_area(radius):\n    return math.pi * radius ** 2\n\ndef generate_random_number(min_val, max_val):\n    return random.randint(min_val, max_val)\n\n# 使用函数\nradius = 5\narea = calculate_circle_area(radius)\nprint(f'半径为 {radius} 的圆面积: {area}')\n\nrandom_num = generate_random_number(1, 100)\nprint(f'生成的随机数: {random_num}')\n\n# 使用模块中的函数\nprint(f'π的值: {math.pi}')\nprint(f'2的平方根: {math.sqrt(2)}')",
            output: "半径为 5 的圆面积: 78.53981633974483\n生成的随机数: 42\nπ的值: 3.141592653589793\n2的平方根: 1.4142135623730951"
          }
        ],
        exercises: [
          {
            id: "python-exercise-3",
            title: "创建模块并导入",
            description: "创建一个模块，包含计算工具函数，然后导入使用。",
            codeTemplate: "# 首先创建一个名为calculator.py的文件，包含以下函数:\n# def add(a, b):\n#     return a + b\n# \n# def subtract(a, b):\n#     return a - b\n# \n# def multiply(a, b):\n#     return a * b\n# \n# def divide(a, b):\n#     if b == 0:\n#         raise ValueError('除数不能为零')\n#     return a / b\n\n# TODO: 导入calculator模块并使用\n\n# 测试函数\nprint('10 + 5 =', add(10, 5))\nprint('10 - 5 =', subtract(10, 5))\nprint('10 * 5 =', multiply(10, 5))\nprint('10 / 5 =', divide(10, 5))",
            testCases: [
              {
                input: "导入calculator模块",
                expectedOutput: "10 + 5 = 15\n10 - 5 = 5\n10 * 5 = 50\n10 / 5 = 2.0"
              }
            ],
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];

export default coursesWithContent;