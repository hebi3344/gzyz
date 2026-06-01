import React, { useMemo } from 'react';
import { useProgressStore, Achievement } from '../store/useProgressStore';
import { Trophy, Clock, Target, Award, TrendingUp, Zap } from 'lucide-react';

interface ProgressVisualizationProps {
  courseId: string;
}

export const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({ courseId }) => {
  const {
    progress,
    completedModules,
    learningTime,
    totalLearningTime,
    chapterProgress,
    unlockedAchievements,
    achievements,
    currentStreak
  } = useProgressStore();

  const courseProgress = progress[courseId] || 0;
  const courseTime = learningTime[courseId] || 0;
  const chapters = chapterProgress[courseId] || {};

  const formattedTotalTime = useMemo(() => {
    const hours = Math.floor(totalLearningTime / 60);
    const minutes = totalLearningTime % 60;
    return { hours, minutes };
  }, [totalLearningTime]);

  const completedChaptersCount = useMemo(() => {
    return Object.values(chapters).filter(c => c.completed).length;
  }, [chapters]);

  const overallProgress = useMemo(() => {
    return Math.round((Object.values(chapters).length > 0
      ? (completedChaptersCount / Object.keys(chapters).length) * 100
      : courseProgress));
  }, [chapters, completedChaptersCount, courseProgress]);

  return (
    <div className="space-y-6">
      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">课程进度</p>
              <p className="text-3xl font-bold mt-1">{overallProgress}%</p>
            </div>
            <Target className="h-12 w-12 text-blue-200 opacity-50" />
          </div>
          <div className="mt-4 bg-blue-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white rounded-full h-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">本课程学习</p>
              <p className="text-3xl font-bold mt-1">
                {Math.floor(courseTime / 60)}h {courseTime % 60}m
              </p>
            </div>
            <Clock className="h-12 w-12 text-purple-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">累计学习</p>
              <p className="text-3xl font-bold mt-1">
                {formattedTotalTime.hours}h {formattedTotalTime.minutes}m
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">学习连续</p>
              <p className="text-3xl font-bold mt-1">{currentStreak} 天</p>
            </div>
            <Zap className="h-12 w-12 text-orange-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* 章节进度条 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          章节完成进度
        </h3>
        {Object.keys(chapters).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(chapters).map(([chapterId, chapter]) => (
              <div key={chapterId} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {chapterId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`text-sm font-semibold ${
                    chapter.completed ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {chapter.completed ? '已完成' : `${Math.round(chapter.progress)}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      chapter.completed
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : 'bg-gradient-to-r from-blue-400 to-blue-600'
                    }`}
                    style={{ width: `${chapter.progress}%` }}
                  />
                </div>
                {chapter.completed && chapter.completedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    完成于: {new Date(chapter.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>暂无章节进度数据</p>
          </div>
        )}
      </div>

      {/* 成就展示 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
          学习成就 ({unlockedAchievements.length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            return (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                isUnlocked={isUnlocked}
              />
            );
          })}
        </div>
      </div>

      {/* 完成模块 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-purple-600" />
          已完成模块 ({completedModules.length})
        </h3>
        {completedModules.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {completedModules.map((moduleId) => (
              <span
                key={moduleId}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {moduleId}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>暂无完成的模块</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, isUnlocked }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
  };

  const bgColorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div
      className={`relative group p-4 rounded-xl transition-all duration-300 ${
        isUnlocked
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md hover:shadow-lg hover:-translate-y-1'
          : 'bg-gray-50 opacity-60'
      }`}
    >
      <div
        className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
          isUnlocked ? bgColorClasses[achievement.color as keyof typeof bgColorClasses] : 'bg-gray-300'
        }`}
      >
        <svg
          className={`h-8 w-8 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={achievement.icon}
          />
        </svg>
      </div>
      <h4 className="mt-3 text-sm font-semibold text-gray-900 text-center">
        {achievement.title}
      </h4>
      <p className="mt-1 text-xs text-gray-600 text-center">
        {achievement.description}
      </p>
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center text-white">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">未解锁</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressVisualization;
