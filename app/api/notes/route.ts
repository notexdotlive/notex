import { NextResponse } from '@/infra/next/server';
import { query, db, where, getDocs, collection } from '@/services/firebase';

import { status } from '@/api/config';

export const revalidate = 60; // 1 minute

type ContentType = {
  type: string;
  attrs?: { [key: string]: string | number };
  text?: string;
  content?: ContentType[];
};

function extractUserText(content: ContentType | ContentType[]): string {
  let string = '';

  const contents = Array.isArray(content) ? content : [content];

  for (const item of contents) {
    if (item.text) string += item.text + ' ';
    else if (item.content) string += extractUserText(item.content);
  }

  return string.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = Object.fromEntries(searchParams);

  const search = params.q && params.q.trim();

  const id = params.id && params.id.split(',').map((a) => a.trim());

  const authors =
    params.author && params.author.split(',').map((a) => +a.trim());
  const statuses =
    params.status && params.status.split(',').map((a) => a.trim());

  try {
    if (search) {
      const term = search.toLowerCase().trim();

      const q = query(collection(db, 'notes'));

      const snapshot = await getDocs(q);

      const data = snapshot.docs
        .filter((doc) => {
          const data = doc.data();
          const { title, tags, content: cnt } = data;

          const content = JSON.parse(String(cnt)).content;
          const note = extractUserText(content);

          return (
            title.toLowerCase().includes(term) ||
            tags.some((tag: string) => tag.toLowerCase().includes(term)) ||
            note.toLowerCase().includes(term)
          );
        })
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      return NextResponse.json(data, { status: 200 });
    }

    if (id) {
      const q = query(collection(db, 'notes'), where('id', 'in', id));

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(data, { status: 200 });
    }

    if (authors) {
      if (authors.some(isNaN))
        return NextResponse.json(
          { error: 'Invalid author ID' },
          { status: 400 },
        );

      const q = query(
        collection(db, 'notes'),
        where('author_id', 'in', authors),
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(data, { status: 200 });
    }

    if (statuses) {
      if (statuses.some((s) => !status.includes(s)))
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

      const q = query(collection(db, 'notes'), where('status', 'in', statuses));

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(data, { status: 200 });
    }

    const snapshot = await getDocs(collection(db, 'notes'));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
