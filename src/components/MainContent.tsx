import { SaveStatus } from '../hooks/useSavaStautus.ts';
import {EditorHeader} from "./EditorHeader.tsx";
import React from "react";
import EditorContainer from "./EditorContainer.tsx";
import {BlockNoteEditor} from "@blocknote/core";

interface MainContentProps {
    currentPage?: { title: string };
    currentPageId: string;
    updatePageTitle: (pageId: string, title: string) => void;
    saveStatus: SaveStatus;
    isLoading: boolean;
    editor: BlockNoteEditor;
    onContentChange: (content: any) => void;
}

const MainContent: React.FC<MainContentProps> = ({
                                                     currentPage,
                                                     currentPageId,
                                                     updatePageTitle,
                                                     saveStatus,
                                                     isLoading,
                                                     editor,
                                                     onContentChange
                                                 }) => {
    return (
        <div className="flex-1 flex flex-col">
            <EditorHeader
                title={currentPage?.title || ''}
                onTitleChange={(newTitle) => updatePageTitle(currentPageId, newTitle)}
                saveStatus={saveStatus}
            />
            <div className="flex-1 overflow-auto">
                <EditorContainer
                    isLoading={isLoading}
                    editor={editor}
                    onContentChange={onContentChange}
                />
            </div>
        </div>
    );
}
export default MainContent;
