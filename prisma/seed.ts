// import { PrismaClient } from

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, ProductType, ProductStatus, ContentStatus } from "@/app/generated/prisma/client";


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Fiyma Designs collections...');

  // 1. Seed Collections
  const corporateCollection = await prisma.collection.upsert({
    where: { slug: 'corporate' },
    update: {},
    create: {
      name: 'Corporate',
      slug: 'corporate',
      headline: 'Executive Elegance & Power Dressing',
      description: 'Sophisticated tailored silhouettes designed for the modern professional woman.',
      sortOrder: 1,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
  });

  const asoEbiCollection = await prisma.collection.upsert({
    where: { slug: 'aso-ebi' },
    update: {},
    create: {
      name: 'Aso Ebi',
      slug: 'aso-ebi',
      headline: 'Ceremonial Splendor & Heritage',
      description: 'Exquisite, statement-making styles curated for grand celebrations and group events.',
      sortOrder: 2,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
  });

  const casualCollection = await prisma.collection.upsert({
    where: { slug: 'casual' },
    update: {},
    create: {
      name: 'Casual',
      slug: 'casual',
      headline: 'Effortless Luxury for Everyday',
      description: 'Refined relaxed pieces crafted with premium breathable fabrics.',
      sortOrder: 3,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
  });

  // 2. Seed a sample test product under Corporate
  const sampleProduct = await prisma.product.upsert({
    where: { slug: 'executive-silk-blazer' },
    update: {},
    create: {
      name: 'Executive Silk Blazer',
      slug: 'executive-silk-blazer',
      sku: 'FYM-CORP-001',
      description: 'A masterclass in precision tailoring featuring structured shoulders and luxury silk lining.',
      shortDescription: 'Tailored executive silk blazer.',
      type: ProductType.MADE_TO_ORDER,
      status: ProductStatus.ACTIVE,
      basePrice: 125000.00, // NGN
      currency: 'NGN',
      fabric: '100% Pure Raw Silk',
      careInstructions: 'Dry clean only.',
      leadTimeDays: 7,
      featured: true,
      collections: {
        create: [
          {
            collectionId: corporateCollection.id,
            sortOrder: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log({
    corporateCollectionId: corporateCollection.id,
    asoEbiCollectionId: asoEbiCollection.id,
    casualCollectionId: casualCollection.id,
    sampleProductId: sampleProduct.id,
  });
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });