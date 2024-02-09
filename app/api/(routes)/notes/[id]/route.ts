import { NextResponse } from '@/infra/next/server';
import { query, db, where, getDocs, collection } from '@/services/firebase';

import { status } from '@/api/config';

export const revalidate = 60; // 1 minute

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const q = query(collection(db, 'notes'), where('id', '==', id));

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!data || (data && data.length !== 1))
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    const note = data[0];

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
}
