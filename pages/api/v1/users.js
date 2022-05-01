import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const prisma = await new PrismaClient();

  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();

      if (!users) {
        res.status(500).json({ success: false, message: "Could not get the list of users." });
      }

      res.status(200).json({ success: true, users });
    } else if (req.method === "POST") {
      // Fetching the user data from the request body
      const { name, username, email, password } = req.body;

      // Check if all fields are filled
      if (!name) res.status(422).json({ success: false, message: "Name field is required." });

      if (!username) res.status(422).json({ success: false, message: "Username field is required." });

      if (!password) res.status(422).json({ success: false, message: "Password field is required." });

      // Create new user
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: await hash(password, 10),
        },
      });

      // Return response with the user
      res.status(201).json({ success: true, user });
    }
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
