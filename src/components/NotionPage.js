import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';

const NotionPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isHoveringTitle={isHoveringTitle}
                setIsHoveringTitle={setIsHoveringTitle}
            />

            {/* Main content */}
            <MainContent
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
        </div>
    );
};

export default NotionPage;
