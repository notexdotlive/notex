import { footer } from '@/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative flex flex-col items-center justify-center gap-4 w-full h-auto mx-auto p-4 md:mt-16"
      id="footer"
    >
      <div
        className="relative flex flex-col items-center justify-center gap-4 w-full max-w-screen-hd mx-auto sm:p-4"
        id="footer"
      >
        <section
          className="flex flex-col items-center justify-center gap-4 w-full max-w-screen-hd mx-auto bg-zinc-100 border border-zinc-200 rounded-xl"
          id="footer"
        >
          <div
            className="flex flex-col items-center justify-start gap-12 w-full mx-auto p-8"
            id="footer-nav"
          >
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <a href="/" className="flex items-center justify-center gap-2">
                <img
                  src="/logos/logo-notex.svg"
                  alt="NoteX Logo"
                  className="w-auto h-12 object-contain"
                />
              </a>
            </div>

            <ul
              className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start justify-center gap-8 w-full mx-auto"
              id="footer-nav"
            >
              {footer.map((item, index) => {
                const { children } = item;

                return (
                  <li
                    key={index}
                    className="flex flex-col items-center md:items-start justify-center gap-2 w-full max-w-fit md:pr-8"
                    id="footer-nav-item"
                  >
                    <span
                      className="text-zinc-400 font-light mb-2 pointer-events-none select-none"
                      id="footer-nav-item-title"
                    >
                      {item.title}
                    </span>

                    {children && (
                      <ul
                        className="flex flex-col items-center md:items-start justify-start gap-2"
                        id="footer-nav-item-links"
                      >
                        {children.map((subitem, index) => (
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
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 w-full mx-auto mt-4 py-4 px-8 bg-zinc-200 rounded-b-xl"
            id="footer-legal"
          >
            <p className="text-zinc-600 text-sm">
              © {year} NoteX. All rights reserved.
            </p>

            <p
              className="flex items-center justify-center gap-4 text-zinc-600 text-sm"
              id="footer-legal-links"
            >
              <a
                href="/terms"
                className="hover:underline"
                id="footer-legal-terms"
              >
                Terms
              </a>
              <a
                href="/privacy"
                className="hover:underline"
                id="footer-legal-privacy"
              >
                Privacy
              </a>
              <a
                href="/cookies"
                className="hover:underline"
                id="footer-legal-cookies"
              >
                Cookies
              </a>
              <a
                href="/security"
                className="hover:underline"
                id="footer-legal-legal"
              >
                Security
              </a>
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}
