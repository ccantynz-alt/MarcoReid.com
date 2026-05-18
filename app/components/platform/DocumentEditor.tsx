"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useCallback, useEffect, useRef, useState } from "react";

interface DocumentEditorProps {
  initialContent?: string;
  onUpdate?: (html: string) => void;
}

export default function DocumentEditor({
  initialContent,
  onUpdate,
}: DocumentEditorProps) {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved",
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start typing or use voice dictation...",
      }),
      Highlight,
      Typography,
    ],
    content: initialContent ?? "",
    editorProps: {
      attributes: {
        class: "ProseMirror",
      },
    },
    onUpdate: ({ editor: ed }) => {
      setSaveStatus("unsaved");

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSaveStatus("saving");
        const html = ed.getHTML();
        onUpdate?.(html);
        // Simulate save delay
        setTimeout(() => setSaveStatus("saved"), 400);
      }, 800);
    },
  });

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const ToolbarButton = useCallback(
    ({
      onClick,
      isActive,
      children,
      title,
    }: {
      onClick: () => void;
      isActive: boolean;
      children: React.ReactNode;
      title: string;
    }) => (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
          isActive
            ? "bg-navy-500 text-white"
            : "text-navy-600 hover:bg-navy-100"
        }`}
      >
        {children}
      </button>
    ),
    [],
  );

  if (!editor) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white">
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-sm text-navy-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
      {/* Toolbar */}
      <div className="sticky top-16 z-20 flex items-center justify-between rounded-t-2xl border-b border-navy-100 bg-white px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Bold */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <span className="font-bold">B</span>
          </ToolbarButton>

          {/* Italic */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <span className="italic">I</span>
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-navy-100" />

          {/* Heading 1 */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <span className="text-xs font-bold">H1</span>
          </ToolbarButton>

          {/* Heading 2 */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <span className="text-xs font-bold">H2</span>
          </ToolbarButton>

          {/* Heading 3 */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <span className="text-xs font-bold">H3</span>
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-navy-100" />

          {/* Bullet List */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet list"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="4"
                cy="18"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </ToolbarButton>

          {/* Ordered List */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Ordered list"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="10" y1="6" x2="20" y2="6" />
              <line x1="10" y1="12" x2="20" y2="12" />
              <line x1="10" y1="18" x2="20" y2="18" />
              <text
                x="4"
                y="8"
                fontSize="7"
                fill="currentColor"
                stroke="none"
                fontFamily="sans-serif"
              >
                1
              </text>
              <text
                x="4"
                y="14"
                fontSize="7"
                fill="currentColor"
                stroke="none"
                fontFamily="sans-serif"
              >
                2
              </text>
              <text
                x="4"
                y="20"
                fontSize="7"
                fill="currentColor"
                stroke="none"
                fontFamily="sans-serif"
              >
                3
              </text>
            </svg>
          </ToolbarButton>

          {/* Blockquote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
              <path d="M3 6v12" strokeWidth="3" />
            </svg>
          </ToolbarButton>

          {/* Horizontal Rule */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            isActive={false}
            title="Horizontal rule"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-navy-100" />

          {/* Undo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            title="Undo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7v6h6" />
              <path d="M3 13a9 9 0 0 1 15.36-6.36" />
            </svg>
          </ToolbarButton>

          {/* Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            title="Redo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 7v6h-6" />
              <path d="M21 13a9 9 0 0 0-15.36-6.36" />
            </svg>
          </ToolbarButton>
        </div>

        {/* Save status indicator */}
        <div className="flex items-center gap-2 text-xs">
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1 text-forest-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved
            </span>
          )}
          {saveStatus === "saving" && (
            <span className="text-navy-400">Saving...</span>
          )}
          {saveStatus === "unsaved" && (
            <span className="text-navy-300">Editing</span>
          )}
        </div>
      </div>

      {/* Editor content area */}
      <EditorContent editor={editor} className="min-h-[500px]" />
    </div>
  );
}
