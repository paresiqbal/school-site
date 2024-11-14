import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading";

interface TiptapProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tiptap({ setContent }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levels: [2],
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "rounded-md min-h[150px] border-input bg-background",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  // Return early if the editor hasn't initialized yet
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
