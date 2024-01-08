import { Icon } from './components/icon';
import Section from './components/section';

const Homepage = () => {
  return (
    <>
      <section
        className="relative flex flex-1 flex-col items-start justify-between gap-16 md:gap-4 w-full max-w-screen-hd md:h-fit mx-auto p-4 py-16 z-0"
        id="hero-section"
      >
        <div className="absolute top-px max-md:-left-64 -mt-[2px] flex justify-center pointer-events-none select-none z-0 overflow-hidden md:-scale-x-100">
          <div className="w-[120rem] h-[120rem] flex-none flex justify-end md:justify-start -scale-x-100">
            <img
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

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 w-full p-0 sm:p-8 md:p-0 -mb-64 z-10">
          <div className="flex flex-col items-center md:items-start justify-start gap-4 w-full max-w-xl h-full text-balance sm:text-pretty text-center md:text-left">
            <span
              className="group flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-zinc-100 border border-zinc-200"
              id="hero-badge"
              data-pulse={false}
            >
              <div
                className="group-data-[pulse=false]:hidden group-data-[pulse=true]:block relative w-1.5 h-1.5 rounded-full bg-rose-500"
                aria-hidden
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>

              <span className="flex items-center justify-start gap-2 text-zinc-950 text-sm">
                <Icon
                  name="Rocket"
                  className="w-4 h-4 text-rose-500"
                  aria-hidden
                />
                Introducing NoteX — Notes, but better.
              </span>
            </span>

            <h1 className="w-full text-4xl sm:text-7xl font-bold leading-none text-center md:text-left">
              Never throw away a thought
            </h1>
            <p className="w-full sm:text-xl text-zinc-500 text-center md:text-left">
              Effortlessly capture, organize, and bring your ideas to life. Your
              creativity, instantly at your fingertips.
            </p>

            <ul
              className="flex items-center justify-center md:justify-start gap-2 px-2 w-full md:w-fit md:max-w-md md:bg-zinc-100 md:border md:border-zinc-200 rounded-md md:mt-2"
              id="hero-features"
            >
              <li
                className="flex items-center justify-center gap-2 max-md:p-2 md:px-2 text-pretty rounded-md"
                id="hero-feature"
              >
                <Icon
                  name="CheckCircle"
                  className="w-4 h-4 text-rose-500"
                  aria-hidden
                />
                <p>Without credit card</p>
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
                <p>Without registration</p>
              </li>
            </ul>
          </div>

          <div
            className="flex flex-col items-end justify-end gap-2 w-fit h-full"
            id="hero-buttons"
          >
            <button
              className="flex flex-col items-center justify-center gap-4 h-full px-6 md:px-8 py-3 md:py-4 md:text-xl text-pretty text-zinc-50 bg-zinc-900 rounded-md"
              id="start-creating-button"
            >
              <span className="whitespace-nowrap">Start Creating</span>
            </button>
          </div>
        </div>

        <div
          className="relative flex items-center justify-center md:block w-full min-h-36 md:min-h-[500px] h-fit max-md:mt-64 md:mb-96 pointer-events-none select-none"
          id="hero-illustrations"
        >
          <picture className="absolute right-0 max-md:left-0 top-0 md:w-1/2 md:h-auto md:mt-32">
            <img
              src="/assets/book.svg"
              alt="NoteX Book"
              className="w-full max-md:max-w-sm md:w-full mx-auto min-h-32 h:full object-contain pointer-events-none select-none mask-image-linear max-md:rotate-[8.8deg]"
            />
          </picture>

          <picture className="hidden md:block absolute right-0 -mr-10 w-full h-auto -z-[1]">
            <img
              src="/assets/dashed-line.svg"
              alt="NoteX Dashed Line"
              className="w-full px-32 h-auto object-contain pointer-events-none select-none animate-pulse"
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
