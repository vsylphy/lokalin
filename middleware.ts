import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("🔥 MIDDLEWARE JALAN:", request.nextUrl.pathname);
  console.log("\n==============================");
  console.log("MIDDLEWARE RUN");
  console.log("PATH:", request.nextUrl.pathname);

  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.cookies.getAll();

          console.log(
            "COOKIES:",
            cookies.map((c) => c.name),
          );

          return cookies;
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next();

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log("SESSION:", session?.user?.email ?? "NULL");
    console.log("USER ID:", session?.user?.id ?? "NULL");

    if (error) {
      console.log("SESSION ERROR:", error.message);
    }

    if (request.nextUrl.pathname.startsWith("/admin") && !session) {
      console.log("❌ NO SESSION -> REDIRECT LOGIN");

      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("✅ SESSION VALID -> ALLOW ACCESS");
  } catch (err) {
    console.log("MIDDLEWARE ERROR:", err);

    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("==============================\n");

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
