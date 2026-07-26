import type { Recipe } from "../data/recipes";

export type KitchenRecipe = Pick<
  Recipe,
  "slug" | "title" | "cuisine" | "country" | "flag" | "image" | "time" | "difficulty" | "servings" | "description" | "ingredients" | "steps" | "tip"
>;

export type PantryMatch = {
  recipe: KitchenRecipe;
  matched: string[];
  missing: string[];
  score: number;
};

export type CookedRecipe = {
  slug: string;
  title: string;
  country: string;
  flag: string;
  cookedAt: string;
};

export type KitchenState = {
  pantry: string[];
  saved: string[];
  plan: Record<string, string>;
  cooked: CookedRecipe[];
  checkedGroceries: string[];
};

export const kitchenStorageKey = "copper-spoon-kitchen-v2";

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const emptyKitchenState: KitchenState = {
  pantry: [],
  saved: [],
  plan: {},
  cooked: [],
  checkedGroceries: [],
};

const unicodeFractions: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

const quantityPattern = /^((?:\d+\s*)?[¼½¾⅓⅔⅛⅜⅝⅞]|\d+(?:\.\d+)?)(?=\s|[a-zA-Z])/;

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const singularise = (value: string) => {
  if (value.endsWith("ies") && value.length > 4) return `${value.slice(0, -3)}y`;
  if (value.endsWith("oes") && value.length > 4) return value.slice(0, -2);
  if (value.endsWith("es") && value.length > 4) return value.slice(0, -2);
  if (value.endsWith("s") && value.length > 3) return value.slice(0, -1);
  return value;
};

const comparable = (value: string) =>
  normalise(value)
    .split(" ")
    .map(singularise)
    .join(" ");

export function cleanPantryItem(value: string) {
  return normalise(value).slice(0, 40);
}

export function getPantryMatches(
  allRecipes: KitchenRecipe[],
  pantry: string[],
  limit = 12,
): PantryMatch[] {
  const cleanItems = [...new Set(pantry.map(cleanPantryItem).filter(Boolean))];
  if (!cleanItems.length) return [];

  return allRecipes
    .map((recipe) => {
      const ingredients = recipe.ingredients.map(comparable);
      const matched = cleanItems.filter((item) => {
        const needle = comparable(item);
        return ingredients.some((ingredient) =>
          ingredient.includes(needle) || needle.includes(ingredient),
        );
      });
      const missing = recipe.ingredients.filter((ingredient) => {
        const haystack = comparable(ingredient);
        return !cleanItems.some((item) => {
          const needle = comparable(item);
          return haystack.includes(needle) || needle.includes(haystack);
        });
      });
      const coverage = matched.length / cleanItems.length;
      const recipeCoverage = matched.length / Math.max(recipe.ingredients.length, 1);
      return {
        recipe,
        matched,
        missing,
        score: Math.round((coverage * 0.72 + recipeCoverage * 0.28) * 100),
      };
    })
    .filter((match) => match.matched.length > 0)
    .sort((a, b) =>
      b.matched.length - a.matched.length ||
      b.score - a.score ||
      a.recipe.title.localeCompare(b.recipe.title),
    )
    .slice(0, limit);
}

function parseQuantity(raw: string) {
  const compact = raw.trim();
  if (unicodeFractions[compact]) return unicodeFractions[compact];
  const mixed = compact.match(/^(\d+)\s*([¼½¾⅓⅔⅛⅜⅝⅞])$/);
  if (mixed) return Number(mixed[1]) + unicodeFractions[mixed[2]];
  return Number(compact);
}

function displayQuantity(value: number) {
  const rounded = Math.round(value * 24) / 24;
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const fractionEntries: Array<[number, string]> = [
    [0.125, "⅛"],
    [0.25, "¼"],
    [1 / 3, "⅓"],
    [0.375, "⅜"],
    [0.5, "½"],
    [0.625, "⅝"],
    [2 / 3, "⅔"],
    [0.75, "¾"],
    [0.875, "⅞"],
  ];
  const closest = fractionEntries.find(([number]) => Math.abs(fraction - number) < 0.025);
  if (closest) return `${whole || ""}${closest[1]}`;
  if (Math.abs(fraction) < 0.025) return String(whole);
  return String(Math.round(rounded * 100) / 100);
}

export function scaleIngredient(ingredient: string, multiplier: number) {
  if (!Number.isFinite(multiplier) || multiplier <= 0 || multiplier === 1) return ingredient;
  const match = ingredient.match(quantityPattern);
  if (!match) return ingredient;
  const rawQuantity = match[1].trim();
  const quantity = parseQuantity(rawQuantity);
  if (!Number.isFinite(quantity)) return ingredient;
  return ingredient.replace(rawQuantity, displayQuantity(quantity * multiplier));
}

export function parseStepDuration(step: string) {
  const match = step.match(/(\d+)(?:\s*[–-]\s*(\d+))?\s*(minutes?|mins?|hours?|hrs?)/i);
  if (!match) return null;
  const amount = Number(match[2] || match[1]);
  const isHours = /^h/i.test(match[3]);
  return amount * (isHours ? 60 * 60 : 60);
}

export function formatTimer(totalSeconds: number) {
  const safe = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function buildGroceryList(
  plan: Record<string, string>,
  recipes: KitchenRecipe[],
) {
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]));
  const seen = new Set<string>();
  const list: Array<{ id: string; ingredient: string; recipe: string }> = [];
  for (const day of weekDays) {
    const recipe = bySlug.get(plan[day]);
    if (!recipe) continue;
    for (const ingredient of recipe.ingredients) {
      const key = normalise(ingredient);
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ id: key, ingredient, recipe: recipe.title });
    }
  }
  return list;
}
