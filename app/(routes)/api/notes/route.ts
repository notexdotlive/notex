import { NextResponse } from '@/infra/next/server';
import { db, getDocs, collection } from '@/services/firebase';

export async function GET(request: Request) {
  try {
    const snapshot = await getDocs(collection(db, 'notes'));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
