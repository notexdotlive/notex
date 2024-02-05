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
      if (!res.ok) return setNotes([]);

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
    if (!pathname || !searchParams) return;

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
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-auto">
                {notes
                  .sort((a, b) => {
                    const dateA = new Date(a.metadata.updated_at);
                    const dateB = new Date(b.metadata.updated_at);

                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((note: TNote) => {
                    const {
                      id,
                      title,
                      description,
                      metadata: { created_at, updated_at },
                    } = note;

                    const created = new Date(created_at);
                    const updated = new Date(updated_at);

                    return (
                      <button
                        key={note.id}
                        onClick={() => {
                          setNote && setNote(note);
                          router.push(`/notes/${id}`);
                        }}
                        className="flex flex-col items-start justify-start w-full h-fit bg-zinc-100 border border-zinc-200 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
                      >
                        <div
                          className="flex flex-col items-start justify-start w-full h-fit"
                          aria-disabled="false"
                        >
                          <div
                            className="flex flex-col flex-1 items-start justify-start gap-2 w-full h-fit p-4"
                            aria-disabled="false"
                          >
                            <span className="text-xl text-zinc-900">
                              {title}
                            </span>
                            <p
                              className="w-fit text-sm text-zinc-500"
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {description}
                            </p>
                          </div>

                          <footer
                            className="flex items-center justify-between w-full h-auto p-4 border-t border-zinc-200 hover:border-zinc-300"
                            aria-disabled="false"
                          >
                            <span className="flex items-center justify-start w-full h-auto text-xs text-zinc-500">
                              <span className="flex items-center justify-start w-auto h-auto">
                                <Icon
                                  name="Calendar"
                                  className="w-4 h-4 mr-1 text-zinc-500"
                                />
                                <span>
                                  {created.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                              </span>
                            </span>
                          </footer>
                        </div>
                      </button>
                    );
                  })}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
