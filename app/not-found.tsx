export default function NotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl mx-auto px-4 sm:px-8 p-24"
      id="not-found"
    >
      <picture
        className="flex items-center justify-center gap-4"
        id="not-found-illustration"
      >
        <h1 className="text-6xl font-bold text-zinc-900">4</h1>

        <div
          className="relative flex items-center justify-center w-24 h-24 bg-zinc-50 rounded-full"
          id="not-found-illustration-container"
        >
          <img
            src="/assets/illustrations/sad-notex.png"
            alt="Not Found"
            className="size-full object-contain z-10 pointer-events-none"
          />
        </div>

        <h1 className="text-6xl font-bold text-zinc-900">4</h1>
      </picture>

      <div
        className="flex flex-col items-center justify-center gap-4 mt-4 text-pretty text-center"
        id="not-found-content"
      >
        <strong className="flex items-center justify-center mx-auto text-2xl">
          This page does not exist.
        </strong>

        <p className="sm:hidden flex items-center justify-center mx-auto text-zinc-600">
          You may have mistyped the address or the page may have moved. Try to
          go back to the home page.
        </p>

        <p className="hidden sm:flex items-center justify-center mx-auto text-zinc-600">
          You may have mistyped the address or the page may have moved.
        </p>
      </div>

      <a
        href="/"
        className="flex items-center justify-center gap-2 px-4 py-3 mt-4 text-zinc-50 bg-zinc-900 rounded-md"
      >
        <span>Go back to the home page</span>
      </a>
    </section>
  );
}
