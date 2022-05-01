import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "Ingrese su usuario" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {},
    }),
  ],
});
