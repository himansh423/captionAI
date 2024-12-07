import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  // If token is not present, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access to the requested route if token is present
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ['/'],
};
