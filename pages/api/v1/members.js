import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = await new PrismaClient();

  if (req.method === "GET") {
    const members = prisma.member.findMany();

    if (!members) {
      res.status(500).json({ success: false, message: "Could not get the list of members." });
    }

    res.status(200).json({ success: true, members });
  }
}
