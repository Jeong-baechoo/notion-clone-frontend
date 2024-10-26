// src/components/EditorHeader.tsx
import React from 'react';
import { SaveStatus } from'../hooks/useSavaStautus'

interface EditorHeaderProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    saveStatus: SaveStatus;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
                                                              title,
                                                              onTitleChange,
                                                              saveStatus
                                                          }) => (
    <nav className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-4">
            <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="제목 없음"
                className="text-lg font-medium bg-transparent outline-none"
            />
        </div>
        <div className="text-sm">
            {saveStatus.status === 'saved' && saveStatus.lastSaved && (
                <span className="text-gray-500">
                    마지막 저장: {saveStatus.lastSaved.toLocaleTimeString()}
                </span>
            )}
            {saveStatus.status === 'saving' && (
                <span className="text-gray-500">저장 중...</span>
            )}
            {saveStatus.status === 'error' && (
                <span className="text-red-500">
                    저장 실패: {saveStatus.errorMessage}
                </span>
            )}
        </div>
    </nav>
);
