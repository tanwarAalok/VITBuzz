import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
            return (
              profile.email_verified &&
              profile.email.endsWith("@vitbhopal.ac.in")
            );
          }
          return true; // Do different verification for other providers that don't have `email_verified`
        },
      },
    }),
  ],
});
