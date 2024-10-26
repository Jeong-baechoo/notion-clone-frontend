// components/ServerDashboard.tsx
import { useState, useEffect } from 'react';

interface Log {
    timestamp: string;
    action: string;
    documentId: string;
    details: string;
    data?: string;
}

interface ServerStatus {
    documentsCount: number;
    logsCount: number;
    uptime: number;
    memory: {
        heapTotal: number;
        heapUsed: number;
    };
    lastLogs: Log[];
    documents: Array<{
        id: string;
        blocksCount: number;
        lastModified: string;
        updatedAt: string;
    }>;
}

export function ServerDashboard() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [status, setStatus] = useState<ServerStatus | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'logs' | 'documents'>('logs');

    const fetchData = async () => {
        try {
            const [logsRes, statusRes] = await Promise.all([
                fetch('http://localhost:3000/api/logs'),
                fetch('http://localhost:3000/api/status')
            ]);

            const logsData = await logsRes.json();
            const statusData = await statusRes.json();

            setLogs(logsData);
            setStatus(statusData);
        } catch (error) {
            console.error('Failed to fetch server data:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchData();
            const interval = setInterval(fetchData, 2000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md
                    hover:bg-gray-700 transition-colors duration-150"
            >
                Show Server Logs
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-[600px] bg-white rounded-lg shadow-lg border
            border-gray-200 max-h-[600px] flex flex-col">
            {/* 헤더 */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Server Status</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            {/* 서버 상태 */}
            {status && (
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>Documents: {status.documentsCount}</div>
                        <div>Logs: {status.logsCount}</div>
                        <div>Uptime: {Math.floor(status.uptime)}s</div>
                        <div>Memory: {Math.round(status.memory.heapUsed / 1024 / 1024)}MB</div>
                    </div>
                </div>
            )}

            {/* 탭 */}
            <div className="flex border-b border-gray-200">
                <button
                    className={`px-4 py-2 ${activeTab === 'logs' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('logs')}
                >
                    Logs
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'documents' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('documents')}
                >
                    Documents
                </button>
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 overflow-auto">
                {activeTab === 'logs' ? (
                    <div className="px-2 py-1">
                        {logs.map((log, i) => (
                            <div key={i} className="text-xs border-b border-gray-100 py-2">
                                <div className="flex justify-between text-gray-500">
                                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    <span className={`font-medium ${
                                        log.action === 'ERROR' ? 'text-red-500' :
                                            log.action === 'SAVE' ? 'text-blue-500' :
                                                log.action === 'CREATE' ? 'text-green-500' :
                                                    'text-gray-500'
                                    }`}>
                                        {log.action}
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <span className="text-gray-400">Doc: </span>
                                    {log.documentId}
                                </div>
                                <div className="text-gray-600">{log.details}</div>
                                {log.data && (
                                    <div className="mt-1 p-2 bg-gray-50 rounded">
                                        <pre className="text-gray-600 whitespace-pre-wrap">
                                            {log.data}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-2">
                        {status?.documents.map((doc) => (
                            <div key={doc.id} className="border-b border-gray-100 py-2">
                                <div className="text-sm font-medium">{doc.id}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    <div>Blocks: {doc.blocksCount}</div>
                                    <div>Last Modified: {new Date(doc.lastModified).toLocaleString()}</div>
                                    <div>Updated: {new Date(doc.updatedAt).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 푸터 */}
            <div className="p-2 border-t border-gray-200 flex justify-end">
                <button
                    onClick={fetchData}
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}
