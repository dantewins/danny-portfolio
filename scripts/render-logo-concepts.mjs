import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const conceptsDir = path.join(root, "public", "brand", "concepts");
const outputDir = path.join(root, "public", "brand");

const concepts = [
  ["01-live-wire.svg", "01", "LIVE WIRE", "Personal · playful · most site-specific"],
  ["02-forward-loop.svg", "02", "FORWARD LOOP", "Bold · technical · strongest favicon"],
  ["03-editorial-cursor.svg", "03", "EDITORIAL CURSOR", "Warm · distinctive · type-led"],
  ["04-florida-horizon.svg", "04", "FLORIDA HORIZON", "Optimistic · grounded · place-based"],
  ["05-ink-draft.svg", "05", "INK DRAFT", "Expressive · human · hero-inspired"],
  ["06-modular-d.svg", "06", "MODULAR D", "Clean · adaptable · component-built"],
];

const width = 1600;
const height = 1320;
const cardWidth = 724;
const cardHeight = 330;
const marginX = 60;
const gapX = 32;
const gapY = 28;
const top = 196;

await mkdir(outputDir, { recursive: true });

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const svgText = ({ width: w, height: h, content }) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>`);

const base = await sharp({
  create: { width, height, channels: 4, background: "#F4F4F5" },
})
  .png()
  .toBuffer();

const overlays = [
  {
    input: svgText({
      width,
      height: 180,
      content: `
        <text x="60" y="74" fill="#18181B" font-family="Arial, sans-serif" font-size="52" font-weight="700" letter-spacing="-2">Logo directions for Danny Kim</text>
        <text x="62" y="116" fill="#71717A" font-family="Arial, sans-serif" font-size="21">Six vector concepts shaped around the portfolio's editorial, monochrome style.</text>
        <text x="62" y="151" fill="#4F46E5" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="1.8">LOCKUP + 32PX READABILITY TEST</text>
      `,
    }),
    left: 0,
    top: 0,
  },
];

for (let index = 0; index < concepts.length; index += 1) {
  const [file, number, name, description] = concepts[index];
  const column = index % 2;
  const row = Math.floor(index / 2);
  const x = marginX + column * (cardWidth + gapX);
  const y = top + row * (cardHeight + gapY);
  const source = await readFile(path.join(conceptsDir, file));

  const logo = await sharp(source)
    .resize({ width: 560, height: 168, fit: "contain" })
    .png()
    .toBuffer();

  const mini = await sharp(source)
    .extract({ left: 0, top: 0, width: 144, height: 144 })
    .resize(64, 64, { fit: "contain" })
    .png()
    .toBuffer();

  overlays.push(
    {
      input: svgText({
        width: cardWidth,
        height: cardHeight,
        content: `
          <rect width="${cardWidth}" height="${cardHeight}" rx="28" fill="white"/>
          <text x="34" y="45" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="2">${number}</text>
          <text x="74" y="45" fill="#18181B" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.5">${escapeXml(name)}</text>
          <text x="34" y="290" fill="#71717A" font-family="Arial, sans-serif" font-size="17">${escapeXml(description)}</text>
          <rect x="624" y="110" width="72" height="72" rx="18" fill="#F4F4F5"/>
          <text x="637" y="203" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">SMALL</text>
        `,
      }),
      left: x,
      top: y,
    },
    { input: logo, left: x + 28, top: y + 74 },
    { input: mini, left: x + 628, top: y + 114 },
  );
}

overlays.push({
  input: svgText({
    width,
    height: 72,
    content: `<text x="60" y="42" fill="#52525B" font-family="Arial, sans-serif" font-size="18">Pick a number, or mix parts — for example: mark 01 with the typography from 03.</text>`,
  }),
  left: 0,
  top: 1242,
});

await sharp(base)
  .composite(overlays)
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputDir, "logo-concepts.png"));

console.log(path.join(outputDir, "logo-concepts.png"));
