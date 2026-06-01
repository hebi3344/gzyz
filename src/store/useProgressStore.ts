import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: number;
  type: 'courses' | 'modules' | 'time' | 'streak' | 'assessments';
  unlockedAt?: Date;
}

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
}

interface ProgressStore {
  progress: Record<string, number>;
  completedModules: string[];
  learningTime: Record<string, number>;
  totalLearningTime: number;
  chapterProgress: Record<string, Record<string, ChapterProgress>>;
  achievements: Achievement[];
  unlockedAchievements: string[];
  lastActiveDate: string;
  currentStreak: number;
  updateProgress: (courseId: string, progress: number) => void;
  markModuleComplete: (moduleId: string) => void;
  getProgress: (courseId: string) => number;
  isModuleComplete: (moduleId: string) => boolean;
  addLearningTime: (courseId: string, minutes: number) => void;
  getLearningTime: (courseId: string) => number;
  getTotalLearningTime: () => number;
  updateChapterProgress: (courseId: string, chapterId: string, progress: number) => void;
  getChapterProgress: (courseId: string, chapterId: string) => ChapterProgress | null;
  getCourseChapterProgress: (courseId: string) => ChapterProgress[];
  getOverallChapterCompletion: (courseId: string) => number;
  checkAndUnlockAchievements: () => void;
  unlockAchievement: (achievementId: string) => void;
  isAchievementUnlocked: (achievementId: string) => boolean;
  updateStreak: () => void;
  resetProgress: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'beginner',
    title: '初学者',
    description: '完成第一门课程',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    color: 'blue',
    requirement: 1,
    type: 'courses'
  },
  {
    id: 'streak_7',
    title: '坚持不懈',
    description: '连续学习7天',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'green',
    requirement: 7,
    type: 'streak'
  },
  {
    id: 'modules_5',
    title: '知识达人',
    description: '完成5个学习模块',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'purple',
    requirement: 5,
    type: 'modules'
  },
  {
    id: 'time_10h',
    title: '学习达人',
    description: '累计学习10小时',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    color: 'orange',
    requirement: 600,
    type: 'time'
  },
  {
    id: 'courses_3',
    title: '课程完成者',
    description: '完成3门课程',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: 'yellow',
    requirement: 3,
    type: 'courses'
  },
  {
    id: 'assessment_perfect',
    title: '满分达人',
    description: '测评成绩达到90分以上',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'red',
    requirement: 90,
    type: 'assessments'
  }
];

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      completedModules: [],
      learningTime: {},
      totalLearningTime: 0,
      chapterProgress: {},
      achievements: defaultAchievements,
      unlockedAchievements: [],
      lastActiveDate: new Date().toISOString().split('T')[0],
      currentStreak: 0,
      
      updateProgress: (courseId: string, progress: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: Math.min(100, Math.max(0, progress))
          }
        }));
        get().checkAndUnlockAchievements();
      },
      
      markModuleComplete: (moduleId: string) => {
        set((state) => {
          if (!state.completedModules.includes(moduleId)) {
            return {
              completedModules: [...state.completedModules, moduleId]
            };
          }
          return state;
        });
        get().checkAndUnlockAchievements();
      },
      
      getProgress: (courseId: string) => {
        return get().progress[courseId] || 0;
      },
      
      isModuleComplete: (moduleId: string) => {
        return get().completedModules.includes(moduleId);
      },

      addLearningTime: (courseId: string, minutes: number) => {
        set((state) => {
          const currentTime = state.learningTime[courseId] || 0;
          const newTotalTime = state.totalLearningTime + minutes;
          return {
            learningTime: {
              ...state.learningTime,
              [courseId]: currentTime + minutes
            },
            totalLearningTime: newTotalTime
          };
        });
        get().checkAndUnlockAchievements();
      },

      getLearningTime: (courseId: string) => {
        return get().learningTime[courseId] || 0;
      },

      getTotalLearningTime: () => {
        return get().totalLearningTime;
      },

      updateChapterProgress: (courseId: string, chapterId: string, progress: number) => {
        set((state) => {
          const courseChapters = state.chapterProgress[courseId] || {};
          const existingChapter = courseChapters[chapterId];
          
          const updatedChapter: ChapterProgress = {
            chapterId,
            progress: Math.min(100, Math.max(0, progress)),
            completed: progress >= 100,
            startedAt: existingChapter?.startedAt || new Date(),
            completedAt: progress >= 100 ? (existingChapter?.completedAt || new Date()) : undefined
          };

          return {
            chapterProgress: {
              ...state.chapterProgress,
              [courseId]: {
                ...courseChapters,
                [chapterId]: updatedChapter
              }
            }
          };
        });
      },

      getChapterProgress: (courseId: string, chapterId: string) => {
        const chapters = get().chapterProgress[courseId];
        return chapters ? chapters[chapterId] : null;
      },

      getCourseChapterProgress: (courseId: string) => {
        const chapters = get().chapterProgress[courseId];
        return chapters ? Object.values(chapters) : [];
      },

      getOverallChapterCompletion: (courseId: string) => {
        const chapters = get().getCourseChapterProgress(courseId);
        if (chapters.length === 0) return 0;
        const completedCount = chapters.filter(c => c.completed).length;
        return Math.round((completedCount / chapters.length) * 100);
      },

      checkAndUnlockAchievements: () => {
        const state = get();
        const completedCourses = Object.entries(state.progress)
          .filter(([_, progress]) => progress >= 100).length;
        const moduleCount = state.completedModules.length;
        const totalTime = state.totalLearningTime;

        const achievementsToUnlock: string[] = [];

        state.achievements.forEach(achievement => {
          if (state.unlockedAchievements.includes(achievement.id)) return;

          let shouldUnlock = false;
          
          switch (achievement.type) {
            case 'courses':
              shouldUnlock = completedCourses >= achievement.requirement;
              break;
            case 'modules':
              shouldUnlock = moduleCount >= achievement.requirement;
              break;
            case 'time':
              shouldUnlock = totalTime >= achievement.requirement;
              break;
            case 'streak':
              shouldUnlock = state.currentStreak >= achievement.requirement;
              break;
          }

          if (shouldUnlock) {
            achievementsToUnlock.push(achievement.id);
          }
        });

        if (achievementsToUnlock.length > 0) {
          set((state) => ({
            unlockedAchievements: [...state.unlockedAchievements, ...achievementsToUnlock]
          }));
        }
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          if (!state.unlockedAchievements.includes(achievementId)) {
            return {
              unlockedAchievements: [...state.unlockedAchievements, achievementId]
            };
          }
          return state;
        });
      },

      isAchievementUnlocked: (achievementId: string) => {
        return get().unlockedAchievements.includes(achievementId);
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        
        if (state.lastActiveDate === today) {
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        set((state) => ({
          lastActiveDate: today,
          currentStreak: state.lastActiveDate === yesterdayStr 
            ? state.currentStreak + 1 
            : 1
        }));
        get().checkAndUnlockAchievements();
      },

      resetProgress: () => {
        set({
          progress: {},
          completedModules: [],
          learningTime: {},
          totalLearningTime: 0,
          chapterProgress: {},
          unlockedAchievements: [],
          lastActiveDate: new Date().toISOString().split('T')[0],
          currentStreak: 0
        });
      }
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);