'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from '@/infra/next/client';

import { TNote } from '@/@types/note';
import { useNote } from '@/contexts/note-context';

import { Icon } from '@/components/icon';

export default function Notes() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setNote } = useNote();

  const [notes, setNotes] = useState<TNote[]>([]);

  const [loading, setLoading] = useState(true);

  const search = searchParams.get('q') || '';

  const handleSearch = async (search: string) => {
    if (!search) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/notes?q=${search}`);
      if (!res.ok) return;

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/notes`);
      if (!res.ok) return;

      const data = await res.json();

      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (search && search !== '') {
      params.set('q', search);
      handleSearch(search);
    } else {
      params.delete('q');
      handleLoad();
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, search]);

  return (
    <div className="flex flex-col flex-1 items-start justify-start w-full max-w-7xl h-auto mx-auto p-4 md:py-8">
      <section className="flex flex-1 w-full h-auto mx-auto">
        {loading ? (
          <div
            className="flex items-center justify-center w-full"
            aria-disabled="true"
          >
            <span className="flex items-center justify-center w-4 h-4 text-zinc-950 pointer-events-none select-none">
              <Icon name="Loader" className="w-4 h-4 animate-spin" />
            </span>
          </div>
        ) : (
          <div className="flex flex-col w-full h-auto" aria-disabled="false">
            <section className="flex flex-col items-start justify-start w-full h-auto">
              {search && (
                <span
                  className={`flex items-center justify-start w-full h-auto text-sm text-zinc-500 mb-4`}
                >
                  Results for: &quot;<strong>{search}</strong>&quot;
                </span>
              )}
            </section>

            {!loading && notes && notes.length === 0 ? (
              <span>No notes found.</span>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full h-auto">
                {notes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      setNote && setNote(note);
                      router.push(`/notes/${note.id}`);
                    }}
                    className="flex flex-col w-full h-fit p-4 bg-zinc-100 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100"
                  >
                    <span className="text-xl text-zinc-900">{note.title}</span>
                  </button>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
