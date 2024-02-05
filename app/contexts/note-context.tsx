import { ReactNode, createContext, useContext, useState } from 'react';
import { TNote } from '@/@types/note';

interface INoteContext {
  search: string;
  setSearch: (value: string) => string;
  notes: TNote[];
  setNotes: (value: TNote[]) => TNote[];
  note: TNote;
  setNote: (value: TNote) => TNote;
  loadingNote: boolean;
  setLoadingNote: (value: boolean) => boolean;
}

export const NoteContext = createContext<INoteContext | null>(null);

function NoteProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('' as string);

  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([] as TNote[]);
  const [note, setNote] = useState({} as TNote);

  const handleSearch = (value: string) => {
    setSearch(value);
    return value;
  };

  const handleSetNote = (value: TNote) => {
    setNote(value);
    return value;
  };

  const handleSetNotes = (value: TNote[]) => {
    setNotes(value);
    return value;
  };

  const handleSetLoadingNote = (value: boolean) => {
    setLoading(value);
    return value;
  };

  return (
    <NoteContext.Provider
      value={{
        search,
        setSearch: handleSearch,
        notes,
        setNotes: handleSetNotes,
        note,
        setNote: handleSetNote,
        loadingNote: loading,
        setLoadingNote: handleSetLoadingNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

function useNote(): INoteContext {
  const context = useContext(NoteContext);
  if (!context) throw new Error('useNote must be used within a NoteProvider');
  return context;
}

export { NoteProvider, useNote };
