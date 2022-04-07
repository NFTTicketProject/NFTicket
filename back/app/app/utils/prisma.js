let prisma;
const PrismaClient = require('@prisma/client')

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient.PrismaClient()
}
// `stg` or `dev`
else {
    if (!global.prisma) {
        global.prisma = new PrismaClient.PrismaClient()
    }

    prisma = global.prisma
}

module.exports = prisma
