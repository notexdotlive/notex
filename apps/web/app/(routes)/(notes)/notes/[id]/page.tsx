import { Editor } from 'novel';
import { archivo } from '@/config/fonts';

export default function Note({ params }: { params: { id: string } }) {
  return (
    <>
      <section
        className={`flex items-start justify-start w-full max-w-7xl h-auto mx-auto p-4 sm:p-8 md:pt-8 md:py-16 ${archivo.variable}`}
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