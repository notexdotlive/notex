import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/github')
    return NextResponse.redirect('https://github.com/gelzinn/notex');
}

export const config = {
  /**
   * This represents the routes that the middleware will be applied to.
   */

  matcher: ['/'],
};
