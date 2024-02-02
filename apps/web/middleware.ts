import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const headers = new Headers(request.headers);

  headers.set('x-url', request.url);
  headers.set('x-origin', origin);
  headers.set('x-pathname', pathname);

  if (request.nextUrl.pathname === '/github')
    return NextResponse.redirect('https://github.com/gelzinn/notex');

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  /**
   * This represents the routes that the middleware will be applied to.
   */

  matcher: ['/'],
};
