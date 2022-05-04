import { PrismaClient, ResourceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  });

  const verifyRecord1 = await prisma.verifyRecord.create({
    data: {
      title: '审核素材1',
      content: '审核素材1',
      type: ResourceType.IMAGE,
      verifier: {
        connectOrCreate: {
          where: {
            email: user1.email,
          },
          create: {
            email: 'juvenilekeanuo@live.com',
            password: '19980411',
          },
        },
      },
      client: {
        connectOrCreate: {
          where: {
            email: 'juvenilekeanuo@live.com',
          },
          create: {
            email: 'juvenilekeanuo@live.com',
            password: '19980411',
            nickname: 'keanuo',
            balance: 0,
          },
        },
      },
    },
  });

  console.log({ user1, user2, verifyRecord1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
