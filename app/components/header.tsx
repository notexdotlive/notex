export default function Header() {
  return (
    <header className="flex flex-1 items-center justify-between min-w-screen h-20 mx-auto bg-zinc-100 border-b border-zinc-200 z-20">
      <div
        className="flex flex-1 items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto p-4"
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

        <div className="flex items-center justify-end gap-2">
          <a
            href="/"
            className="flex flex-1 items-center justify-center gap-4 px-6 py-3 text-sm text-pretty text-zinc-950 bg-zinc-100 border border-zinc-200 rounded-md whitespace-nowrap"
          >
            <span
              className="flex items-center justify-center"
              id="sign-in-button"
            >
              <span className="font-semibold">Login</span>
            </span>
          </a>

          <a
            href="/"
            className="flex flex-1 items-center justify-center gap-4 px-6 py-3 text-sm text-pretty text-zinc-50 bg-zinc-900 rounded-md"
          >
            <span
              className="flex items-center justify-center whitespace-nowrap"
              id="sign-up-button"
            >
              <span className="font-semibold">Sign Up</span>
              <span className="mx-1.5">—</span>
              <span className="italic font-normal">it's free</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
