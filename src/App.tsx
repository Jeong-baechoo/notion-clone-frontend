import { useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Sidebar } from "./components/Sidebar";
import { EditorHeader } from "./components/EditorHeader";
import { ServerDashboard } from "./components/ServerDashboard";
import { usePages } from "./hooks/usePages";
import { useSaveStatus } from "./hooks/useSavaStautus";

export default function App() {
    const editor = useCreateBlockNote({
        initialContent: [{
            type: "paragraph",
            content: "시작하려면 이곳을 클릭하세요...",
        }]
    });

    const {
        pages,
        currentPageId,
        isLoading,
        loadPages,
        createPage,
        selectPage,
        updatePageTitle
    } = usePages(editor);

    const { saveStatus, debouncedSave } = useSaveStatus(currentPageId);

    useEffect(() => {
        loadPages();
    }, [loadPages]);

    const currentPage = pages.find(p => p.id === currentPageId);

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar
                pages={pages} // 페이지 목록
                currentPageId={currentPageId} // 현재 선택된 페이지 ID
                onPageSelect={selectPage}   // 페이지 선택 시
                onCreatePage={createPage}   // 페이지 생성 시
            />

            <div className="flex-1 flex flex-col">
                <EditorHeader
                    title={currentPage?.title || ''}
                    onTitleChange={(newTitle) => updatePageTitle(currentPageId, newTitle)}
                    saveStatus={saveStatus}
                />

                <div className="flex-1 overflow-auto">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-500">데이터를 불러오는 중...</div>
                            </div>
                        ) : (
                            <BlockNoteView
                                editor={editor}
                                onChange={() => {
                                    debouncedSave(editor.document);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ServerDashboard />
        </div>
    );
}
