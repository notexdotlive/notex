'use client';

import { useEffect, useState } from 'react';
import { archivo } from '@/config/fonts';

import Editor from '@/components/editor';

export default function Note({ params }: { params: { id: string } }) {
  const [content, setContent] = useState('');

  const handleChangeContent = (content: string) => setContent(content);

  const handleLoad = async (id: string) => {
    if (!id) return;

    try {
      const data = await fetch(`/api/notes/${id}`);
      const { content } = await data.json();
      setContent(content);
    } catch (error) {
      console.error(error);
    } finally {
      setContent('');
    }
  };

  useEffect(() => {
    const id = params.id;
    handleLoad(id);
  }, [params, params.id]);

  return (
    <>
      <section
        className={`flex flex-col flex-1 items-start justify-start w-full max-w-7xl h-auto min-h-max mx-auto p-4 md:pt-8 md:py-16 ${archivo.variable}`}
      >
        <Editor content={content} setContent={handleChangeContent} />
      </section>
    </>
  );
}
