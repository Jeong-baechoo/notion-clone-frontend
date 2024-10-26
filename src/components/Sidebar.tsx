// components/Sidebar.tsx
import { Plus, File } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
    pages: Page[];
    currentPageId: string;
    onPageSelect: (pageId: string) => void;
    onCreatePage: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    pages,
                                                    currentPageId,
                                                    onPageSelect,
                                                    onCreatePage
                                                }) => {
    const handleCreatePage = async () => {
        try {
            await onCreatePage();
        } catch (error) {
            console.error('Failed to create page:', error);
            // 에러 처리 (예: 알림 표시)
        }
    };
    return (
        <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* 사이드바 헤더 */}
            <div className="h-12 border-b border-gray-200 px-4 flex items-center">
                <h1 className="text-lg font-semibold text-gray-700">내 페이지</h1>
            </div>

            {/* 페이지 목록 */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {pages.map((page) => (
                    <button
                        key={page.id}
                        onClick={() => onPageSelect(page.id)}
                        className={`
                            w-full px-3 py-2 rounded-lg text-left
                            flex items-center gap-2
                            ${currentPageId === page.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100 text-gray-700'}
                        `}
                    >
                        <File size={16} />
                        <span className="truncate">{page.title || "제목 없음"}</span>
                    </button>
                ))}
            </div>

            {/* 새 페이지 버튼 */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleCreatePage}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                    <Plus size={16} />
                    <span>새 페이지</span>
                </button>
            </div>
        </div>
    );
}
