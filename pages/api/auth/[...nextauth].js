import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb"

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      session: ({session, token, user}) => {
        console.log({session, token, user});
        return session
      }
    }
  }
export default NextAuth(authOptions)