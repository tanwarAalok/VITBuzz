import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/pages/api/auth/lib/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      profile(profile){
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.role = token.role;
      return session;
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
            profile.email_verified &&
            profile.email.endsWith("@vitbhopal.ac.in")
        );
      }
      return false;
    },
  },
  session: {
    strategy: "jwt",
  },
});
