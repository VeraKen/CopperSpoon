import { dessertBySlug } from "../../../data/desserts";

const palettes = [
  ["#3b211b", "#b95125", "#efbd76", "#fff1d7"],
  ["#26382d", "#667054", "#d9903f", "#fff5df"],
  ["#312641", "#7e526f", "#e2a85d", "#fff1df"],
  ["#173a3d", "#2f7272", "#db8d48", "#fff4d9"],
  ["#493322", "#91613c", "#dca057", "#fff3d8"],
  ["#3a1f29", "#913e55", "#e4a45f", "#fff0dc"],
];

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  }[character] ?? character));

const hashText = (value: string) =>
  [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);

const titleLines = (title: string) => {
  const words = title.split(" ");
  const lines: string[] = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > 22) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 2);
};

function foodIllustration(category: string, accent: string, cream: string, seed: number) {
  const shifted = seed % 52;
  const crumbs = Array.from({ length: 9 }, (_, index) => {
    const x = 360 + ((index * 79 + shifted * 7) % 480);
    const y = 132 + ((index * 53 + shifted * 5) % 250);
    const radius = 5 + ((index + shifted) % 7);
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${accent}" opacity=".7"/>`;
  }).join("");

  const shared = `<ellipse cx="600" cy="486" rx="280" ry="46" fill="#170e0a" opacity=".22"/>${crumbs}`;

  if (category === "Cake") return `${shared}
    <path d="M375 448 535 197h314L825 448Z" fill="${cream}" stroke="#2b1812" stroke-width="12"/>
    <path d="M535 197h314l-27 77H489Z" fill="${accent}"/>
    <path d="M448 341h396l-10 48H419Z" fill="${accent}" opacity=".8"/>
    <path d="M604 197c12-46 62-55 80-8 20-40 68-23 68 8" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round"/>`;
  if (category === "Pastry") return `${shared}
    <path d="M353 420c62-198 193-274 247-274s185 76 247 274c-142 68-352 68-494 0Z" fill="${accent}" stroke="#2b1812" stroke-width="12"/>
    <path d="M405 373c124 42 266 42 390 0M443 309c102 34 212 34 314 0M489 246c73 22 149 22 222 0" fill="none" stroke="${cream}" stroke-width="18" stroke-linecap="round"/>
    <path d="m549 161 51-42 51 42" fill="none" stroke="${cream}" stroke-width="14" stroke-linecap="round"/>`;
  if (category === "Pudding") return `${shared}
    <path d="M383 285h434l-56 174c-12 37-47 62-86 62H525c-39 0-74-25-86-62Z" fill="${cream}" stroke="#2b1812" stroke-width="12"/>
    <ellipse cx="600" cy="286" rx="217" ry="66" fill="${accent}" stroke="#2b1812" stroke-width="12"/>
    <path d="M495 274c25-59 70-48 101-12 32-54 90-49 114 8" fill="none" stroke="#fff" stroke-width="25" stroke-linecap="round"/>
    <circle cx="${575 + shifted}" cy="213" r="24" fill="#b95125"/>`;
  if (category === "Fried") return `${shared}
    <path d="M384 401c33-115 399-115 432 0l-60 103H444Z" fill="${cream}" stroke="#2b1812" stroke-width="12"/>
    ${Array.from({ length: 8 }, (_, index) => {
      const x = 454 + (index % 4) * 98 + ((index * shifted) % 18);
      const y = 275 + Math.floor(index / 4) * 92 + ((index * 11) % 20);
      return `<circle cx="${x}" cy="${y}" r="${47 + (index % 3) * 5}" fill="${accent}" stroke="#2b1812" stroke-width="9"/><path d="m${x - 18} ${y} 12 13 28-30" fill="none" stroke="${cream}" stroke-width="9" stroke-linecap="round"/>`;
    }).join("")}`;
  if (category === "Frozen") return `${shared}
    <path d="m517 317 83 222 83-222Z" fill="#d9903f" stroke="#2b1812" stroke-width="12"/>
    <path d="m548 389 102 0m-84 49 65 0m-46 52 28 0" stroke="${cream}" stroke-width="9"/>
    <circle cx="537" cy="288" r="94" fill="${accent}" stroke="#2b1812" stroke-width="12"/>
    <circle cx="654" cy="285" r="102" fill="${cream}" stroke="#2b1812" stroke-width="12"/>
    <circle cx="605" cy="206" r="89" fill="${accent}" stroke="#2b1812" stroke-width="12"/>`;
  return `${shared}
    <path d="M391 445c35-156 383-156 418 0l-59 72H450Z" fill="${cream}" stroke="#2b1812" stroke-width="12"/>
    ${Array.from({ length: 9 }, (_, index) => {
      const x = 463 + (index % 3) * 136 + ((index + shifted) % 13);
      const y = 240 + Math.floor(index / 3) * 93;
      const rotate = (index * 17 + shifted) % 40;
      return `<rect x="${x - 42}" y="${y - 33}" width="84" height="66" rx="${16 + index % 3 * 8}" fill="${index % 2 ? cream : accent}" stroke="#2b1812" stroke-width="9" transform="rotate(${rotate - 20} ${x} ${y})"/>`;
    }).join("")}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const dessert = dessertBySlug(slug);
  if (!dessert) return new Response("Dessert artwork not found", { status: 404 });

  const seed = hashText(dessert.slug);
  const [deep, base, accent, cream] = palettes[seed % palettes.length];
  const lines = titleLines(dessert.title);
  const title = lines.map((line, index) =>
    `<text x="72" y="${650 + index * 58}" fill="${cream}" font-family="Georgia, serif" font-size="51" font-weight="600">${escapeXml(line)}</text>`,
  ).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title description">
    <title id="title">${escapeXml(dessert.title)}</title>
    <desc id="description">Original Copper Spoon illustration for ${escapeXml(dessert.title)} from ${escapeXml(dessert.country)}.</desc>
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${base}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
      <pattern id="pattern" width="54" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(${seed % 60})"><path d="M0 27h54M27 0v54" stroke="${cream}" stroke-opacity=".075" stroke-width="2"/></pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#background)"/>
    <rect width="1200" height="800" fill="url(#pattern)"/>
    <circle cx="600" cy="300" r="265" fill="${cream}" opacity=".12"/>
    <circle cx="600" cy="300" r="215" fill="none" stroke="${cream}" stroke-opacity=".28" stroke-width="2"/>
    ${foodIllustration(dessert.category, accent, cream, seed)}
    <path d="M0 570h1200v230H0z" fill="${deep}" opacity=".96"/>
    <text x="72" y="614" fill="${accent}" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="5">${escapeXml(dessert.country.toUpperCase())} · ${escapeXml(dessert.category.toUpperCase())}</text>
    ${title}
    <g transform="translate(1015 650)"><circle cx="62" cy="62" r="58" fill="${accent}"/><text x="62" y="76" text-anchor="middle" fill="${deep}" font-family="Georgia, serif" font-size="32" font-weight="700">CS</text></g>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}
