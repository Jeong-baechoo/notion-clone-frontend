import React from 'react';
import { House, Inbox, Search } from 'lucide-react';

const SidebarLinks = () => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="px-1 py-2">
                {/* Search bar */}
                <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                    <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <input
                        className="bg-transparent text-sm outline-none flex-1 text-gray-700 min-w-0"
                        placeholder="검색"
                    />
                </div>

                {/* Main Links */}
                <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                    <House className="h-5 w-5 mr-2 text-gray-500"/> 홈
                </div>
                <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                    <Inbox className="h-5 w-5 mr-2 text-gray-500"/> 수신함
                </div>

                {/* Favorites */}
                <div className="mt-4">
                    <div className="px-3 mb-2 text-xs font-medium text-gray-500">즐겨찾기</div>
                    <div
                        className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                        <div className="mr-2">⭐</div>
                        빠른 참조
                    </div>
                </div>

                {/* Workspace */}
                <div className="mt-4">
                    <div className="px-3 mb-2 text-xs font-medium text-gray-500">워크스페이스</div>
                    <div
                        className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                        <div className="mr-2">📄</div>
                        개인 페이지
                    </div>
                    <div
                        className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                        <div className="mr-2">📚</div>
                        공유된 페이지
                    </div>
                    <div
                        className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
                        <div className="mr-2">🗑️</div>
                        휴지통
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarLinks;
