const { PrismaClient } = require('@prisma/client');

// Instantiate the Prisma Client
const prisma = new PrismaClient();

// Optional: A quick query to test that Prisma can talk to Docker
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma connected to PostgreSQL successfully!');
  } catch (error) {
    console.error('Prisma database connection failed:', error);
  }
}

testConnection();

module.exports = prisma;
