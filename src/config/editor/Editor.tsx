import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

interface EditorProps {
  data: any;
  onChange: (data: any) => void;
  editorBlock: string;
}

const Editor = ({ data, onChange, editorBlock }: EditorProps) => {
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        tools: EDITOR_JS_TOOLS,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorBlock} />;
};

export default memo(Editor);
