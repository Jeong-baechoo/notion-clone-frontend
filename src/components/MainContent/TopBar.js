import React from 'react';
import { Share2, Star, Clock, Settings, ChevronsRight } from 'lucide-react';
import IconButton from '../common/IconButton';

const TopBar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
            <div className="flex items-center space-x-2">
                {!isSidebarOpen && (
                    <IconButton onClick={toggleSidebar} className="mr-2">
                        <ChevronsRight className="h-5 w-5 text-gray-500" />
                    </IconButton>
                )}
                <IconButton>
                    <Share2 className="h-4 w-4 text-gray-500" />
                </IconButton>
                <IconButton>
                    <Star className="h-4 w-4 text-gray-500" />
                </IconButton>
                <IconButton>
                    <Clock className="h-4 w-4 text-gray-500" />
                </IconButton>
            </div>
            <div className="flex items-center">
                <IconButton>
                    <Settings className="h-4 w-4 text-gray-500" />
                </IconButton>
            </div>
        </div>
    );
};

export default TopBar;
