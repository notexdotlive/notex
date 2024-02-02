import { Editor } from 'novel';
import { archivo } from '@/fonts';

export default function Note() {
  return (
    <>
      <section
        className={`flex items-start justify-start p-0 sm:p-8 md:px-24 sm:py-8 ${archivo.variable}`}
      >
        <Editor
          storageKey="@notex/note"
          className="w-full max-w-4xl h-auto min-h-screen mx-auto"
          defaultValue=""
        />
      </section>
    </>
  );
}
