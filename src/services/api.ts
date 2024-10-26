import { API_BASE_URL } from '../config/api';

export const api = {
    async healthCheck() {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    },

    async getPages() {
        const response = await fetch(`${API_BASE_URL}/pages`);
        if (!response.ok) throw new Error('Failed to fetch pages');
        return response.json();
    },

    async createPage(data: { title: string; content: any[] }) {
        const response = await fetch(`${API_BASE_URL}/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create page');
        return response.json();
    },

    async updatePage(id: string, data: { title?: string; content?: any[] }) {
        const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update page');
        return response.json();
    },

    async getPage(id: string) {
        const response = await fetch(`${API_BASE_URL}/pages/${id}`);
        if (!response.ok) throw new Error('Failed to fetch page');
        return response.json();
    },
};
