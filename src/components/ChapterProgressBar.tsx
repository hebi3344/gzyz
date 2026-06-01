import React, { useEffect } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { CheckCircle, Circle, PlayCircle, Clock } from 'lucide-react';

interface ChapterProgressBarProps {
  courseId: string;
  chapters: Array<{
    id: string;
    title: string;
    duration?: string;
    sections?: Array<{
      id: string;
      title: string;
    }>;
  }>;
}

export const ChapterProgressBar: React.FC<ChapterProgressBarProps> = ({ courseId, chapters }) => {
  const {
    getChapterProgress,
    updateChapterProgress,
    updateProgress,
    markModuleComplete,
    getOverallChapterCompletion
  } = useProgressStore();

  const overallCompletion = getOverallChapterCompletion(courseId);

  useEffect(() => {
    chapters.forEach((chapter) => {
      const existing = getChapterProgress(courseId, chapter.id);
      if (!existing) {
        updateChapterProgress(courseId, chapter.id, 0);
      }
    });
  }, [courseId, chapters, getChapterProgress, updateChapterProgress]);

  const handleChapterClick = (chapterId: string, progress: number) => {
    const newProgress = Math.min(100, progress + 25);
    updateChapterProgress(courseId, chapterId, newProgress);
    
    if (newProgress >= 100) {
      markModuleComplete(`${courseId}_${chapterId}`);
    }
    
    const updatedChapters = chapters.map((ch) => {
      const chProgress = getChapterProgress(courseId, ch.id);
      return chProgress?.progress || 0;
    });
    
    const avgProgress = updatedChapters.reduce((a, b) => a + b, 0) / updatedChapters.length;
    updateProgress(courseId, avgProgress);
  };

  const getChapterStatus = (chapterId: string) => {
    const progress = getChapterProgress(courseId, chapterId);
    if (!progress) return 'not-started';
    if (progress.completed) return 'completed';
    if (progress.progress > 0) return 'in-progress';
    return 'not-started';
  };

  const getChapterIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-6 w-6 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 总体进度条 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">总体进度</h4>
          </div>
          <span className="text-2xl font-bold text-blue-600">{overallCompletion}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${overallCompletion}%` }}
          >
            <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse" />
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-600">
          <span>{Math.round(overallCompletion)}% 完成</span>
          <span>{chapters.length - Math.round(overallCompletion / (100 / chapters.length))} 个章节剩余</span>
        </div>
      </div>

      {/* 章节列表 */}
      <div className="space-y-4">
        {chapters.map((chapter, index) => {
          const progress = getChapterProgress(courseId, chapter.id);
          const status = getChapterStatus(chapter.id);
          const chapterProgress = progress?.progress || 0;

          return (
            <div
              key={chapter.id}
              className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                status === 'in-progress'
                  ? 'border-blue-300 shadow-md'
                  : status === 'completed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <button
                      onClick={() => handleChapterClick(chapter.id, chapterProgress)}
                      className="flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-200"
                      disabled={status === 'completed'}
                    >
                      {getChapterIcon(status)}
                    </button>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-3">
                          {index + 1}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {chapter.title}
                        </h4>
                        {status === 'completed' && (
                          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            已完成
                          </span>
                        )}
                        {status === 'in-progress' && (
                          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            进行中
                          </span>
                        )}
                      </div>
                      {chapter.duration && (
                        <p className="mt-1 text-sm text-gray-500 flex items-center ml-9">
                          <Clock className="h-4 w-4 mr-1" />
                          {chapter.duration}
                        </p>
                      )}
                      {chapter.sections && chapter.sections.length > 0 && (
                        <div className="mt-3 ml-9 space-y-2">
                          {chapter.sections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2" />
                              {section.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`text-2xl font-bold ${
                      status === 'completed' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {chapterProgress}%
                    </span>
                  </div>
                </div>

                {/* 章节进度条 */}
                <div className="mt-4 ml-14">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        status === 'completed'
                          ? 'bg-gradient-to-r from-green-400 to-green-500'
                          : status === 'in-progress'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse'
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${chapterProgress}%` }}
                    />
                  </div>
                  {progress?.startedAt && (
                    <p className="mt-2 text-xs text-gray-500">
                      开始于: {new Date(progress.startedAt).toLocaleDateString()}
                      {progress.completedAt && (
                        <> · 完成于: {new Date(progress.completedAt).toLocaleDateString()}</>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterProgressBar;
