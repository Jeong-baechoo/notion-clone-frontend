import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarLinks from './SidebarLinks';

const Sidebar = ({ isSidebarOpen, toggleSidebar, isHoveringTitle, setIsHoveringTitle }) => {
    return (
        <div className={`
      w-64 border-r border-gray-200 flex flex-col
      transform transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}
      fixed h-screen bg-neutral-100 z-10
    `}>
            {/* Top section */}
            <SidebarHeader
                toggleSidebar={toggleSidebar}
                isHoveringTitle={isHoveringTitle}
                setIsHoveringTitle={setIsHoveringTitle}
            />

            {/* Sidebar links */}
            <SidebarLinks />
        </div>
    );
};

export default Sidebar;
