import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = await new PrismaClient();

  try {
    if (req.method === "GET") {
      const members = await prisma.member.findMany();

      if (!members) {
        res.status(500).json({ success: false, message: "Could not get the list of members." });
      }

      res.status(200).json({ success: true, members });
    } else if (req.method === "POST") {
    }
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
