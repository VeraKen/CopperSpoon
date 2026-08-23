import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

function loadTypeScriptModule(path) {
  const output = ts.transpileModule(read(path), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  Function("exports", "module", output)(module.exports, module);
  return module.exports;
}

const { desserts } = loadTypeScriptModule("app/data/desserts.ts");
const {
  buildGroceryList,
  formatTimer,
  getPantryMatches,
  parseStepDuration,
  scaleIngredient,
} = loadTypeScriptModule("app/lib/kitchen.ts");

test("the complete dessert collection remains intact", () => {
  assert.equal(desserts.length, 45);
  assert.equal(new Set(desserts.map(({ slug }) => slug)).size, desserts.length);
  assert.equal(new Set(desserts.map(({ title }) => title)).size, desserts.length);
});

test("every dessert is a complete, usable recipe", () => {
  for (const dessert of desserts) {
    assert.ok(dessert.title && dessert.country && dessert.region && dessert.category);
    assert.ok(dessert.description.length >= 40);
    assert.ok(dessert.ingredients.length >= 5, `${dessert.title} needs more ingredients`);
    assert.ok(dessert.steps.length >= 5, `${dessert.title} needs more steps`);
    assert.ok(dessert.tip && dessert.time && dessert.servings);
    assert.match(dessert.image, /^https:\/\/images\.unsplash\.com\/photo-/);
  }
});

test("all dessert recipe pages are statically discoverable", () => {
  const route = read("app/recipes/[slug]/page.tsx");
  assert.match(route, /\.\.\.desserts/);
  assert.match(route, /dessertBySlug/);
  assert.match(route, /generateStaticParams/);
});

test("the responsive menu exposes keyboard and screen-reader controls", () => {
  const header = read("app/components/site-header.tsx");
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls/);
  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /aria-label="Mobile navigation"/);
});

test("quality and recovery routes stay present", () => {
  for (const path of [
    "app/project-story/page.tsx",
    "app/kitchen/page.tsx",
    "app/api/health/route.ts",
    "app/error.tsx",
    "app/not-found.tsx",
    "app/offline/page.tsx",
    "public/sw.js",
  ]) {
    assert.ok(read(path).length > 200, `${path} should not be empty`);
  }
});

test("pantry matching ranks recipes by ingredients a cook already owns", () => {
  const sample = [
    {
      slug: "jollof",
      title: "Jollof Rice",
      ingredients: ["Rice", "Tomatoes", "Onion", "Chicken stock"],
    },
    {
      slug: "cake",
      title: "Cake",
      ingredients: ["Flour", "Sugar", "Eggs", "Butter"],
    },
  ];
  const matches = getPantryMatches(sample, ["rice", "tomato", "onions"]);
  assert.equal(matches[0].recipe.slug, "jollof");
  assert.equal(matches[0].matched.length, 3);
  assert.ok(matches[0].score > 60);
});

test("Cook Mode scales common quantities and recognises step timers", () => {
  assert.equal(scaleIngredient("500g chicken", 2), "1000g chicken");
  assert.equal(scaleIngredient("½ teaspoon cumin", 2), "1 teaspoon cumin");
  assert.equal(scaleIngredient("1 ½ cups rice", 2), "3 cups rice");
  assert.equal(scaleIngredient("1½ teaspoons cinnamon", 2), "3 teaspoons cinnamon");
  assert.equal(parseStepDuration("Simmer for 12–15 minutes."), 900);
  assert.equal(parseStepDuration("Rest for 2 hours."), 7200);
  assert.equal(formatTimer(905), "15:05");
});

test("weekly plans produce one deduplicated shopping list", () => {
  const recipes = [
    { slug: "one", title: "One", ingredients: ["1 onion", "2 tomatoes"] },
    { slug: "two", title: "Two", ingredients: ["1 onion", "500g rice"] },
  ];
  const list = buildGroceryList({ Monday: "one", Tuesday: "two" }, recipes);
  assert.equal(list.length, 3);
  assert.equal(list.filter((item) => item.ingredient.includes("onion")).length, 1);
});

test("guided cooking includes accessible controls and browser-native assistance", () => {
  const cookMode = read("app/components/cooking-studio.tsx");
  assert.match(cookMode, /role="dialog"/);
  assert.match(cookMode, /aria-modal="true"/);
  assert.match(cookMode, /speechSynthesis/);
  assert.match(cookMode, /wakeLock/);
  assert.match(cookMode, /event\.key === "Escape"/);
});

test("public collection labels use All instead of exposing the item limit", () => {
  const publicFiles = [
    "app/page.tsx",
    "app/layout.tsx",
    "app/desserts/page.tsx",
    "app/components/site-header.tsx",
    "app/project-story/page.tsx",
  ];
  const visitorFacingPhrases = ["45 desserts", "View all 45", "of 45 recipes", "Discover 45"];
  for (const path of publicFiles) {
    const source = read(path);
    for (const phrase of visitorFacingPhrases) {
      assert.ok(!source.includes(phrase), `${path} exposes “${phrase}” in visible copy`);
    }
  }
});


test("the first 45 cooking lessons have matching video assets", () => {
  const recipeSource = read("app/data/recipes.ts");
  const videoSource = read("app/videos/page.tsx");
  assert.match(recipeSource, /export const recipes/);
  assert.match(videoSource, /const videoLessons=recipes\.slice\(0,45\)/);
  const videoFiles = new Set(
    readdirSync(new URL("../public/videos", import.meta.url))
      .filter((name) => name.endsWith(".mp4"))
      .map((name) => name.slice(0, -4)),
  );
  const slugMatches = [...recipeSource.matchAll(/slug:"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(slugMatches.length >= 45);
  assert.equal(
    slugMatches.slice(0, 45).filter((slug) => !videoFiles.has(slug)).length,
    0,
    "Every displayed video lesson needs a matching public MP4 file",
  );
});
