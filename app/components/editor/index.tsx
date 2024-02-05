'use client';

import { useEffect, useState } from 'react';

import {
  Editor as TiptapEditor,
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';

import { twMerge } from 'tailwind-merge';

import BubbleButton from './button';
import { Icon } from '@/components/icon';

import './styles.scss';

interface EditorProps {
  content?: string;
  setContent?: (content: string) => void;
  editable?: boolean;
  className?: string;
}

export default function Editor({
  content = '',
  setContent,
  editable = true,
  className,
}: EditorProps) {
  const [couldEdit, setCouldEdit] = useState(false);

  const config = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CharacterCount.configure({
        mode: 'textSize',
      }),
    ],
    content,
    editable,
    autofocus: true,
    onUpdate: ({ editor }) => {
      if (setContent) setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (!config || !content) return;

    if (couldEdit) return;

    config.commands.setContent({
      type: 'doc',
      content: JSON.parse(content).content,
    });

    setCouldEdit(true);
  }, [config, content, couldEdit]);

  return (
    <>
      {/* Footer */}
      {config && (
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-zinc-200 rounded-md">
          <section className="flex items-center justify-start gap-2" />

          <section className="flex items-center justify-start gap-2">
            <span className="text-xs font-normal text-zinc-600">
              {config.storage.characterCount.characters()} characters
            </span>

            <span className="text-xs font-normal text-zinc-600 ml-4">
              {config.storage.characterCount.words()} words
            </span>
          </section>
        </div>
      )}

      {/* Floating menu */}
      {config && (
        <FloatingMenu
          editor={config}
          tippyOptions={{ duration: 100, placement: 'right-start' }}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLine = $from.nodeBefore?.textContent;

            return currentLine === '/';
          }}
          className="w-fit flex flex-col items-start justify-start bg-zinc-200 rounded-md overflow-hidden transition-all duration-300"
        >
          <span className="text-xs font-normal text-zinc-600 px-4 py-2 border-b border-zinc-300">
            Choose a element to insert
          </span>

          <section className="w-full flex flex-col items-start justify-start p-2 bg-zinc-200 rounded-md overflow-hidden transition-all duration-300">
            <button
              onClick={() => config.chain().focus().setParagraph().run()}
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="CaseSensitive" className="size-full" />
              </div>

              <span className="text-sm font-normal">Text</span>
            </button>

            <button
              onClick={() => config.chain().focus().toggleCode().run()}
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="Code" className="size-full" />
              </div>

              <span className="text-sm font-normal">Code</span>
            </button>

            <button
              onClick={() => config.chain().focus().toggleBlockquote().run()}
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="Quote" className="size-full" />
              </div>

              <span className="text-sm font-normal">Quote</span>
            </button>

            <button
              onClick={() => config.chain().focus().toggleBulletList().run()}
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="List" className="size-full" />
              </div>

              <span className="text-sm font-normal">List</span>
            </button>

            <button
              onClick={() => config.chain().focus().toggleOrderedList().run()}
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="ListOrdered" className="size-full" />
              </div>

              <span className="text-sm font-normal">Ordered List</span>
            </button>

            <button
              onClick={() =>
                config.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="Heading1" className="size-full" />
              </div>

              <span className="text-sm font-normal">Heading 1</span>
            </button>

            <button
              onClick={() =>
                config.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="Heading2" className="size-full" />
              </div>

              <span className="text-sm font-normal">Heading 2</span>
            </button>

            <button
              onClick={() =>
                config.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="w-full flex items-center justify-start gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-md transition-all duration-300"
            >
              <div className="flex items-center justify-center size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                <Icon name="Heading3" className="size-full" />
              </div>

              <span className="text-sm font-normal">Heading 3</span>
            </button>
          </section>
        </FloatingMenu>
      )}

      {/* Bubble menu */}
      {config && (
        <BubbleMenu
          editor={config}
          className="w-fit flex items-center justify-center bg-zinc-200 rounded-md divide-x divide-zinc-300 overflow-hidden transition-all duration-300"
          tippyOptions={{
            delay: [1000, 0],
            animation: 'scale',
          }}
        >
          <BubbleButton
            onClick={() => config.chain().focus().toggleBold().run()}
            active={config.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Icon name="Bold" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleItalic().run()}
            active={config.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Icon name="Italic" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleStrike().run()}
            active={config.isActive('strike')}
            title="Strikethrough (Ctrl+Shift+S)"
          >
            <Icon name="Strikethrough" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleCode().run()}
            active={config.isActive('code')}
            title="Code (Ctrl+E)"
          >
            <Icon name="Code" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleBulletList().run()}
            active={config.isActive('bulletList')}
            title="Bullet List (Ctrl+Shift+8)"
          >
            <Icon name="List" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleOrderedList().run()}
            active={config.isActive('orderedList')}
            title="Ordered List (Ctrl+Shift+7)"
          >
            <Icon name="ListOrdered" />
          </BubbleButton>

          <BubbleButton
            onClick={() => config.chain().focus().toggleBlockquote().run()}
            active={config.isActive('blockquote')}
            title="Blockquote (Ctrl+Shift+9)"
          >
            <Icon name="Quote" />
          </BubbleButton>

          <div className="flex items-center justify-center">
            {Array.from({ length: 3 }).map((_, index) => {
              const level = (index + 1) as 1 | 2 | 3;

              return (
                <BubbleButton
                  key={index}
                  title={`Heading ${level} (Ctrl+Alt+${level})`}
                  onClick={() =>
                    config
                      .chain()
                      .focus()
                      .toggleHeading({
                        level,
                      })
                      .run()
                  }
                  active={config.isActive('heading', { level: index + 1 })}
                >
                  <Icon name={`Heading${level}`} />
                </BubbleButton>
              );
            })}
          </div>

          {(config.isActive('heading', { level: 1 }) ||
            config.isActive('heading', { level: 2 }) ||
            config.isActive('heading', { level: 3 })) && (
            <BubbleButton
              onClick={() => config.chain().focus().setParagraph().run()}
              title="Paragraph (Ctrl+Alt+0)"
              active={config.isActive('paragraph')}
            >
              <Icon name="CaseSensitive" />
            </BubbleButton>
          )}
        </BubbleMenu>
      )}

      <EditorContent
        editor={config}
        className={twMerge('w-full h-auto !outline-none', className)}
        onClick={() => config?.commands.focus()}
      />
    </>
  );
}
