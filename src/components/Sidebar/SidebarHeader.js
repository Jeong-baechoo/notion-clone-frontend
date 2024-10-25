import React, { useState } from 'react';
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

const SidebarHeader = ({ toggleSidebar, isHoveringTitle, setIsHoveringTitle }) => {
    // 드롭다운 표시 여부를 관리하는 상태 추가
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div className="h-11 flex items-center px-3 border-b border-gray-200">
            {/* 좌측 메뉴 */}
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 font-semibold">열린 작업 No..</span>
                <IconButton onClick={toggleDropdown}>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </IconButton>
            </div>

            {/* 드롭다운 메뉴 */}
            <div
                className={`absolute top-12 left-0 bg-white shadow-lg border rounded-md p-3 z-10 w-56 transition-all duration-300 transform ${
                    isDropdownOpen
                        ? 'opacity-100 scale-100 translate-y-0' // 드롭다운이 스르륵 나타남
                        : 'opacity-0 scale-95 -translate-y-4 pointer-events-none' // 사라질 때
                }`}
            >
                <ul className="text-sm text-gray-600">
                    <li className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">내 노션</li>
                    <li className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">게스트 워크스페이스</li>
                    <li className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">계정 설정</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">로그아웃</li>
                </ul>
            </div>

            <div className="flex items-center">
                {/* 닫기 버튼 */}
                <div
                    className={`transition-opacity duration-200 ${isHoveringTitle ? 'opacity-100' : 'opacity-0'}`}
                    onMouseEnter={() => setIsHoveringTitle(true)}
                    onMouseLeave={() => setIsHoveringTitle(false)}
                >
                    <IconButton onClick={toggleSidebar}>
                        <ChevronsLeft className="h-4 w-4 text-gray-500" />
                    </IconButton>
                </div>

                {/* 추가 버튼 */}
                <IconButton>
                    <SquarePen className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                </IconButton>
            </div>
        </div>
    );
};

export default SidebarHeader;
