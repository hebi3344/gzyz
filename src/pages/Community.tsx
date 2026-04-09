import React from 'react';

const Community: React.FC = () => {
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
                <a href="/learning" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  学习中心
                </a>
                <a href="/community" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            社区中心
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            与其他学习者交流，分享学习经验，共同成长
          </p>
        </div>

        {/* 发布帖子 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              发布新帖子
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="输入帖子标题"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  内容
                </label>
                <textarea
                  id="content"
                  rows={4}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="分享你的学习经验或问题..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  发布
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 帖子列表 */}
        <div className="mt-10">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            最新帖子
          </h3>
          <div className="space-y-4">
            {/* 帖子 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        张三
                      </h4>
                      <p className="text-xs text-gray-500">
                        2小时前
                      </p>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                      如何提高数据分析的效率？
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      最近在学习数据分析，感觉效率不是很高，有什么好的方法可以提高分析效率吗？特别是在处理大量数据时，有什么工具或技巧推荐？
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        12 回复
                      </button>
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        28 点赞
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 帖子 2 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        李四
                      </h4>
                      <p className="text-xs text-gray-500">
                        昨天
                      </p>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                        Python数据分析库推荐
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        刚学完Python数据分析课程，想分享一下我常用的几个库：pandas、numpy、matplotlib、seaborn。这些库在数据分析和可视化方面非常强大，推荐给大家！
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        8 回复
                      </button>
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        45 点赞
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 帖子 3 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        王五
                      </h4>
                      <p className="text-xs text-gray-500">
                        3天前
                      </p>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                        商务数据分析案例分享
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        最近完成了一个商务数据分析的案例，分析了某电商平台的销售数据，发现了一些有趣的趋势。想和大家分享一下分析过程和结果，希望能给大家一些启发。
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        15 回复
                      </button>
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        32 点赞
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 排行榜 */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            学习活跃度排行榜
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h4 className="text-lg font-medium text-gray-900">
                本周TOP 5
              </h4>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">张三</h5>
                    <p className="text-sm text-gray-500">学习时长: 24小时</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  120 积分
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">李四</h5>
                    <p className="text-sm text-gray-500">学习时长: 18小时</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  95 积分
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">王五</h5>
                    <p className="text-sm text-gray-500">学习时长: 15小时</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  80 积分
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">赵六</h5>
                    <p className="text-sm text-gray-500">学习时长: 12小时</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  65 积分
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    5
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">孙七</h5>
                    <p className="text-sm text-gray-500">学习时长: 10小时</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  50 积分
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

export default Community;