/**
 * Adds placeholder hero slides to one case study so the carousel can be seen.
 * The copy here is descriptive scaffolding, not authored content — replace it,
 * and the screenshots, from the admin.
 *
 * Run with: npx tsx scripts/demo-slides.ts <slug>
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const slides = [
  {
    order: 0,
    eyebrow: "The pitch",
    headline: "One workspace, a whole *season*",
    subhead: "Registration, rosters, hours and dues in a single place.",
    imageSrc: "/work/scioly/landing.svg",
    imageAlt: "Scioly landing page with a dark dashboard preview",
    imageWidth: 1440,
    imageHeight: 930,
    theme: "ink",
    layout: "left",
  },
  {
    order: 1,
    eyebrow: "Operations",
    headline: "Breadth is the *feature*",
    subhead:
      "Every area is somewhere authority has to be delegated differently.",
    imageSrc: "/work/scioly/features.svg",
    imageAlt: "Scioly feature overview showing rosters, hours and competitions",
    imageWidth: 1440,
    imageHeight: 930,
    theme: "light",
    layout: "right",
  },
  {
    order: 2,
    eyebrow: "Onboarding",
    headline: "The domain draws the *boundary*",
    subhead: "A club registers against a school domain; membership follows it.",
    imageSrc: "/work/scioly/register.svg",
    imageAlt: "Scioly registration flow collecting club and school domain",
    imageWidth: 1280,
    imageHeight: 720,
    theme: "ink",
    layout: "overlay",
  },
];

async function main() {
  const slug = process.argv[2] ?? "scioly";
  const caseStudy = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!caseStudy) throw new Error(`no case study with slug "${slug}"`);

  await prisma.caseSlide.deleteMany({ where: { caseStudyId: caseStudy.id } });
  await prisma.caseSlide.createMany({
    data: slides.map((slide) => ({ ...slide, caseStudyId: caseStudy.id })),
  });

  const count = await prisma.caseSlide.count({
    where: { caseStudyId: caseStudy.id },
  });
  console.log(`${slug} slides: ${count}`);

  const icons = await prisma.caseStudy.findMany({
    select: { slug: true, icon: true },
  });
  console.log(icons.map((i) => `${i.slug}=${i.icon}`).join(" "));
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
