import { useProgressStore } from '../store/useProgressStore';

export const useProgress = () => {
  const {
    progress,
    completedModules,
    updateProgress,
    markModuleComplete,
    getProgress,
    isModuleComplete,
    resetProgress
  } = useProgressStore();

  return {
    progress,
    completedModules,
    updateProgress,
    markModuleComplete,
    getProgress,
    isModuleComplete,
    resetProgress
  };
};