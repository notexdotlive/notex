'use client';

import { Fragment, ReactNode, useEffect, useState } from 'react';

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react';

import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';

import { Editor as CoreEditor } from '@tiptap/react';

import { twMerge } from 'tailwind-merge';

import { Icon, IconName } from '@/components/icon';

import { isJson } from '@/utils/isJson';

import './styles.scss';

type Editor = CoreEditor | null;

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
  const [floatingMenuOpen, setFloatingMenuOpen] = useState<boolean>(false);
  const [floatingMenuActions, setFloatingMenuActions] = useState<any>({});

  const config = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
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

  const handleFocus = () => {
    if (!config) return;
    config.commands.focus();
  };

  const handleAddElement = (type: string) => {
    if (!config) return;

    const actions = floatingMenuActions;

    if (!actions) return;

    /**
     * Add selected element to the editor
     *
     * @param {string} type - The type of element to add
     */

    const action = actions[type];

    if (action) action();

    /**
     * Remove the "/" that was left behind
     * the cursor after selecting an element
     */

    const { $from } = config.state.selection;
    const { pos } = $from;

    const tr = config.state.tr.delete(pos - 1, pos);

    config.view.dispatch(tr);
  };

  useEffect(() => {
    if (!config) return;

    const { commands } = config;

    isJson(content)
      ? commands.setContent({
          type: 'doc',
          content: JSON.parse(content).content,
        })
      : commands.setContent(content);
  }, [config, content]);

  useEffect(() => {
    if (!config) return;

    config.commands.focus();

    const actions: {
      [key: string]: () => void;
    } = {
      text: () => config.chain().focus().setParagraph().run(),
      code: () => config.chain().focus().toggleCode().run(),
      codeblock: () => config.chain().focus().toggleCodeBlock().run(),
      blockquote: () => config.chain().focus().toggleBlockquote().run(),
      bulletlist: () => config.chain().focus().toggleBulletList().run(),
      orderedlist: () => config.chain().focus().toggleOrderedList().run(),
      heading1: () => config.chain().focus().toggleHeading({ level: 1 }).run(),
      heading2: () => config.chain().focus().toggleHeading({ level: 2 }).run(),
      heading3: () => config.chain().focus().toggleHeading({ level: 3 }).run(),
      heading4: () => config.chain().focus().toggleHeading({ level: 4 }).run(),
      heading5: () => config.chain().focus().toggleHeading({ level: 5 }).run(),
      heading6: () => config.chain().focus().toggleHeading({ level: 6 }).run(),
    };

    setFloatingMenuActions(actions);
  }, [config]);

  return (
    <>
      {config && (
        <>
          {EditorBubbleMenu(config)}

          {EditorFloatingMenu(
            config,
            floatingMenuActions,
            handleAddElement,
            setFloatingMenuOpen,
            floatingMenuOpen,
          )}

          {EditorFooter(config)}
        </>
      )}

      <EditorContent
        editor={config}
        className={twMerge(
          'w-full h-auto !outline-none pb-10 flex-1 max-sm:mt-4 max-sm:pt-4',
          className,
        )}
        onClick={handleFocus}
      />
    </>
  );
}

const EditorFooter = (config: Editor | null) => {
  if (!config) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-zinc-200 z-10">
      <section className="flex items-center justify-start gap-2" />

      <section className="flex items-center justify-start gap-4">
        <span className="text-xs font-normal text-zinc-600">
          {config.storage.characterCount.characters()}{' '}
          {config.storage.characterCount.characters() === 1
            ? 'character'
            : 'characters'}
        </span>

        <span className="text-xs font-normal text-zinc-600">
          {config.storage.characterCount.words()}{' '}
          {config.storage.characterCount.words() === 1 ? 'word' : 'words'}
        </span>
      </section>
    </div>
  );
};

const EditorBubbleMenu = (config: Editor | null) => {
  if (!config) return null;

  const Button = ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: any;
  }) => (
    <button
      {...props}
      className="flex items-center justify-center gap-2 p-3 rounded-md hover:bg-zinc-200 data-[active=true]:bg-rose-400 data-[active=true]:text-zinc-50 transition-all duration-300"
    >
      {children}
    </button>
  );

  const options = [
    {
      name: 'bold',
      title: 'Bold (Ctrl+B)',
      icon: 'Bold',
      action: () => config.chain().focus().toggleBold().run(),
    },
    {
      name: 'italic',
      title: 'Italic (Ctrl+I)',
      icon: 'Italic',
      action: () => config.chain().focus().toggleItalic().run(),
    },
    {
      name: 'strike',
      title: 'Strikethrough (Ctrl+Shift+S)',
      icon: 'Strikethrough',
      action: () => config.chain().focus().toggleStrike().run(),
    },
  ];

  const elements = [
    {
      name: 'code',
      title: 'Code (Ctrl+E)',
      icon: 'Code',
      action: () => config.chain().focus().toggleCode().run(),
    },
    {
      name: 'bulletList',
      title: 'Bullet List (Ctrl+Shift+8)',
      icon: 'List',
      action: () => config.chain().focus().toggleBulletList().run(),
    },
    {
      name: 'orderedList',
      title: 'Ordered List (Ctrl+Shift+7)',
      icon: 'ListOrdered',
      action: () => config.chain().focus().toggleOrderedList().run(),
    },
    {
      name: 'blockquote',
      title: 'Blockquote (Ctrl+Shift+9)',
      icon: 'Quote',
      action: () => config.chain().focus().toggleBlockquote().run(),
    },
    {
      name: 'heading1',
      title: 'Heading 1 (Ctrl+Alt+1)',
      icon: 'Heading1',
      action: () => config.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: 'heading2',
      title: 'Heading 2 (Ctrl+Alt+2)',
      icon: 'Heading2',
      action: () => config.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: 'heading3',
      title: 'Heading 3 (Ctrl+Alt+3)',
      icon: 'Heading3',
      action: () => config.chain().focus().toggleHeading({ level: 3 }).run(),
    },
  ];

  return (
    <BubbleMenu
      editor={config}
      className="w-fit flex items-center justify-center gap-1 bg-zinc-100 border border-zinc-200 rounded-md overflow-hidden transition-all duration-300 p-1"
      tippyOptions={{
        delay: [1000, 0],
        animation: 'scale',
      }}
    >
      {options.map((option, index) => {
        const { name, title, icon, action } = option;
        const isActive = config.isActive(name);

        return (
          <Button
            key={index}
            onClick={action}
            data-active={isActive}
            title={title}
          >
            <Icon name={icon as any} />
          </Button>
        );
      })}

      {elements.map((element, index) => {
        const { name, title, icon, action } = element;
        const isActive = config.isActive(name);

        return (
          <Button
            key={index}
            onClick={action}
            data-active={isActive}
            title={title}
          >
            <Icon name={icon as any} />
          </Button>
        );
      })}
    </BubbleMenu>
  );
};

const EditorFloatingMenu = (
  config: Editor | null,
  actions = null,
  handleAddElement: (type: string) => void,
  toggleFloatingMenu: (open: boolean) => void,
  floatingMenu: boolean,
) => {
  interface Element {
    type: string;
    icon: IconName;
    title: string;
  }

  interface Elements {
    title: string;
    itens: Element[];
  }

  if (!config || !actions) return null;

  const elements: Elements[] = [
    {
      title: 'Basic Blocks',
      itens: [
        {
          type: 'text',
          icon: 'CaseSensitive',
          title: 'Text',
        },
        {
          type: 'blockquote',
          icon: 'Quote',
          title: 'Quote',
        },
        {
          type: 'code',
          icon: 'Code',
          title: 'Single Line Code',
        },
        {
          type: 'codeblock',
          icon: 'CodeSquare',
          title: 'Code Block',
        },
        {
          type: 'bulletlist',
          icon: 'List',
          title: 'List',
        },
        {
          type: 'orderedlist',
          icon: 'ListOrdered',
          title: 'Ordered List',
        },
        {
          type: 'heading1',
          icon: 'Heading1',
          title: 'Heading 1',
        },
        {
          type: 'heading2',
          icon: 'Heading2',
          title: 'Heading 2',
        },
        {
          type: 'heading3',
          icon: 'Heading3',
          title: 'Heading 3',
        },
        {
          type: 'heading4',
          icon: 'Heading4',
          title: 'Heading 4',
        },
        {
          type: 'heading5',
          icon: 'Heading5',
          title: 'Heading 5',
        },
        {
          type: 'heading6',
          icon: 'Heading6',
          title: 'Heading 6',
        },
      ],
    },
    {
      title: 'Advanced Blocks',
      itens: [
        {
          type: 'table',
          icon: 'Table',
          title: 'Table',
        },
        {
          type: 'image',
          icon: 'Image',
          title: 'Image',
        },
        {
          type: 'video',
          icon: 'Video',
          title: 'Video',
        },
        {
          type: 'link',
          icon: 'Link',
          title: 'Link',
        },
      ],
    },
    {
      title: 'AI Blocks',
      itens: [
        {
          type: 'chat',
          icon: 'MessageCircle',
          title: 'Chat',
        },
        {
          type: 'calendar',
          icon: 'Calendar',
          title: 'Calendar',
        },
        {
          type: 'todo',
          icon: 'ListTodo',
          title: 'Todo List',
        },
        {
          type: 'kanban',
          icon: 'Kanban',
          title: 'Kanban',
        },
      ],
    },
  ];

  return (
    <FloatingMenu
      editor={config}
      tippyOptions={{ duration: 100, placement: 'right-start' }}
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const currentLine =
          ($from.nodeBefore && $from.nodeBefore.textContent) || '';

        if (currentLine === '/') {
          toggleFloatingMenu(true);
          return true;
        } else {
          toggleFloatingMenu(false);
          return false;
        }
      }}
      className={twMerge(
        'flex flex-col items-start justify-start sm:min-w-64 w-full max-w-md h-auto max-h-[40vh] bg-zinc-100 border border-zinc-200 rounded-md overflow-auto',
        floatingMenu
          ? 'opacity-100 transition-all duration-300'
          : 'opacity-0 pointer-events-none',
      )}
    >
      {elements.map((element, index) => {
        const { title, itens } = element;

        return (
          <Fragment key={index}>
            <span className="w-full flex items-center justify-start p-4 pb-1 border-t border-zinc-200 first-of-type:border-t-0 text-sm font-bold text-zinc-600">
              {title}
            </span>

            <ol className="w-full flex flex-col items-start justify-start p-2">
              {itens.map((item, i) => {
                const { type, icon, title } = item;

                const isActive = config.isActive(type);
                const isDisabled = !actions || !actions[type];

                return (
                  <button
                    key={i}
                    onClick={() => handleAddElement(type)}
                    disabled={isDisabled}
                    className="w-full flex items-center justify-start gap-2 p-2 data-[disabled=false]:hover:bg-zinc-200 rounded-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-zinc-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
                    data-active={isActive}
                    data-disabled={isDisabled}
                  >
                    <div className="flex items-center justify-center min-w-6 min-h-6 size-6 p-1 bg-zinc-100 border border-zinc-300 rounded-md">
                      <Icon name={icon as any} className="size-full" />
                    </div>

                    <span className="text-sm font-normal">{title}</span>
                  </button>
                );
              })}
            </ol>
          </Fragment>
        );
      })}
    </FloatingMenu>
  );
};
