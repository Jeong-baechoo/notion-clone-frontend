import { useState, useCallback } from 'react';
import { Block } from "@blocknote/core";
import { debounce } from 'lodash';

export interface SaveStatus {
    status: 'saved' | 'saving' | 'error';
    lastSaved?: Date;
    errorMessage?: string;
}

export const useSaveStatus = (currentPageId: string) => {
    const [saveStatus, setSaveStatus] = useState<SaveStatus>({ status: 'saved' });

    const saveContent = useCallback(async (content: Block[]) => {
        if (!currentPageId) return;

        try {
            setSaveStatus({ status: 'saving' });

            const response = await fetch(`http://localhost:3000/api/pages/${currentPageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blocks: content,  // 필드 이름을 'blocks'로 변경
                    lastModified: new Date()
                }),
            });

            if (!response.ok) throw new Error('Failed to save');

            const data = await response.json();
            setSaveStatus({
                status: 'saved',
                lastSaved: new Date(data.lastModified)
            });
        } catch (error) {
            console.error('Save error:', error);
            setSaveStatus({
                status: 'error',
                errorMessage: error instanceof Error ? error.message : 'Failed to save'
            });
        }
    }, [currentPageId]);

    const debouncedSave = useCallback(
        debounce((content: Block[]) => {
            saveContent(content);
        }, 1000),
        [saveContent]
    );

    return { saveStatus, debouncedSave };
};
