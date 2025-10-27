import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]; 
  if (pathname === "/login" || pathname === "/signup") {
    return res;
  }
  if (firstSegment && user === null) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return res;
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.woff|.*\\.woff2|.*\\.ttf).*)",
  ],
};
