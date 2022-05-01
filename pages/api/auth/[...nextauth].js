import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import { Prisma, PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Usuario",
          type: "text",
          placeholder: "Ingrese su usuario",
        },
        password: {
          label: "Contraseña",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const prisma = await new PrismaClient();

        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
          });

          if (!user) {
            console.log("User not found");
            return false;
          }

          if (!(await compare(credentials.password, user.password))) {
            console.log("Incorrect password");
            return false;
          }

          return {
            name: user.name,
            username: user.username,
          };
        } catch (err) {
          console.log(err);
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
