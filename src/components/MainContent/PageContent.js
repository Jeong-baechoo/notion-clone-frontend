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

const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        config: {
            levels: [1, 2, 3],
            defaultLevel: 1,
            inlineToolbar: true,
        },
        shortcut: 'CMD+ALT+1',
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered',
        },
        shortcut: 'CMD+SHIFT+8',
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            placeholder: '/ 를 입력하여 명령어를 사용하세요',
        }
    },
    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
    },
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+E',
    }
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
                    tools: EDITOR_JS_TOOLS,
                    placeholder: '/ 를 입력하여 명령어를 사용하세요',
                    inlineToolbar: true,
                    data: editorData,
                    onChange: () => {
                        debouncedSave();
                    },
                    autofocus: true,
                    logLevel: 'ERROR',
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
        <div className="w-full max-w-4xl mx-auto px-8 py-10">
            {/* Title Section */}
            <div className="mb-10">
                <div
                    className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200"
                    contentEditable
                    onInput={handleTitleChange}
                    suppressContentEditableWarning
                    spellCheck={false}
                />
                <div className="flex items-center text-sm text-gray-500">
                    <span>작성자</span>
                    <span className="mx-2">•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                    {/* blockCount 상태가 필요하다면 추가해야 합니다 */}
                </div>
            </div>

            {/* Editor Container */}
            <div
                ref={holderRef}
                id={EDITOR_HOLDER_ID}
            />

            {/* Saving indicator */}
            {isSaving && (
                <div className="fixed top-4 right-4 flex items-center bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
                    저장 중...
                </div>
            )}
        </div>
    );
};

export default PageContent;
