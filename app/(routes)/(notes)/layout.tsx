'use client';

import { NoteProvider } from '@/contexts/note-context';
import { ReactNode } from 'react';

export default function NotesLayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <NoteProvider>{children}</NoteProvider>;
}
