import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { bunni } from "../lib/projects/data/bunni";
import { expounder } from "../lib/projects/data/expounder";
import { huracan } from "../lib/projects/data/huracan";
import { scioly } from "../lib/projects/data/scioly";
import { swordle } from "../lib/projects/data/swordle";
import type { CaseSection, Project } from "../lib/projects/types";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

// Same order as the old static array, which drove the homepage list and the
// circular next-project link.
const projects: Project[] = [swordle, scioly, huracan, bunni, expounder];

/** Splits a section into its row columns and its variant-specific payload. */
function toSectionRow(section: CaseSection, order: number) {
  const { id, nav, title, ...rest } = section;
  const withKind = rest as Record<string, unknown> & { kind?: string };
  const kind = withKind.kind ?? "prose";
  const data = { ...withKind };
  delete data.kind;

  return {
    order,
    kind,
    anchor: id,
    nav,
    title,
    data: data as object,
  };
}

async function main() {
  for (const [index, project] of projects.entries()) {
    const payload = {
      title: project.title,
      category: project.category,
      shortDescription: project.shortDescription,
      dek: project.dek,
      role: project.role,
      publishedLabel: project.published,
      icon: project.icon,
      stack: project.stack,
      repository: project.repository ?? null,
      live: project.live ?? null,
      heroSrc: project.hero.src,
      heroAlt: project.hero.alt,
      heroWidth: project.hero.width,
      heroHeight: project.hero.height,
      flow: project.flow,
      takeaway: project.takeaway,
      order: index,
    };

    // Upsert by slug so re-running the seed refreshes content rather than
    // duplicating it. Sections are replaced wholesale to honour reordering.
    const caseStudy = await prisma.caseStudy.upsert({
      where: { slug: project.slug },
      create: { slug: project.slug, ...payload },
      update: payload,
    });

    await prisma.caseSection.deleteMany({
      where: { caseStudyId: caseStudy.id },
    });

    await prisma.caseSection.createMany({
      data: project.sections.map((section, order) => ({
        caseStudyId: caseStudy.id,
        ...toSectionRow(section, order),
      })),
    });

    console.log(
      `seeded ${project.slug} (${project.sections.length} sections)`,
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
