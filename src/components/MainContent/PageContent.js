import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import DragDrop from 'editorjs-drag-drop';

const EDITOR_HOLDER_ID = 'editorjs';

// 초기 데이터 설정
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

// EditorJS 도구 설정
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
    // 이미지 도구를 추가하려면 아래 주석을 해제하고 설정하세요
    // image: {
    //   class: ImageTool,
    //   config: {
    //     endpoints: {
    //       byFile: '/api/upload-image', // 서버 이미지 업로드 엔드포인트
    //       byUrl: '/api/fetch-image',   // 서버 이미지 URL 가져오기 엔드포인트
    //     },
    //     field: 'image', // 이미지 파일 필드 이름
    //   },
    // },
};

// 디바운싱 함수
const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const PageContent = () => {
    const ejInstance = useRef(null);
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // 타이틀 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.textContent);
    };

    // 에디터 내용 저장 핸들러
    const handleEditorSave = async () => {
        if (!ejInstance.current) return;

        try {
            setIsSaving(true);
            const savedData = await ejInstance.current.save();
            console.log('Content saved:', savedData);

            // 서버에 데이터 전송 (예시)
            // await axios.post('/api/save-page', {
            //   title,
            //   content: savedData,
            // });

            // 로컬 상태 업데이트
            setEditorData(savedData);
        } catch (error) {
            console.error('Saving failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // 디바운싱된 저장 함수
    const debouncedSave = useRef(debounce(handleEditorSave, 2000)).current;

    // 에디터 초기화 - 한 번만 실행
    useEffect(() => {
        if (ejInstance.current) return;

        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
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

                // Drag & Drop 초기화
                const dragDrop = new DragDrop(`#${EDITOR_HOLDER_ID}`, {
                    // 필요한 경우 Drag & Drop 옵션 설정
                });

                dragDrop.listen();
            },
            minHeight: 0,
        });

        ejInstance.current = editor;

        return () => {
            if (ejInstance.current) {
                try {
                    ejInstance.current.destroy();
                    ejInstance.current = null;
                } catch (e) {
                    console.error('Editor cleanup failed:', e);
                }
            }
        };
    }, [debouncedSave, editorData]);

    return (
        <div className="flex-1 overflow-auto bg-white">
            <div className="max-w-4xl mx-auto p-8 relative">
                {/* 상단 상태 표시 */}
                {isSaving && (
                    <div className="fixed top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md text-sm z-50">
                        저장 중...
                    </div>
                )}

                {/* 페이지 제목 */}
                <div className="mb-10">
                    <div
                        className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
                        contentEditable
                        onInput={handleTitleChange}
                        suppressContentEditableWarning
                        spellCheck={false}
                        data-placeholder="제목을 입력하세요"
                    />
                    <div className="flex items-center text-sm text-gray-500 px-2">
                        <span>작성자</span>
                        <span className="mx-2">•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                {/* 에디터 컨테이너 */}
                <div
                    id={EDITOR_HOLDER_ID}
                    className="min-h-[calc(100vh-16rem)] w-full outline-none prose prose-sm max-w-none [&>div]:min-h-[calc(100vh-16rem)]"
                />

                {/* 에디터 스타일 커스터마이징 */}
                <style jsx global>{`
                    .codex-editor {
                        padding: 0 !important;
                    }
                    .ce-block__content {
                        max-width: 100% !important;
                        margin: 0;
                    }
                    .ce-toolbar__content {
                        max-width: 100% !important;
                        margin: 0;
                    }
                    .ce-paragraph {
                        line-height: 1.6;
                    }
                    .ce-block--selected .ce-block__content {
                        background: #f8f9fa;
                    }
                    .ce-toolbar__plus {
                        background-color: #f3f4f6;
                        border-radius: 4px;
                    }
                    .ce-toolbar__plus:hover {
                        background-color: #e5e7eb;
                    }
                    .ce-toolbar__settings-btn {
                        background-color: #f3f4f6;
                        border-radius: 4px;
                    }
                    .ce-toolbar__settings-btn:hover {
                        background-color: #e5e7eb;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default PageContent;
