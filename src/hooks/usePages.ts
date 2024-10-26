// src/hooks/usePages.ts
import { useState, useCallback, useEffect, useRef } from 'react';
import { Block } from "@blocknote/core";
import { debounce } from 'lodash';

interface Page {
    id: string;
    title: string;
    blocks: Block[];
    lastModified: Date;
}

export const usePages = (editor: any) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [currentPageId, setCurrentPageId] = useState<string>('');
    const currentPageIdRef = useRef<string>('');
    const [isLoading, setIsLoading] = useState(true);

    // currentPageId 변경 시 ref도 업데이트
    useEffect(() => {
        currentPageIdRef.current = currentPageId;
    }, [currentPageId]);

    // 모든 페이지 로드
    const loadPages = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/pages');

            if (!response.ok) {
                throw new Error('Failed to load pages');
            }

            const data = await response.json();
            if (data.pages) {
                setPages(data.pages);
                // 첫 페이지가 있으면 선택
                if (data.pages.length > 0) {
                    const firstPage = data.pages[0];
                    setCurrentPageId(firstPage.id);
                    currentPageIdRef.current = firstPage.id; // Ref 업데이트
                    editor.replaceBlocks(editor.topLevelBlocks, firstPage.blocks);
                }
            }
        } catch (error) {
            console.error('Failed to load pages:', error);
        } finally {
            setIsLoading(false);
        }
    }, [editor]);

    // 페이지 생성
    const createPage = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: "새 페이지",
                    blocks: editor.document || []
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create page');
            }

            const newPage = await response.json();
            setPages(prev => [...prev, newPage]);
            setCurrentPageId(newPage.id);
            currentPageIdRef.current = newPage.id; // Ref 업데이트
            editor.replaceBlocks(editor.topLevelBlocks, newPage.blocks);
            return newPage;
        } catch (error) {
            console.error('Failed to create page:', error);
            throw error;
        }
    }, [editor]);

    // 페이지 선택
    const selectPage = useCallback(async (pageId: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/pages/${pageId}`);

            if (!response.ok) {
                throw new Error('Failed to load page');
            }

            const page = await response.json();
            setCurrentPageId(pageId);
            currentPageIdRef.current = pageId; // Ref 업데이트
            editor.replaceBlocks(editor.topLevelBlocks, page.blocks);

            // 페이지 목록 업데이트
            setPages(prev => prev.map(p =>
                p.id === pageId ? page : p
            ));
        } catch (error) {
            console.error('Failed to load page:', error);
        } finally {
            setIsLoading(false);
        }
    }, [editor]);

    // 페이지 저장
    const savePage = useCallback(async (pageId: string, blocks: Block[]) => {
        try {
            // 블록 데이터 정규화 (필요하다면)
            // const normalizedBlocks = normalizeBlocks(blocks);

            const response = await fetch(`http://localhost:3000/api/pages/${pageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocks })
            });

            if (!response.ok) {
                throw new Error('Failed to save page');
            }

            const updatedPage = await response.json();
            setPages(prev => prev.map(page =>
                page.id === pageId ? updatedPage : page
            ));

            return updatedPage;
        } catch (error) {
            console.error('Failed to save page:', error);
            throw error;
        }
    }, []);

    // 페이지 삭제
    const deletePage = useCallback(async (pageId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/pages/${pageId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete page');
            }

            setPages(prev => prev.filter(page => page.id !== pageId));

            // 삭제된 페이지가 현재 페이지였다면 다른 페이지 선택
            if (currentPageIdRef.current === pageId) {
                const remainingPages = pages.filter(page => page.id !== pageId);
                if (remainingPages.length > 0) {
                    await selectPage(remainingPages[0].id);
                } else {
                    setCurrentPageId('');
                    currentPageIdRef.current = '';
                    editor.replaceBlocks(editor.topLevelBlocks, []);
                }
            }
        } catch (error) {
            console.error('Failed to delete page:', error);
            throw error;
        }
    }, [pages, selectPage, editor]);

    // 자동 저장
    useEffect(() => {
        if (!currentPageId) return;

        const debouncedSave = debounce(async () => {
            try {
                const blocks = editor.document;
                await savePage(currentPageIdRef.current, blocks);
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
        }, 1000);

        const unsubscribe = editor.onChange(() => {
            debouncedSave();
        });

        return () => {
            unsubscribe?.();
            debouncedSave.cancel();
        };
    }, [editor, savePage]);

    // 초기 로드
    useEffect(() => {
        loadPages();
    }, [loadPages]);

    return {
        pages,
        currentPageId,
        isLoading,
        loadPages,
        selectPage,
        createPage,
        deletePage,
        savePage
    };
};
