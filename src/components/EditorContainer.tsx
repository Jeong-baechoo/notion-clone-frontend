// src/components/EditorContainer.tsx
import {BlockNoteEditor} from "@blocknote/core";
import React from "react";

import LoadingSpinner from "./LoadingSpinner.tsx";
import {EditorContent} from "@blocknote/react/types/src/editor/EditorContent";

interface EditorContainerProps {
    isLoading: boolean;
    editor: BlockNoteEditor;
    onContentChange: (content: any) => void;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
                                                             isLoading,
                                                             editor,
                                                             onContentChange
                                                         }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <EditorContent editor={editor} onContentChange={onContentChange} />;
}

;
