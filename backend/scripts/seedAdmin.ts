import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdmin() {
  const existing = await prisma.user.findFirst({ where: { role: 'admin' } });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@acsoft.com",
      password: hashedPassword,
      role: "admin",
      phone: "1234567890",
      isDefaultPassword: true,
    },
  });

  console.log("✅ Admin created successfully");
}

createAdmin();
