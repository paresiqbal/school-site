"use client";

import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Heading2 } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-background">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-44 w-4" />
      </Toggle>
    </div>
  );
}
