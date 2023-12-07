import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth", // Redirect users to "/login" when signing in
  },
  session: {
    strategy: "jwt",
  },
  // secret key
  secret: process.env.NEXT_PUBLIC_SECRET,
  // providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
