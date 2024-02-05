'use client';

import { usePathname, useRouter } from '@/infra/next/client';
import { ReactNode, useEffect, useState } from 'react';

import { Icon } from '@/components/icon';

export default function NotesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(false);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('' as string | null);

  const [id, setId] = useState('' as string | null);

  const handleLoadNote = async (id: string) => {
    if (!id || id === 'new') return;

    try {
      setLoading(true);

      const res = await fetch(`/api/notes/${id}`);
      if (+!res.status !== 200) return router.push('/notes');

      const data = await res.json();
      if (!data) return router.push('/notes');

      const { content, title } = data;

      setContent(content);
      setTitle(title);
    } catch (error) {
      return router.push('/notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = pathname.split('/').pop();
    if (!id) return;
    setId(id);
    handleLoadNote(id);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between min-w-screen h-16 mx-auto bg-zinc-100 border-b border-zinc-200 z-20 mb-12 sm:mb-0">
        <div
          className="flex flex-1 items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto px-4 py-2"
          id="header-content"
        >
          <div className="flex items-center justify-start gap-4">
            <a href="/" className="flex items-center justify-start gap-2">
              <img
                src="/logos/logo-notex.svg"
                alt="NoteX Logo"
                className="w-auto h-8 object-contain sm:ml-1"
              />
            </a>
          </div>

          {pathname === '/notes' ? (
            <form className="hidden sm:flex items-center justify-center gap-4 w-full max-w-md">
              <label
                htmlFor="search"
                className="group flex items-center w-full h-auto min-h-10 pl-4 pr-0 gap-2 bg-zinc-100 border border-zinc-200 rounded-lg focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-500 divide-x divide-zinc-200 overflow-hidden aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:select-none aria-[disabled=true]:opacity-50"
                aria-disabled="true"
              >
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-full h-full bg-transparent focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
                />

                <button
                  type="submit"
                  className="px-4 py-2 h-auto min-h-10 !bg-zinc-100 hover:!bg-zinc-200 border-0 text-zinc-900 focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
                >
                  <Icon name="Search" className="w-4 h-4" />
                </button>
              </label>
            </form>
          ) : (
            <div
              className="max-sm:absolute max-sm:left-0 max-sm:top-16 max-sm:mt-2 sm:relative flex items-center justify-center w-full sm:w-auto h-auto px-2 py-1 text-zinc-600"
              aria-disabled="true"
            >
              <a
                href="/notes"
                className="flex items-center justify-center px-2 py-1 hover:bg-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 select-none cursor-pointer"
              >
                Notes
              </a>
              <p
                className="flex items-center justify-center w-4 h-4 text-zinc-300 pointer-events-none select-none"
                aria-hidden="true"
              >
                /
              </p>
              <span className="flex items-center justify-center px-2 py-1 w-auto h-8 hover:bg-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 select-none cursor-pointer">
                {(loading && !title && !content) || !id ? (
                  <span className="flex items-center justify-center w-4 h-4 text-zinc-950 pointer-events-none select-none">
                    <Icon name="Loader" className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  title || 'New Note'
                )}
              </span>
            </div>
          )}

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="group w-8 h-8 p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
              disabled
            >
              <div className="w-full h-full disabled:pointer-events-none">
                <Icon name="Plus" className="w-4 h-4" />
              </div>
            </button>

            <button
              type="button"
              className="group flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
              disabled
            >
              <div className="w-full h-full disabled:pointer-events-none">
                <img
                  src="https://github.com/gelzinn.png"
                  alt="User Avatar"
                  className="aspect-square group-hover:opacity-80 group-disabled:opacity-100"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
