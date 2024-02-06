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

  return string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams);

  try {
    const ref = collection(db, 'notes');
    let q: any = query(ref);

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const id = doc.id;
      const data: any = doc.data();
      const orderedData: any = {};

      const keys = Object.keys(data).sort();

      keys.forEach((key) => {
        orderedData[key] = data[key];
      });

      return {
        id,
        ...orderedData,
        content: data.content,
        description: extractUserText(
          JSON.parse(String(data.content)).content,
        ).trim(),
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
