import React from 'react';
import { ChevronDown,Search, ChevronsLeft, SquarePen } from 'lucide-react';
import IconButton from '../common/IconButton';

const SidebarHeader = ({ toggleSidebar, isHoveringTitle, setIsHoveringTitle }) => {
    return (
        <div className="p-3 border-b border-gray-200">
            {/* Workspace title row */}
            <div className="flex items-center justify-between mb-2">
                {/* Left side with hover area */}
                <div className="flex-1 flex items-center justify-between pr-2">
                    <div
                        className="flex items-center space-x-2 group cursor-pointer"
                        onMouseEnter={() => setIsHoveringTitle(true)}
                        onMouseLeave={() => setIsHoveringTitle(false)}
                    >
                        <span className="text-sm text-gray-700">열린 작업 No...</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>

                    {/* Close button with hover effect */}
                    <div className={`transition-opacity duration-200 ${isHoveringTitle ? 'opacity-100' : 'opacity-0'}`}>
                        <IconButton onClick={toggleSidebar}>
                            <ChevronsLeft className="h-5 w-5 text-gray-500" />
                        </IconButton>
                    </div>
                </div>

                {/* Right side with Plus button */}
                <div className="flex items-center">
                    <IconButton>
                        <SquarePen className="h-5 w-5 text-gray-500 hover:text-gray-800" />
                    </IconButton>
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
    );
};

export default SidebarHeader;
