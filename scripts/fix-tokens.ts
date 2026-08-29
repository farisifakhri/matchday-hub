import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(
    "UPDATE Player SET qrCodeToken = CONCAT('PASS-', id) WHERE qrCodeToken IS NULL OR qrCodeToken = ''"
  );
  console.log("✅ All players now have valid non-null qrCodeToken values in MySQL!");
}

main()
  .catch((e) => {
    console.error("Error updating player tokens:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
