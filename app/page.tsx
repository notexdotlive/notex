import { Icon } from './components/icon';
import Section from './components/section';

const Homepage = () => {
  return (
    <>
      <section
        className="relative flex flex-1 md:grid grid-cols-[62fr,38fr] flex-col md:flex-row items-start justify-between gap-16 md:gap-0 w-full max-w-screen-hd h-auto mx-auto p-4 pt-12 sm:py-16 z-0"
        id="hero-section"
      >
        <div className="absolute top-px max-md:-left-64 -mt-[2px] flex justify-center pointer-events-none select-none z-0 overflow-hidden md:-scale-x-100">
          <div className="w-[120rem] h-[120rem] flex-none flex justify-end md:justify-start -scale-x-100">
            <img
              alt="NoteX Lightning"
              src="/assets/lightning.avif"
              className="w-[100rem] flex-none max-w-none blur-3xl -scale-x-100"
              style={{
                filter: 'hue-rotate(90deg) saturate(5) brightness(1)',
                WebkitMaskImage:
                  'linear-gradient(to right, black, transparent)',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-4 w-full h-full p-0 sm:p-8 md:p-0 -mb-64 z-10">
          <div className="flex flex-col items-center md:items-start justify-start gap-4 w-full max-w-xl h-full text-balance sm:text-pretty text-center md:text-left">
            <span
              id="hero-badge"
              data-pulse={false}
              className="group flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-rose-300 bg-gradient-to-r from-rose-50 via-rose-300/50 to-rose-100 animate-background-linear"
              style={{
                backgroundSize: '600%',
              }}
            >
              <div
                className="group-data-[pulse=false]:hidden group-data-[pulse=true]:block relative w-1.5 h-1.5 rounded-full bg-rose-500"
                aria-hidden
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>

              <span className="flex items-center justify-start gap-2 text-zinc-950 text-sm text-nowrap">
                <Icon
                  name="Stars"
                  className="w-4 h-4 text-rose-500"
                  aria-hidden
                />
                Introducing NoteX — Notes, but better.
              </span>
            </span>
            <h1
              className="w-full text-4xl sm:text-7xl font-bold leading-none text-center md:text-left text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5.4vw, 4.5rem)!important',
              }}
            >
              Never throw away a thought
            </h1>
            <p className="hidden sm:block w-full md:text-xl text-zinc-500 text-center md:text-left text-balance">
              Effortlessly capture, organize, and bring your ideas to life. Your
              creativity, instantly at your fingertips.
            </p>
            <p className="sm:hidden block w-full md:text-xl text-zinc-500 text-center md:text-left text-balance px-4">
              Effortlessly capture, organize, and bring your ideas to life.
            </p>
            <div
              className="flex flex-col md:flex-row items-center justify-start gap-2 w-full md:w-fit h-fit"
              id="hero-buttons"
            >
              <button
                className="flex flex-col items-center justify-center gap-4 h-fit px-6 py-3 my-2 text-pretty rounded-md text-zinc-50 bg-zinc-900 hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-300 focus-visible:ring-opacity-50 focus-visible:ring-offset-zinc-900"
                id="start-creating-button"
              >
                <span className="whitespace-nowrap">Start Creating</span>
              </button>

              <span
                className="flex items-center justify-center text-sm text-zinc-500 ml-2"
                id="hero-pricing"
              >
                <span className="italic">It&apos;s free</span>, get started now!
              </span>
            </div>
            <ul
              className="flex items-center justify-center md:justify-start px-2 md:px-0 gap-2 w-full md:w-fit md:max-w-md"
              id="hero-features"
            >
              <li
                className="flex items-center justify-center gap-2 text-pretty rounded-md"
                id="hero-feature"
              >
                <Icon
                  name="CheckCircle"
                  className="w-4 h-4 text-rose-500"
                  aria-hidden
                />
                <p>No credit card</p>
              </li>

              <li
                className="flex items-center justify-center gap-2 p-2 md:px-2 text-pretty rounded-md"
                id="hero-feature"
              >
                <Icon
                  name="CheckCircle"
                  className="w-4 h-4 text-rose-500"
                  aria-hidden
                />
                <p>No registration</p>
              </li>
            </ul>
          </div>

          <div
            className="flex flex-col items-center justify-start md:justify-center w-full md:w-fit h-fit mt-auto pt-2 md:pt-12"
            id="hero-rating"
          >
            <div
              className="flex flex-row items-center justify-center gap-1"
              id="hero-stars"
            >
              <section
                className="flex items-center justify-center gap-0.5 text-rose-500"
                id="hero-stars"
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <Icon
                      key={i}
                      name="Star"
                      className={`w-4 h-4 text-rose-500 ${
                        i < 4 ? 'fill-rose-500' : 'fill-transparent'
                      }`}
                      aria-hidden
                    />
                  );
                })}
              </section>

              <span className="flex items-center justify-start gap-2 text-sm text-zinc-500 ml-2">
                4.9 stars
                <span className="sr-only">out of 5 stars</span>
              </span>
            </div>

            <div
              className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-1 w-full"
              id="hero-reviews"
            >
              <span className="w-fit md:w-full text-sm text-zinc-500 mt-2">
                10,000+ reviews
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative flex items-center justify-center md:block w-full min-h-36 md:min-h-[500px] h-fit max-md:mt-48 -mb-72 md:mb-0 pointer-events-none select-none"
          id="hero-illustrations"
        >
          <picture className="md:w-1/2 md:h-auto md:mt-32">
            <img
              src="/assets/book.svg"
              alt="NoteX Book"
              className="w-full max-w-md md:w-full mx-auto min-h-32 h:full object-contain pointer-events-none select-none mask-image-linear rotate-[8.8deg]"
            />
          </picture>
        </div>
      </section>

      <main
        className="relative flex flex-1 flex-col items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto p-4"
        id="features-section"
      >
        <Section
          id="files-section"
          title={
            <>
              <span>Your files.</span>
              <span>Wherever you need it.</span>
            </>
          }
          description="File freedom at your fingertips. Save online with an account or locally without. Seamless access, anytime, anywhere."
          image="/assets/illustrations/transfer-files.svg"
          imageAlt="NoteX Book"
          imagePosition="right"
        />

        <section
          className="relative flex flex-1 flex-col items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto py-32"
          id="markdown-brilliance-section"
        >
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl h-full mx-auto text-balance">
            <h2 className="flex flex-col text-5xl font-bold leading-none text-center">
              <span>Markdown Brilliance</span>
            </h2>
            <p className="text-xl text-zinc-500 text-center">
              File freedom at your fingertips. Save online with an account or
              locally without. Seamless access, anytime, anywhere.
            </p>

            <a
              href=""
              className="group/button flex items-center justify-center gap-2 text-xl
              text-rose-500"
            >
              <span>Markdown Guide</span>
            </a>
          </div>

          <picture
            className="absolute top-0 bottom-0 flex items-center justify-center w-screen h-full max-w-screen-hd mx-auto"
            id="markdown-brilliance"
          >
            <img
              src="/assets/gradient-background.svg"
              alt="NoteX Gradient Background"
              className="w-screen h-auto object-cover pointer-events-none select-none"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black, transparent)',
              }}
            />
          </picture>
        </section>

        <Section
          id="files-section"
          title={
            <>
              <span>Your notes.</span>
              <span>Your own world.</span>
            </>
          }
          description="Express yourself with formatting tools that help you write how you think. Note down your ideas and express them in writing."
          image="/assets/illustrations/notes.svg"
          imageAlt="NoteX Notes"
          imagePosition="left"
        />
      </main>
    </>
  );
};

export default Homepage;
