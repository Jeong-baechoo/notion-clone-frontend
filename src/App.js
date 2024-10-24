import React, { useState } from 'react';
import { ChevronDown,House,Inbox, Search, Settings, Star, Clock, Share2, ChevronsLeft, ChevronsRight, SquarePen } from 'lucide-react';

const NotionPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`
        w-64 border-r border-gray-200 flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}
        fixed h-screen bg-neutral-100 z-10
      `}>
        {/* Top section */}
        <div className="p-3 border-b border-gray-200">
          {/* Workspace title row */}
          <div className="flex items-center justify-between mb-2">
            {/* Left side with hover area */}
            <div className="flex-1 flex items-center justify-between pr-2">
              <div
                className="flex items-center space-x-2 group cursor-pointer"
              >
                <span className="text-sm text-gray-700">열린 작업 No...</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {/* Close button with hover effect */}
              <div className={`transition-opacity duration-200 ${isHoveringTitle ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onMouseEnter={() => setIsHoveringTitle(true)}
                  onMouseLeave={() => setIsHoveringTitle(false)}
                  onClick={toggleSidebar}
                  className="hover:bg-gray-100 rounded p-1"
                >
                  <ChevronsLeft className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Right side with Plus button */}
            <div className="flex items-center">
              <button className="hover:bg-gray-100 rounded p-1">
                <SquarePen className="h-5 w-5 text-gray-500 hover:text-gray-800" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <input
              className="bg-transparent text-sm outline-none flex-1 text-gray-700 min-w-0"
              placeholder="검색"
            />
          </div>
        </div>

        {/* Sidebar links */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-1 py-2">
            <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
              <House className="h-5 w-5 mr-2 text-gray-500"/> 홈
            </div>
            <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
              <Inbox className="h-5 w-5 mr-2 text-gray-500"/> 수신함
            </div>
            <div className="mt-4">
              <div className="px-3 mb-2 text-xs font-medium text-gray-500">즐겨찾기</div>
              <div
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
                <div className="mr-2">⭐</div>
                빠른 참조
              </div>
            </div>
            <div className="mt-4">
              <div className="px-3 mb-2 text-xs font-medium text-gray-500">워크스페이스</div>
              <div
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
                <div className="mr-2">📄</div>
                개인 페이지
              </div>
              <div
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
                <div className="mr-2">📚</div>
                공유된 페이지
              </div>
              <div
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer">
                <div className="mr-2">🗑️</div>
                휴지통
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`
        flex-1 flex flex-col
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'ml-64' : 'ml-0'}
      `}>
        {/* Top bar */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="flex items-center space-x-2">
            {!isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="hover:bg-gray-100 p-1.5 rounded mr-2"
              >
                <ChevronsRight className="h-5 w-5 text-gray-500" />
              </button>
            )}
            <button className="hover:bg-gray-100 p-1.5 rounded">
              <Share2 className="h-4 w-4 text-gray-500" />
            </button>
            <button className="hover:bg-gray-100 p-1.5 rounded">
              <Star className="h-4 w-4 text-gray-500" />
            </button>
            <button className="hover:bg-gray-100 p-1.5 rounded">
              <Clock className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-gray-100 p-1.5 rounded">
              <Settings className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            {/* Page title */}
            <div className="mb-10">
              <div
                className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200"
                contentEditable="true"
                suppressContentEditableWarning={true}
                spellCheck={false}
              />
              <div className="flex items-center text-sm text-gray-500">
                <span>작성자</span>
                <span className="mx-2">•</span>
                <span>지금</span>
              </div>
            </div>

            {/* Editable content */}
            <div
              className="min-h-[calc(100vh-16rem)] w-full outline-none prose prose-sm max-w-none empty:before:content-['여기에_입력하세요...'] empty:before:text-stone-400"
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionPage;
