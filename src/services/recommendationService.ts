import { useProgressStore } from '../store/useProgressStore';

// 课程数据类型
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  category: string;
}

// 学习路径类型
export interface LearningPath {
  id: string;
  title: string;
  courses: Course[];
  completed: boolean;
}

// 模拟课程数据
const courses: Course[] = [
  {
    id: '1',
    title: '数据分析基础',
    description: '学习数据分析的基本概念和方法，为后续学习打下基础',
    level: 'beginner',
    estimatedTime: 10,
    category: '基础'
  },
  {
    id: '2',
    title: '商务数据可视化',
    description: '学习如何使用数据可视化工具展示商务数据，提升数据解读能力',
    level: 'intermediate',
    estimatedTime: 15,
    category: '可视化'
  },
  {
    id: '3',
    title: '数据分析与决策',
    description: '学习如何利用数据分析结果做出有效的商务决策',
    level: 'advanced',
    estimatedTime: 20,
    category: '决策'
  },
  {
    id: '4',
    title: 'Python数据分析',
    description: '学习使用Python进行数据分析，掌握常用的数据处理库',
    level: 'intermediate',
    estimatedTime: 18,
    category: '编程'
  },
  {
    id: '5',
    title: '统计分析基础',
    description: '学习统计分析的基本原理和方法，为数据分析提供理论支持',
    level: 'beginner',
    estimatedTime: 12,
    category: '统计'
  },
  {
    id: '6',
    title: '机器学习入门',
    description: '学习机器学习的基本概念和算法，应用于数据分析',
    level: 'advanced',
    estimatedTime: 25,
    category: '机器学习'
  }
];

// 基于规则的推荐算法
export const getRecommendedCourses = (): Course[] => {
  const { progress, completedModules } = useProgressStore.getState();
  
  // 分析用户学习进度
  const completedCourses = Object.entries(progress)
    .filter(([_, value]) => value >= 100)
    .map(([courseId]) => courseId);
  
  const inProgressCourses = Object.entries(progress)
    .filter(([_, value]) => value > 0 && value < 100)
    .map(([courseId]) => courseId);
  
  // 计算用户的学习水平
  let userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  if (completedCourses.length >= 3) {
    userLevel = 'advanced';
  } else if (completedCourses.length >= 1) {
    userLevel = 'intermediate';
  }
  
  // 基于用户水平和已完成课程推荐
  let recommendedCourses = courses.filter(course => {
    // 排除已完成的课程
    if (completedCourses.includes(course.id)) {
      return false;
    }
    
    // 根据用户水平推荐合适难度的课程
    if (userLevel === 'beginner' && course.level === 'advanced') {
      return false;
    }
    
    return true;
  });
  
  // 优先推荐与用户正在学习的课程相关的课程
  if (inProgressCourses.length > 0) {
    const inProgressCourse = courses.find(c => c.id === inProgressCourses[0]);
    if (inProgressCourse) {
      const relatedCourses = recommendedCourses.filter(c => c.category === inProgressCourse.category);
      const otherCourses = recommendedCourses.filter(c => c.category !== inProgressCourse.category);
      recommendedCourses = [...relatedCourses, ...otherCourses];
    }
  }
  
  // 限制推荐数量
  return recommendedCourses.slice(0, 3);
};

// 获取学习路径
export const getLearningPath = (): LearningPath[] => {
  const { progress } = useProgressStore.getState();
  
  // 分析用户学习进度
  const completedCourses = Object.entries(progress)
    .filter(([_, value]) => value >= 100)
    .map(([courseId]) => courseId);
  
  // 基于用户进度生成学习路径
  const path: LearningPath[] = [
    {
      id: 'path-1',
      title: '基础阶段',
      courses: courses.filter(c => c.level === 'beginner'),
      completed: courses.filter(c => c.level === 'beginner').every(c => completedCourses.includes(c.id))
    },
    {
      id: 'path-2',
      title: '进阶阶段',
      courses: courses.filter(c => c.level === 'intermediate'),
      completed: courses.filter(c => c.level === 'intermediate').every(c => completedCourses.includes(c.id))
    },
    {
      id: 'path-3',
      title: '高级阶段',
      courses: courses.filter(c => c.level === 'advanced'),
      completed: courses.filter(c => c.level === 'advanced').every(c => completedCourses.includes(c.id))
    }
  ];
  
  return path;
};