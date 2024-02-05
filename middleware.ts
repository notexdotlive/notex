import { redirects as redirectsUrls } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

type TRedirects = {
  [key: string]: string;
};

const starts = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.startsWith(path);

const ends = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.endsWith(path);

const equals = (request: NextRequest, path: string) =>
  request.nextUrl.pathname === path;

const redirects: TRedirects = redirectsUrls;

export async function middleware(request: NextRequest) {
  /**
   * Shortcuts for the most common redirects.
   */

  for (const redirect in redirects) {
    if (equals(request, redirect))
      return NextResponse.redirect(redirects[redirect]);
  }
}

export const config = {
  /**
   * Configure the middleware to only run on specific paths.
   */

  matcher: null,
};
