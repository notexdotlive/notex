import { navigation } from '@/config';

export default function Footer() {
  const { footer } = navigation;

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative flex flex-col items-center justify-center gap-4 w-full h-auto mx-auto p-4 md:mt-0 mt-32"
      id="footer"
    >
      <div
        className="relative flex flex-col items-center justify-center gap-4 w-full max-w-screen-hd mx-auto sm:p-4"
        id="footer"
      >
        {/* <section
          className="relative flex flex-col items-center justify-center gap-4 w-full mx-auto px-4 py-32"
          id="footer-cta-section"
        >
          <div
            className="flex flex-col items-center justify-center gap-4 w-full"
            id="footer-cta"
          >
            <span className="flex flex-col items-center justify-center gap-2 w-full max-w-screen-md text-center">
              <h2 className="text-zinc-950 text-3xl font-semibold">
                Never throw away a thought
              </h2>

              <p className="text-zinc-600 text-base">
                NoteX is the easiest way to capture your thoughts and ideas.
              </p>
            </span>

            <button>
              <span className="flex items-center justify-center gap-2 px-6 py-3 text-pretty text-zinc-50 bg-zinc-900 rounded-md text-2xl">
                <span className="font-semibold">Sign Up</span>
                <span className="mx-1.5">—</span>
                <span className="italic">it&apos;s free</span>
              </span>
            </button>
          </div>
        </section> */}

        <section
          className="flex flex-col items-center justify-center gap-4 w-full max-w-screen-hd mx-auto bg-zinc-100 border border-zinc-200 rounded-xl"
          id="footer"
        >
          <div
            className="flex flex-col md:flex-row items-start justify-start gap-12 lg:gap-24 w-full mx-auto p-8"
            id="footer-nav"
          >
            <div className="flex flex-col items-center md:items-start justify-center md:justify-start gap-4 w-full md:max-w-48">
              <a href="/" className="flex items-start justify-start gap-2">
                <img
                  src="/logos/logo-notex.svg"
                  alt="NoteX Logo"
                  className="w-auto h-12 object-contain"
                />
              </a>

              <p className="text-zinc-600 text-balance text-base">
                Never throw away a thought
              </p>
            </div>

            <ul
              className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 w-full mx-auto"
              id="footer-nav"
            >
              {footer.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center md:items-start justify-center gap-2 w-full max-w-fit md:pr-8"
                  id="footer-nav-item"
                >
                  <strong
                    className="text-zinc-950 font-semibold uppercase text-sm mb-2"
                    id="footer-nav-item-title"
                  >
                    {item.title}
                  </strong>
                  <ul
                    className="flex flex-col items-center md:items-start justify-start gap-2"
                    id="footer-nav-item-links"
                  >
                    {item.children.map((subitem, index) => (
                      <li
                        key={index}
                        className="flex flex-col items-start justify-start text-zinc-600 gap-1"
                        id="footer-nav-item-link"
                      >
                        <a href={subitem.href} className="hover:underline">
                          {subitem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 w-full mx-auto mt-4 py-4 border-t border-zinc-200"
            id="footer-legal"
          >
            <p className="text-zinc-600 text-sm">
              © {year} NoteX. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}
