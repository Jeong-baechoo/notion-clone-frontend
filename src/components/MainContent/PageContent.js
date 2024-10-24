import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import DragDrop from 'editorjs-drag-drop';
import { debounce } from 'lodash';
import axios from 'axios';

const EDITOR_HOLDER_ID = 'editorjs';

// Initial data setup
const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'This is my awesome editor!',
                level: 1,
            },
        },
    ],
};

// EditorJS tools configuration
const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        config: {
            levels: [1, 2, 3],
            defaultLevel: 1,
            inlineToolbar: true,
        },
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered',
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
    },
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C',
    },
    // To add the image tool, uncomment and configure the following:
    // image: {
    //     class: ImageTool,
    //     config: {
    //         endpoints: {
    //             byFile: '/api/upload-image', // Your image upload endpoint
    //             byUrl: '/api/fetch-image',   // Your image fetch endpoint
    //         },
    //         field: 'image', // The image file field name
    //     },
    // },
};

const PageContent = () => {
    const ejInstance = useRef(null);
    const holderRef = useRef(null);
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const dragDropInstance = useRef(null); // DragDrop 인스턴스를 위한 새로운 ref

    // Title change handler
    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.textContent);
    };

    // Editor content save handler
    const handleEditorSave = async () => {
        if (!ejInstance.current) return;

        try {
            setIsSaving(true);
            const savedData = await ejInstance.current.save();
            console.log('Content saved:', savedData);

            // Combine title and content
            const payload = {
                title: title || '새 페이지',
                content: savedData,
            };

            // Send data to server
            await axios.post('/api/save-page', payload);

            // Update local state
            setEditorData(savedData);
        } catch (error) {
            console.error('Saving failed:', error);
            // Optionally, show error message to the user
        } finally {
            setIsSaving(false);
        }
    };

    // Debounced save function
    const debouncedSave = useRef(debounce(handleEditorSave, 2000)).current;

    useEffect(() => {
        let editor = null;

        const initializeEditor = async () => {
            if (ejInstance.current || !holderRef.current) {
                return;
            }

            try {
                // Initialize EditorJS
                editor = new EditorJS({
                    holder: holderRef.current,
                    logLevel: 'ERROR',
                    data: editorData,
                    tools: EDITOR_JS_TOOLS,
                    autofocus: true,
                    placeholder: '여기에 입력하세요...',
                    onChange: () => {
                        console.log('Content changed');
                        debouncedSave();
                    },
                    onReady: () => {
                        console.log('Editor.js is ready to work!');

                        // DragDrop 초기화를 try-catch로 감싸기
                        try {
                            dragDropInstance.current = new DragDrop(holderRef.current, {
                                // options
                            });
                            dragDropInstance.current.listen();
                        } catch (error) {
                            console.error('DragDrop initialization failed:', error);
                        }
                    },
                    minHeight: 0,
                });

                ejInstance.current = editor;
            } catch (error) {
                console.error('Error initializing EditorJS:', error);
            }
        };

        initializeEditor();

        // Cleanup function to destroy EditorJS instance
        // Cleanup function
        return () => {
            const cleanup = async () => {
                try {
                    // DragDrop 인스턴스 정리
                    if (dragDropInstance.current) {
                        if (typeof dragDropInstance.current.destroy === 'function') {
                            dragDropInstance.current.destroy();
                        }
                        dragDropInstance.current = null;
                    }

                    // Editor 인스턴스 정리
                    if (ejInstance.current) {
                        await ejInstance.current.destroy();
                        ejInstance.current = null;
                    }
                } catch (error) {
                    console.error('Cleanup failed:', error);
                }
            };

            cleanup();
        };
    }, []);

    return (
        <div className="flex-1 overflow-auto bg-white">
            <div className="max-w-4xl mx-auto p-8 relative">
                {/* Saving status indicator */}
                {isSaving && (
                    <div className="fixed top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md text-sm z-50">
                        저장 중...
                    </div>
                )}

                {/* Page Title */}
                <div className="mb-10">
                    <div
                        className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
                        contentEditable
                        onInput={handleTitleChange}
                        suppressContentEditableWarning
                        spellCheck={false}
                        aria-label="Page Title"
                        data-placeholder="제목을 입력하세요"
                    />
                    <div className="flex items-center text-sm text-gray-500 px-2">
                        <span>작성자</span>
                        <span className="mx-2">•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Editor Container */}
                <div
                    ref={holderRef} // Assign the ref here
                    id={EDITOR_HOLDER_ID}
                    className="min-h-[calc(100vh-16rem)] w-full outline-none prose prose-sm max-w-none [&>div]:min-h-[calc(100vh-16rem)]"
                />

                {/* Editor Styles */}
                {/* Moved to editorStyles.css */}
            </div>
        </div>
    );
};

export default PageContent;
