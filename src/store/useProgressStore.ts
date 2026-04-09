import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressStore {
  progress: Record<string, number>;
  completedModules: string[];
  updateProgress: (courseId: string, progress: number) => void;
  markModuleComplete: (moduleId: string) => void;
  getProgress: (courseId: string) => number;
  isModuleComplete: (moduleId: string) => boolean;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      completedModules: [],
      
      updateProgress: (courseId: string, progress: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: Math.min(100, Math.max(0, progress))
          }
        }));
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
      },
      
      getProgress: (courseId: string) => {
        return get().progress[courseId] || 0;
      },
      
      isModuleComplete: (moduleId: string) => {
        return get().completedModules.includes(moduleId);
      },
      
      resetProgress: () => {
        set({
          progress: {},
          completedModules: []
        });
      }
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);