import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { useState, useRef } from "react";
import clsx from "clsx";
import { TextAreaProps } from "./types";
import Label from "./Label";
import useOutsideClick from "../../utils/hooks/useOutsideClick";

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  value = "",
  placeholder = "Write here...",
  className,
  inputClassName,
  labelclassName,
  disabled = false,
  required = false,
  onChange,
  minHeight = 200,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }:{editor: any}) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={clsx(
        "p-2 rounded hover:bg-gray-100 transition-colors duration-150",
        {
          "bg-gray-200 text-gray-800": isActive,
          "text-gray-600 hover:text-gray-800": !isActive && !disabled,
          "text-gray-300 cursor-not-allowed": disabled,
        }
      )}
    >
      {children}
    </button>
  );

  // Get current heading level for dropdown display
  const getCurrentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraph";
  };

  // Handle heading selection
  const handleHeadingSelect = (level: number | null) => {
    if (level === null) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 })
        .run();
    }
    setShowHeadingDropdown(false);
  };

  // Handle outside click for dropdown
  useOutsideClick(dropdownRef as React.RefObject<HTMLDivElement>, () =>
    setShowHeadingDropdown(false)
  );

  if (!editor) {
    return null;
  }

  return (
    <div className={clsx("space-y-3", disabled && "opacity-60", className)}>
      {label && (
        <Label id={id} required={required} labelclassName={labelclassName}>
          {label}
        </Label>
      )}

      <div className="relative">
        {/* Editor Content */}
        <div
          className={clsx(
            "border border-[#999999] rounded-t-lg transition-colors duration-300 ease-in-out",
            {
              "border-brand-500 ring-1 ring-brand-500": isFocused,
              "hover:border-[#00000099]": !disabled && !isFocused,
            }
          )}
          style={{ minHeight: `${minHeight}px` }}
        >
          <EditorContent
            editor={editor}
            className={clsx("p-4 text-xs md:text-sm font-normal", {
              "cursor-not-allowed": disabled,
            })}
            placeholder={placeholder}
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-gray-50 border border-[#999999] border-t-0 rounded-b-lg flex-wrap">
          {/* Paragraph/Heading Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {getCurrentHeading()}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showHeadingDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  type="button"
                  onClick={() => handleHeadingSelect(null)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <span>Paragraph</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeadingSelect(1)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Heading1 className="w-4 h-4" />
                  <span>Heading 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeadingSelect(2)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Heading2 className="w-4 h-4" />
                  <span>Heading 2</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeadingSelect(3)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Heading3 className="w-4 h-4" />
                  <span>Heading 3</span>
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Blockquote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* History */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
