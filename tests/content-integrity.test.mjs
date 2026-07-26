import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("the complete dessert collection remains intact and unique", () => {
  assert.equal(desserts.length, 45);
  assert.equal(new Set(desserts.map(({ slug }) => slug)).size, desserts.length);
  assert.equal(new Set(desserts.map(({ title }) => title)).size, desserts.length);
  assert.equal(new Set(desserts.map(({ image }) => image)).size, desserts.length);
});

test("every dessert is a complete, usable recipe", () => {
  for (const dessert of desserts) {
    assert.ok(dessert.title && dessert.country && dessert.region && dessert.category);
    assert.ok(dessert.description.length >= 40);
    assert.ok(dessert.ingredients.length >= 5, `${dessert.title} needs more ingredients`);
    assert.ok(dessert.steps.length >= 5, `${dessert.title} needs more steps`);
    assert.ok(dessert.tip && dessert.time && dessert.servings);
    assert.match(dessert.image, /^\/api\/dessert-art\/dessert-/);
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
    "app/api/health/route.ts",
    "app/error.tsx",
    "app/not-found.tsx",
  ]) {
    assert.ok(read(path).length > 200, `${path} should not be empty`);
  }
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
