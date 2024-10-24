import React from 'react';

const PageContent = () => {
    return (
        <div className="flex-1 overflow-auto bg-white">
            <div className="max-w-4xl mx-auto p-8">
                {/* Page title */}
                <div className="mb-10">
                    <div
                        className="text-4xl font-bold text-gray-800 mb-1 outline-none empty:before:content-['새_페이지'] empty:before:text-stone-200"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        spellCheck={false}
                    />
                    <div className="flex items-center text-sm text-gray-500">
                        <span>작성자</span>
                        <span className="mx-2">•</span>
                        <span>지금</span>
                    </div>
                </div>

                {/* Editable content */}
                <div
                    className="min-h-[calc(100vh-16rem)] w-full outline-none prose prose-sm max-w-none empty:before:content-['여기에_입력하세요...'] empty:before:text-stone-400"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default PageContent;
