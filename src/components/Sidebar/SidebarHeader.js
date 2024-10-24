import React from 'react';
import { ChevronDown, ChevronsLeft, SquarePen } from 'lucide-react';
import IconButton from '../common/IconButton';
import * as PropTypes from "prop-types";

const HoverableIcon = ({ onClick, icon: IconComponent, isVisible }) => (
    <div
        className={`
            transition-opacity duration-300 ease-in-out
            ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
    >
        <IconButton onClick={onClick}>
            <IconComponent className="h-5 w-5 text-gray-500" />
        </IconButton>
    </div>
);

HoverableIcon.propTypes = {icon: PropTypes.func};

const SidebarHeader = ({ toggleSidebar, isHoveringTitle }) => {
    return (
        <div className="h-11 flex items-center px-3 border-b border-gray-200">
            {/* Title section */}
            <div className="flex-1 flex items-center space-x-2">
                <span className="text-sm text-gray-700">열린 작업 No...</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Buttons container */}
            <div className="flex items-center">
                <HoverableIcon
                    onClick={toggleSidebar}
                    icon={ChevronsLeft}
                    isVisible={isHoveringTitle}
                />
                <IconButton>
                    <SquarePen className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                </IconButton>
            </div>
        </div>
    );
};

export default SidebarHeader;
