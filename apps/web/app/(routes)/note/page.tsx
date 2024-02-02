import { Editor } from 'novel';
import { archivo } from '@/config/fonts';

import { Icon } from '@/components/icon';

export default function Note() {
  return (
    <>
      <header className="flex items-center justify-between gap-4 w-full max-w-screen-hd h-16 mx-auto px-4">
        <a
          href="/"
          className="w-auto h-full object-contain"
          aria-label="NoteX Home"
        >
          <img
            src="/logos/logo-notex.svg"
            alt="NoteX Logo"
            className="w-auto h-full aspect-video object-contain"
          />
        </a>

        <form className="hidden sm:flex items-center justify-center gap-4 w-full">
          <label
            htmlFor="search"
            className="group flex items-center w-full max-w-md h-auto min-h-10 pl-4 pr-0 gap-2 bg-zinc-100 border border-zinc-200 rounded-lg focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-500 divide-x divide-zinc-200 overflow-hidden aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:select-none aria-[disabled=true]:opacity-50"
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

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="group w-8 h-8 p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
            disabled
          >
            <div className="w-full h-full disabled:pointer-events-none">
              <Icon name="Moon" className="w-4 h-4" />
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
      </header>

      <section
        className={`flex items-start justify-start w-full max-w-7xl h-auto mx-auto p-4 sm:py-8 md:pt-8 md:py-16 ${archivo.variable}`}
      >
        <Editor
          storageKey="@notex/note"
          className="w-full h-full !p-0"
          defaultValue=""
        />
      </section>
    </>
  );
}
