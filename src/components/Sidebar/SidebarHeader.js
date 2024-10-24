import React from 'react';
import { ChevronDown, ChevronsLeft, SquarePen } from 'lucide-react';
import IconButton from '../common/IconButton';

const SidebarHeader = ({ toggleSidebar, isHoveringTitle, setIsHoveringTitle }) => {
    return (
        <div className="h-11 flex items-center justify-between px-3 border-b border-gray-200">
            {/* Left side with hover area */}
            <div className="flex-1 flex items-center justify-between">
                <div
                    className="flex items-center space-x-2 cursor-pointer group"
                    onMouseEnter={() => setIsHoveringTitle(true)}
                    onMouseLeave={() => setIsHoveringTitle(false)}
                >
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">열린 작업 No...</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>

                    {/* Close button with hover effect */}
                    <div className={`transition-opacity duration-200 ${isHoveringTitle ? 'opacity-100' : 'opacity-0'}`}>
                        <IconButton onClick={toggleSidebar} className="ml-2">
                            <ChevronsLeft className="h-4 w-4 text-gray-500" />
                        </IconButton>
                    </div>
                </div>

                {/* Right side with Plus button */}
                <IconButton>
                    <SquarePen className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                </IconButton>
            </div>
        </div>
    );
};

export default SidebarHeader;
