import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import ImageTool from '@editorjs/image';
import DragDrop from 'editorjs-drag-drop';

const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        config: {
            levels: [1, 2, 3],
            defaultLevel: 1,
            inlineToolbar: true,
        }
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        }
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M'
    },
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
    },
    image: {
        class: ImageTool,
        config: {
            uploader: {
                uploadByFile: async (file) => {
                    try {
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                resolve({
                                    success: 1,
                                    file: {
                                        url: reader.result
                                    }
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                    } catch (error) {
                        console.error('Image upload failed:', error);
                        return { success: 0 };
                    }
                }
            }
        }
    }
};

const PageContent = () => {
    const ejInstance = useRef(null);
    const dragDropInstance = useRef(null);
    const [title, setTitle] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [blockCount, setBlockCount] = useState(0);

    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.textContent);
    };

    const handleBlockChange = async () => {
        if (!ejInstance.current) return;

        try {
            const data = await ejInstance.current.save();
            setBlockCount(data.blocks.length);
        } catch (error) {
            console.error('Failed to update blocks:', error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length && ejInstance.current) {
            for (const file of imageFiles) {
                await ejInstance.current.blocks.insert('image', { file });
            }
        }
    };

    useEffect(() => {
        if (ejInstance.current) return;

        // Initialize Editor.js
        const editor = new EditorJS({
            holder: 'editorjs',
            tools: EDITOR_JS_TOOLS,
            autofocus: true,
            placeholder: '여기에 입력하세요...',
            inlineToolbar: true,
            onChange: handleBlockChange,
            onReady: () => {
                // Initialize drag-drop after Editor.js is ready
                if (!dragDropInstance.current && editor) {
                    dragDropInstance.current = new DragDrop(editor);
                }
                handleBlockChange();
            },
            data: {
                blocks: [
                    {
                        type: 'paragraph',
                        data: {
                            text: ''
                        }
                    }
                ]
            }
        });

        ejInstance.current = editor;

        return () => {
            if (dragDropInstance.current) {
                dragDropInstance.current.destroy();
                dragDropInstance.current = null;
            }
            if (ejInstance.current) {
                try {
                    ejInstance.current.destroy();
                    ejInstance.current = null;
                } catch (e) {
                    console.error('Editor cleanup failed:', e);
                }
            }
        };
    }, []);

    return (
        <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr' }}>
            {/* Main content wrapper - auto로 늘어나는 영역 */}
            <div className="grid" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
                {/* Left auto section (if needed) */}
                <div className="w-auto"></div>

                {/* Center content */}
                <div className="w-full max-w-[720px] mx-auto pt-20">
                    {/* Title Section */}
                    <div className="mb-10">
                        <div
                            className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200"
                            contentEditable
                            onInput={handleTitleChange}
                            suppressContentEditableWarning
                            spellCheck={false}
                            data-placeholder="제목을 입력하세요"
                        />
                        <div className="flex items-center text-sm text-gray-500">
                            <span>작성자</span>
                            <span className="mx-2">•</span>
                            <span>{new Date().toLocaleDateString()}</span>
                            {blockCount > 0 && (
                                <>
                                    <span className="mx-2">•</span>
                                    <span>{blockCount} 블록</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Editor Container */}
                    <div
                        id="editorjs"
                        className={`
                            min-h-[calc(100vh-16rem)]
                            outline-none prose prose-sm max-w-none
                            ${isDragging ? 'border-2 border-dashed border-blue-400' : ''}
                        `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    />
                </div>

                {/* Right auto section (if needed) */}
                <div className="w-auto"></div>
            </div>

            {/* Bottom section for additional content */}
            <div className="bg-gray-50">
                {/* Additional content can go here */}
            </div>

            {/* Save indicator */}
            {isSaving && (
                <div className="fixed top-4 right-4 flex items-center bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
                    저장 중...
                </div>
            )}

            <style jsx global>{`
                .codex-editor {
                    padding: 0 !important;
                }

                .ce-block__content {
                    max-width: 100% !important;
                    margin: 0;
                    position: relative;
                }

                .ce-toolbar__content {
                    max-width: 100% !important;
                    margin: 0;
                }

                .ce-block {
                    padding: 3px 2px;
                    position: relative;
                }

                .ce-paragraph {
                    padding: 3px 2px;
                    min-height: 30px;
                    font-size: 16px;
                    line-height: 24px;
                }

                /* 드래그 중인 블록 스타일 */
                .ce-block--dragging {
                    opacity: 0.3;
                    background: transparent !important;
                }

                /* 드롭 타겟 스타일 */
                .ce-block--drop-target::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #2563EB;
                    opacity: 1;
                    transition: opacity 0.2s ease;
                }

                .ce-block--drop-target:last-child::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #2563EB;
                    opacity: 1;
                    transition: opacity 0.2s ease;
                }

                /* 호버/선택 스타일 */
                .ce-block--selected {
                    background: transparent;
                }

                .ce-block:hover {
                    background: transparent;
                }

                /* 드래그 핸들 */
                .ce-block--draggable {
                    cursor: grab;
                }

                .ce-block--dragging * {
                    cursor: grabbing !important;
                    pointer-events: none;
                }

                /* 툴바 */
                .ce-toolbar__plus {
                    color: #374151;
                    background: #F3F4F6;
                }

                .ce-toolbar__plus:hover {
                    background: #E5E7EB;
                }

                .ce-toolbar__settings-btn {
                    color: #374151;
                    background: #F3F4F6;
                }

                .ce-toolbar__settings-btn:hover {
                    background: #E5E7EB;
                }

                /* 이미지 블록 */
                .image-tool {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .image-tool__image {
                    max-width: 100%;
                    width: auto;
                }
            `}</style>
        </div>
    );
};

export default PageContent;