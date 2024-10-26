import {Block} from "@blocknote/core";

export interface Page {
    id: string;
    title: string;
    emoji?: string;
    content: Block[];
    lastModified: Date;
}
