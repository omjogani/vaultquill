import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1
    },
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+H'
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:8008/fetchUrl",
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
};