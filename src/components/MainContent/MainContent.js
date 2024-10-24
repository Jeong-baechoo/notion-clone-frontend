import React from 'react';
import TopBar from './TopBar';
import PageContent from './PageContent';

const MainContent = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`
      flex-1 flex flex-col
      transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'ml-64' : 'ml-0'}
    `}>
            {/* Top bar */}
            <TopBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Page content */}
            <PageContent />
        </div>
    );
};

export default MainContent;
