import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const path = request.nextUrl.pathname;
      if (path.startsWith("/studio") || path.startsWith("/api/studio")) {
        return isLoggedIn;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
