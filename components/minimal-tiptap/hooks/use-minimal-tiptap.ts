// minimal-tiptap.js

import * as React from "react";
import { useEditor } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import type { Content, UseEditorOptions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Link,
  Image,
  HorizontalRule,
  CodeBlockLowlight,
  Selection,
  Color,
  UnsetAllMarks,
  ResetMarksOnEnter,
  FileHandler,
} from "../extensions"; // Adjust the import path as needed
import { cn } from "@/lib/utils"; // Adjust the import path as needed
import { getOutput } from "../utils"; // Adjust the import path as needed
import { useThrottle } from "../hooks/use-throttle"; // Adjust the import path as needed
import { toast } from "sonner"; // Adjust the import path or use your toast library
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
  value?: Content;
  output?: "html" | "json" | "text";
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  onUpdate?: (content: Content) => void;
  onBlur?: (content: Content) => void;
}

const createExtensions = (placeholder: string, token: string | null) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    paragraph: { HTMLAttributes: { class: "text-node" } },
    heading: { HTMLAttributes: { class: "heading-node" } },
    blockquote: { HTMLAttributes: { class: "block-node" } },
    bulletList: { HTMLAttributes: { class: "list-node" } },
    orderedList: { HTMLAttributes: { class: "list-node" } },
    code: { HTMLAttributes: { class: "inline", spellcheck: "false" } },
    dropcursor: { width: 2, class: "ProseMirror-dropcursor border" },
  }),
  Link,
  Underline,
  Image.configure({
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: false, // Disable base64 encoding
    uploadFn: async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_IMAGE_UPLOAD}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Image upload failed");
        }

        const data = await response.json();
        return data.url; // Return the URL of the uploaded image
      } catch (error) {
        console.error("Upload error:", error);
        throw error; // This will trigger onActionError
      }
    },
    onImageRemoved({ id, src }) {
      console.log("Image removed", { id, src });
      // Optionally, send a request to your server to delete the image
    },
    onValidationError(errors) {
      errors.forEach((error) => {
        toast.error("Image validation error", {
          position: "bottom-right",
          description: error.reason,
        });
      });
    },
    onActionSuccess({ action }) {
      const mapping = {
        copyImage: "Copy Image",
        copyLink: "Copy Link",
        download: "Download",
      };
      toast.success(mapping[action], {
        position: "bottom-right",
        description: "Image action success",
      });
    },
    onActionError(error, { action }) {
      const mapping = {
        copyImage: "Copy Image",
        copyLink: "Copy Link",
        download: "Download",
      };
      toast.error(`Failed to ${mapping[action]}`, {
        position: "bottom-right",
        description: error.message,
      });
    },
  }),
  FileHandler.configure({
    allowBase64: false, // Disable base64 encoding
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    onDrop: (editor, files, pos) => {
      files.forEach(async (file) => {
        try {
          const src = await editor.storage.uploadFn(file);
          editor.commands.insertContentAt(pos, {
            type: "image",
            attrs: { src },
          });
        } catch (error) {
          console.error("Drop upload error:", error);
          // Handle error, e.g., show a toast notification
        }
      });
    },
    onPaste: (editor, files) => {
      files.forEach(async (file) => {
        try {
          const src = await editor.storage.uploadFn(file);
          editor.commands.insertContent({
            type: "image",
            attrs: { src },
          });
        } catch (error) {
          console.error("Paste upload error:", error);
          // Handle error, e.g., show a toast notification
        }
      });
    },
    onValidationError: (errors) => {
      errors.forEach((error) => {
        toast.error("Image validation error", {
          position: "bottom-right",
          description: error.reason,
        });
      });
    },
  }),
  Color,
  TextStyle,
  Selection,
  Typography,
  UnsetAllMarks,
  HorizontalRule,
  ResetMarksOnEnter,
  CodeBlockLowlight,
  Placeholder.configure({ placeholder: () => placeholder }),
];

export const useMinimalTiptapEditor = ({
  value,
  output = "html",
  placeholder = "",
  editorClassName,
  throttleDelay = 0,
  onUpdate,
  onBlur,
  ...props
}: UseMinimalTiptapEditorProps) => {
  const { token } = useContext(AppContext); // Access the token from context

  const throttledSetValue = useThrottle(
    (value: Content) => onUpdate?.(value),
    throttleDelay,
  );

  const handleUpdate = React.useCallback(
    (editor: Editor) => throttledSetValue(getOutput(editor, output)),
    [output, throttledSetValue],
  );

  const handleCreate = React.useCallback(
    (editor: Editor) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value);
      }
    },
    [value],
  );

  const handleBlur = React.useCallback(
    (editor: Editor) => onBlur?.(getOutput(editor, output)),
    [output, onBlur],
  );

  const editor = useEditor({
    extensions: createExtensions(placeholder, token),
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: cn("focus:outline-none", editorClassName),
      },
    },
    onUpdate: ({ editor }) => handleUpdate(editor),
    onCreate: ({ editor }) => handleCreate(editor),
    onBlur: ({ editor }) => handleBlur(editor),
    ...props,
  });

  return editor;
};

export default useMinimalTiptapEditor;
