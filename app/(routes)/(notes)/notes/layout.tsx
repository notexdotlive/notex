'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from '@/infra/next/client';

import { useNote } from '@/contexts/note-context';

import { Icon } from '@/components/icon';

export default function NotesLayout({ children }: { children: ReactNode }) {
  const { note, loadingNote } = useNote();
  const [search, setSearch] = useState('' as string);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const notesRoute = pathname === '/notes';
  const newNoteRoute = pathname === '/notes/new';

  const params = new URLSearchParams(searchParams);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleSearch = (search: string) => {
    if (!search) return;

    if (search && search !== '') {
      params.set('q', search);
    } else {
      params.delete('q');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearch('');

    params.delete('q');
    router.replace(`${pathname}`);
  };

  useEffect(() => {
    const term = params.get('q') || '';
    setSearch(term);
  }, [searchParams]);

  return (
    <>
      <header
        className={`flex items-center justify-between min-w-screen w-full h-16 mx-auto bg-zinc-100 border-b border-zinc-200 z-20 ${
          notesRoute ? '' : 'mb-12 sm:mb-0'
        }`}
      >
        <div
          className="flex flex-1 items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto px-4 py-2"
          id="header-content"
        >
          <div className="flex items-center justify-start gap-4">
            <a href="/" className="flex items-center justify-start gap-2">
              <img
                src="/logos/logo-notex.svg"
                alt="NoteX Logo"
                className="w-auto min-h-8 h-8 object-contain sm:ml-1"
              />
            </a>
          </div>

          {notesRoute ? (
            <form
              onSubmit={handleSubmit}
              className="hidden sm:flex items-center justify-center gap-4 w-full max-w-sm md:max-w-md"
            >
              <label
                htmlFor="search"
                className="group flex items-center w-full h-auto min-h-10 pl-4 pr-0 bg-zinc-100 border border-zinc-200 rounded-lg focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-500 divide-x divide-zinc-200 overflow-hidden aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:select-none aria-[disabled=true]:opacity-50"
                aria-disabled="false"
              >
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-full h-full bg-transparent focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search !== '' && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-2 h-auto min-h-10 !border-0 focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                )}

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
                {newNoteRoute ? (
                  'New Note'
                ) : (loadingNote && !note) || (note && !note.title) ? (
                  <span className="flex items-center justify-center w-4 h-4 text-zinc-950 pointer-events-none select-none">
                    <Icon name="Loader" className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  note && note.title && note.title
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
