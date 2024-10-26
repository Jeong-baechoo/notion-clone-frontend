import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

interface EditorContentProps {
    editor: BlockNoteEditor;
    onContentChange: (content: any) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({ editor, onContentChange }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    onContentChange(editor.document);
                }}
            />
        </div>
    );
} export default EditorContent;
