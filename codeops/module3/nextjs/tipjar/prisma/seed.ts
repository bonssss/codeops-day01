import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  console.log("🌱 Starting TipJar database seeding...");

  // Clean existing data in reverse order of dependencies
  await prisma.payment.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = await hashPassword("password123");

  // 1. Creator 1: Bonsa Diriba (@bonsa) - Full Stack Dev & Open Source Creator
  const user1 = await prisma.user.create({
    data: {
      email: "bonsa@tipjar.io",
      name: "Bonsa Diriba",
      passwordHash: defaultPasswordHash,
      profile: {
        create: {
          username: "bonsa",
          displayName: "Bonsa Diriba",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          bio: "🚀 Full Stack Engineer & Open Source Enthusiast. Building modern web tools, Next.js tutorials, and developer ecosystems in Addis Ababa.",
          location: "Addis Ababa, Ethiopia",
          website: "https://bonsa.dev",
          github: "bonsa-diriba",
          linkedin: "bonsadiriba",
          twitter: "bonsa_dev",
          currency: "ETB",
          customTipMessage: "Thanks a lot for supporting my open-source projects and developer tutorials! Every birr keeps the code flowing.",
          suggestedAmounts: "50,100,200,500",
          allowAnonymous: true,
          showSupporterWall: true,
          socialLinks: {
            create: [
              { platform: "github", url: "https://github.com/bonsa-diriba", label: "GitHub Profile" },
              { platform: "twitter", url: "https://x.com/bonsa_dev", label: "X / Twitter" },
              { platform: "linkedin", url: "https://linkedin.com/in/bonsadiriba", label: "LinkedIn" },
              { platform: "website", url: "https://bonsa.dev", label: "Personal Portfolio" },
            ],
          },
        },
      },
    },
    include: { profile: true },
  });

  // 2. Creator 2: Sara Bekele (@sarab) - Digital Artist & UX Designer
  const user2 = await prisma.user.create({
    data: {
      email: "sara@tipjar.io",
      name: "Sara Bekele",
      passwordHash: defaultPasswordHash,
      profile: {
        create: {
          username: "sarab",
          displayName: "Sara Bekele",
          avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
          bio: "🎨 Digital Illustrator & UI/UX Designer. Sharing free Figma kits, Ethiopian cultural digital art, and graphic design tutorials.",
          location: "Hawassa, Ethiopia",
          website: "https://sarab-art.com",
          github: "sarabekele",
          linkedin: "sarabekele",
          twitter: "sara_designs",
          currency: "ETB",
          customTipMessage: "Thank you for buying me a coffee/tea! Your support helps me create more free digital assets & illustrations.",
          suggestedAmounts: "100,250,500,1000",
          allowAnonymous: true,
          showSupporterWall: true,
          socialLinks: {
            create: [
              { platform: "website", url: "https://sarab-art.com", label: "Art Portfolio" },
              { platform: "twitter", url: "https://x.com/sara_designs", label: "Twitter Art" },
              { platform: "instagram", url: "https://instagram.com/sara_illustrations", label: "Instagram" },
            ],
          },
        },
      },
    },
    include: { profile: true },
  });

  // 3. Creator 3: Abel Tadesse (@abelt) - Indie Musician & Audio Producer
  const user3 = await prisma.user.create({
    data: {
      email: "abel@tipjar.io",
      name: "Abel Tadesse",
      passwordHash: defaultPasswordHash,
      profile: {
        create: {
          username: "abelt",
          displayName: "Abel Tadesse",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          bio: "🎵 Indie Musician & Sound Engineer. Creating Ethio-Jazz lo-fi beats, sample packs, and music production guides.",
          location: "Addis Ababa, Ethiopia",
          website: "https://abelsound.com",
          twitter: "abel_beats",
          currency: "ETB",
          customTipMessage: "Much love for tuning in and supporting indie sound production! 🎧",
          suggestedAmounts: "50,150,300,750",
          allowAnonymous: true,
          showSupporterWall: true,
          socialLinks: {
            create: [
              { platform: "youtube", url: "https://youtube.com/@abelbeats", label: "YouTube Channel" },
              { platform: "twitter", url: "https://x.com/abel_beats", label: "X Beatmaking" },
            ],
          },
        },
      },
    },
    include: { profile: true },
  });

  // 4. Supporter User 4: Michael Haile
  const user4 = await prisma.user.create({
    data: {
      email: "michael@gmail.com",
      name: "Michael Haile",
      passwordHash: defaultPasswordHash,
      profile: {
        create: {
          username: "michaell",
          displayName: "Michael Haile",
          avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
          bio: "Tech enthusiast and avid reader.",
          currency: "ETB",
        },
      },
    },
  });

  // 5. Supporter User 5: Helen Mengistu
  const user5 = await prisma.user.create({
    data: {
      email: "helen@gmail.com",
      name: "Helen Mengistu",
      passwordHash: defaultPasswordHash,
      profile: {
        create: {
          username: "helenm",
          displayName: "Helen Mengistu",
          avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
          bio: "Frontend dev and coffee lover.",
          currency: "ETB",
        },
      },
    },
  });

  console.log("✅ Seeded 5 Users & Creator Profiles");

  // Create Goals for Bonsa
  const bonsaGoal1 = await prisma.goal.create({
    data: {
      userId: user1.id,
      title: "🚀 Upgrade High-Performance Dev Setup",
      description: "Help me get a 32GB RAM M3 Workstation for compiling Rust and building deep Next.js open-source tooling.",
      targetAmount: 50000,
      currentAmount: 36500,
      currency: "ETB",
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      status: "ACTIVE",
    },
  });

  const bonsaGoal2 = await prisma.goal.create({
    data: {
      userId: user1.id,
      title: "🎙️ High-Quality Podcast Microphone",
      description: "Shure SM7B setup for launching the Ethiopian Tech & Codeops Podcast series.",
      targetAmount: 18000,
      currentAmount: 18000,
      currency: "ETB",
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
      status: "COMPLETED",
    },
  });

  // Create Goals for Sara
  const saraGoal1 = await prisma.goal.create({
    data: {
      userId: user2.id,
      title: "🎨 Wacom Cintiq Pro Drawing Tablet",
      description: "A professional pressure-sensitive display to produce ultra high-res cultural Ethiopian graphic novel illustrations.",
      targetAmount: 65000,
      currentAmount: 42000,
      currency: "ETB",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=800&auto=format&fit=crop&q=80",
      status: "ACTIVE",
    },
  });

  // Create Goals for Abel
  const abelGoal1 = await prisma.goal.create({
    data: {
      userId: user3.id,
      title: "🎹 Studio Monitor Speakers (Yamaha HS8)",
      description: "A pair of flat-response studio reference monitors for precision audio mastering of Ethio-Jazz lo-fi tracks.",
      targetAmount: 40000,
      currentAmount: 15500,
      currency: "ETB",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80",
      status: "ACTIVE",
    },
  });

  console.log("✅ Seeded Creator Goals");

  // Generate 35+ realistic tips across creators with varied amounts, dates, and statuses
  const supporterNames = [
    "Dawit Alemayehu",
    "Selamawit Girma",
    "Yonas Kebede",
    "Bethlehem Tadesse",
    "Ermias Solomon",
    "Meron Tesfaye",
    "Kaleab Wondwossen",
    "Tigist Berhanu",
    "Natnael Getachew",
    "Hanna Fisseha",
    "Samuel Assefa",
    "Lydia Worku",
    "Robel Desta",
    "Abel Kassahun",
    "Mahlet Negash",
  ];

  const tipMessages = [
    "Keep up the amazing open-source work!",
    "Your Next.js tutorial saved me hours of debugging today! ☕",
    "Loved your latest blog post on system architecture.",
    "Proud to support local creators!",
    "Amazing art style, keep shining!",
    "Thanks for the free UI kit, it was super helpful for my project.",
    "Love the lo-fi beats while coding at night.",
    "Great work brother! More power to you.",
    "Small tip to fuel the late night coding sessions!",
    "Your podcast episodes are pure gold.",
    "Inspired by your consistency!",
    "Cheers from Hawassa! Keep creating.",
    "Thank you for teaching our community.",
    "Here is a little contribution towards your new setup!",
  ];

  const paymentMethods = ["Telebirr", "CBE Birr", "Chapa", "Bank Transfer", "Card"];
  const amounts = [50, 100, 150, 200, 300, 500, 1000, 1500, 2000, 3500];

  const now = Date.now();
  let tipIndex = 1;

  // 1. Seed tips for Bonsa (22 tips)
  for (let i = 0; i < 22; i++) {
    const isAnonymous = i % 4 === 0;
    const isFailed = i === 18;
    const isPending = i === 21;
    const status = isFailed ? "FAILED" : isPending ? "PENDING" : "COMPLETED";
    const amount = amounts[i % amounts.length];
    const supporterName = isAnonymous ? "Anonymous" : supporterNames[i % supporterNames.length];
    const message = i % 5 === 4 ? null : tipMessages[i % tipMessages.length];
    const dateOffset = (22 - i) * 1.3 * 24 * 60 * 60 * 1000;
    const createdAt = new Date(now - dateOffset);
    const method = paymentMethods[i % paymentMethods.length];
    const ref = `TJ-MOCK-${Math.floor(100000 + Math.random() * 900000)}-${tipIndex}`;

    const tip = await prisma.tip.create({
      data: {
        recipientId: user1.id,
        senderId: i % 3 === 0 ? user4.id : i % 3 === 1 ? user5.id : null,
        supporterName,
        supporterEmail: isAnonymous ? null : `${supporterName.toLowerCase().replace(/ /g, "")}@example.com`,
        amount,
        currency: "ETB",
        message,
        isAnonymous,
        status,
        goalId: i % 2 === 0 ? bonsaGoal1.id : null,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.payment.create({
      data: {
        tipId: tip.id,
        userId: tip.senderId,
        provider: "MOCK_PAY",
        transactionReference: ref,
        amount,
        currency: "ETB",
        status,
        paymentMethod: method,
        providerMetadata: JSON.stringify({
          supporterName,
          paymentMethod: method,
          simulatedDate: createdAt.toISOString(),
        }),
        createdAt,
        updatedAt: createdAt,
      },
    });

    tipIndex++;
  }

  // 2. Seed tips for Sara (10 tips)
  for (let i = 0; i < 10; i++) {
    const isAnonymous = i % 3 === 0;
    const status = i === 8 ? "FAILED" : "COMPLETED";
    const amount = amounts[(i + 3) % amounts.length];
    const supporterName = isAnonymous ? "Anonymous" : supporterNames[(i + 5) % supporterNames.length];
    const message = tipMessages[(i + 3) % tipMessages.length];
    const dateOffset = (10 - i) * 2.5 * 24 * 60 * 60 * 1000;
    const createdAt = new Date(now - dateOffset);
    const method = paymentMethods[i % paymentMethods.length];
    const ref = `TJ-MOCK-${Math.floor(100000 + Math.random() * 900000)}-${tipIndex}`;

    const tip = await prisma.tip.create({
      data: {
        recipientId: user2.id,
        senderId: i % 2 === 0 ? user1.id : null,
        supporterName,
        supporterEmail: isAnonymous ? null : `${supporterName.toLowerCase().replace(/ /g, "")}@example.com`,
        amount,
        currency: "ETB",
        message,
        isAnonymous,
        status,
        goalId: saraGoal1.id,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.payment.create({
      data: {
        tipId: tip.id,
        userId: tip.senderId,
        provider: "MOCK_PAY",
        transactionReference: ref,
        amount,
        currency: "ETB",
        status,
        paymentMethod: method,
        providerMetadata: JSON.stringify({
          supporterName,
          paymentMethod: method,
        }),
        createdAt,
        updatedAt: createdAt,
      },
    });

    tipIndex++;
  }

  // 3. Seed tips for Abel (8 tips)
  for (let i = 0; i < 8; i++) {
    const isAnonymous = i % 2 === 1;
    const status = "COMPLETED";
    const amount = amounts[(i + 1) % amounts.length];
    const supporterName = isAnonymous ? "Anonymous" : supporterNames[(i + 8) % supporterNames.length];
    const message = tipMessages[(i + 6) % tipMessages.length];
    const dateOffset = (8 - i) * 3 * 24 * 60 * 60 * 1000;
    const createdAt = new Date(now - dateOffset);
    const method = paymentMethods[i % paymentMethods.length];
    const ref = `TJ-MOCK-${Math.floor(100000 + Math.random() * 900000)}-${tipIndex}`;

    const tip = await prisma.tip.create({
      data: {
        recipientId: user3.id,
        senderId: null,
        supporterName,
        supporterEmail: isAnonymous ? null : `${supporterName.toLowerCase().replace(/ /g, "")}@example.com`,
        amount,
        currency: "ETB",
        message,
        isAnonymous,
        status,
        goalId: abelGoal1.id,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.payment.create({
      data: {
        tipId: tip.id,
        provider: "MOCK_PAY",
        transactionReference: ref,
        amount,
        currency: "ETB",
        status,
        paymentMethod: method,
        providerMetadata: JSON.stringify({
          supporterName,
          paymentMethod: method,
        }),
        createdAt,
        updatedAt: createdAt,
      },
    });

    tipIndex++;
  }

  console.log(`✅ Seeded ${tipIndex - 1} Tips and Payments across 3 creators`);
  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
