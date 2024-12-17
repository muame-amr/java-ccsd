import lexicalEditorTheme from "./lexicalEditorTheme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import '../App.css';
import { ImageNode } from "./nodes/imageNode";
function onError(error) {
    console.error(error);
  }

const editorTheme = {
    // Theme styling goes here
    lexicalEditorTheme
  }
  

const lexicalEditorConfig  = {

    namespace: 'MyEditor',
    theme: lexicalEditorTheme,
    onError,
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        ImageNode,
      ],
};

export default lexicalEditorConfig;