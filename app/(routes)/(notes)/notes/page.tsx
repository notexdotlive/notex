import { archivo } from '@/config/fonts';

export default function Notes() {
  return (
    <div
      className={`flex flex-col flex-1 items-start justify-start w-full max-w-7xl h-auto mx-auto p-4 md:pt-8 md:py-16 ${archivo.variable}`}
    >
      <section className="flex flex-1 w-full h-auto mt-4 mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full mx-auto">
          <div className="flex flex-col items-center justify-center gap-2 w-full h-auto text-center text-zinc-900">
            <strong
              className="text-2xl font-bold text-zinc-900"
              aria-label="No notes"
            >
              Your notes will appear here
            </strong>

            <p
              className="text-base text-zinc-900"
              aria-label="Create a note to get started"
            >
              Create a note to get started and organize your thoughts
            </p>
          </div>

          <a
            href="/notes/new"
            className="group w-auto h-auto px-4 py-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2 w-full h-full disabled:pointer-events-none">
              <span>Create a note</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
