import { NextResponse } from '@/infra/next/server';
import { query, db, where, getDocs, collection } from '@/services/firebase';

export async function GET(
  request: Request,
  context: { params: { author_id: string } },
) {
  const { author_id } = context.params;
  const author = +author_id;

  if (isNaN(author)) {
    return NextResponse.json({ error: 'Invalid author ID' }, { status: 400 });
  }

  const q = query(collection(db, 'notes'), where('author_id', '==', author));

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(data, { status: 200 });
}
