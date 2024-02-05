'use client';

import { useEffect, useState } from 'react';
import { archivo } from '@/config/fonts';

import { TNote } from '@/@types/note';

import { useNote } from '@/contexts/note-context';
import Editor from '@/components/editor';

export default function Note({ params }: { params: { id: string } }) {
  const { setNote, setLoadingNote } = useNote();
  const [content, setContent] = useState('');

  const handleChangeContent = (content: string) => setContent(content);

  const handleLoad = async (id: string) => {
    if (!id || (id && id === 'new')) return;

    try {
      if (!setNote && !setLoadingNote)
        return console.error('Error: Note context is not defined.');

      setLoadingNote(true);

      const res = await fetch(`/api/notes/${id}`);
      if (!res.ok) return;

      const data = await res.json();
      const { content } = data;

      console.log(content);

      setContent(content);
      setNote(data as TNote);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNote(false);
    }
  };

  useEffect(() => {
    const id = params.id;
    handleLoad(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, params.id]);

  return (
    <>
      <section
        className={`flex flex-1 flex-col items-start justify-start w-full max-w-7xl h-auto min-h-max mx-auto p-4 md:pt-8 md:py-16 ${archivo.variable}`}
      >
        <Editor content={content} setContent={handleChangeContent} />
      </section>
    </>
  );
}
