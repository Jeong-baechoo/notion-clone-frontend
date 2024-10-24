import React from 'react';
import { Share2, Star, Clock, Settings, ChevronsRight } from 'lucide-react';
import IconButton from '../common/IconButton';

const TopBar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className="h-11 border-gray-200 flex items-center justify-between px-4 py-4 bg-white">
            <div className="flex items-center">
                {!isSidebarOpen && (
                    <div className="mr-3">
                        <IconButton onClick={toggleSidebar}>
                            <ChevronsRight className="h-4 w-4 text-gray-500" />
                        </IconButton>
                    </div>
                )}
                <div className="flex items-center space-x-1">
                    <IconButton tooltipText="공유">
                        <Share2 className="h-4 w-4 text-gray-500" />
                    </IconButton>
                    <IconButton tooltipText="즐겨찾기">
                        <Star className="h-4 w-4 text-gray-500" />
                    </IconButton>
                    <IconButton tooltipText="기록">
                        <Clock className="h-4 w-4 text-gray-500" />
                    </IconButton>
                </div>
            </div>

            <div className="flex items-center">
                <IconButton tooltipText="설정">
                    <Settings className="h-4 w-4 text-gray-500" />
                </IconButton>
            </div>
        </div>
    );
};

export default TopBar;