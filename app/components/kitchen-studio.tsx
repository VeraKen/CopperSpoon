"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  buildGroceryList,
  cleanPantryItem,
  emptyKitchenState,
  getPantryMatches,
  kitchenStorageKey,
  type KitchenRecipe,
  type KitchenState,
  weekDays,
} from "../lib/kitchen";

type KitchenTab = "pantry" | "planner" | "saved" | "passport";

const pantrySuggestions = [
  "chicken",
  "rice",
  "tomatoes",
  "onion",
  "garlic",
  "coconut milk",
  "eggs",
  "potatoes",
  "flour",
  "chocolate",
];

function readKitchenState(): KitchenState {
  try {
    const parsed = JSON.parse(localStorage.getItem(kitchenStorageKey) || "{}");
    return {
      pantry: Array.isArray(parsed.pantry) ? parsed.pantry.slice(0, 30) : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved.slice(0, 100) : [],
      plan: parsed.plan && typeof parsed.plan === "object" ? parsed.plan : {},
      cooked: Array.isArray(parsed.cooked) ? parsed.cooked.slice(0, 200) : [],
      checkedGroceries: Array.isArray(parsed.checkedGroceries)
        ? parsed.checkedGroceries.slice(0, 300)
        : [],
    };
  } catch {
    return emptyKitchenState;
  }
}

export default function KitchenStudio({ recipes }: { recipes: KitchenRecipe[] }) {
  const [state, setState] = useState<KitchenState>(emptyKitchenState);
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<KitchenTab>("pantry");
  const [pantryInput, setPantryInput] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setState(readKitchenState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(kitchenStorageKey, JSON.stringify(state));
  }, [ready, state]);

  const bySlug = useMemo(
    () => new Map(recipes.map((recipe) => [recipe.slug, recipe])),
    [recipes],
  );
  const matches = useMemo(
    () => getPantryMatches(recipes, state.pantry),
    [recipes, state.pantry],
  );
  const savedRecipes = useMemo(
    () => state.saved.map((slug) => bySlug.get(slug)).filter(Boolean) as KitchenRecipe[],
    [bySlug, state.saved],
  );
  const groceries = useMemo(
    () => buildGroceryList(state.plan, recipes),
    [recipes, state.plan],
  );
  const cookedCountries = useMemo(() => {
    const latest = new Map<string, KitchenState["cooked"][number]>();
    for (const item of state.cooked) latest.set(item.country, item);
    return [...latest.values()].sort((a, b) => a.country.localeCompare(b.country));
  }, [state.cooked]);
  const plannedCount = Object.values(state.plan).filter(Boolean).length;

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function addPantryItems(event?: FormEvent) {
    event?.preventDefault();
    const additions = pantryInput
      .split(",")
      .map(cleanPantryItem)
      .filter(Boolean);
    if (!additions.length) return;
    setState((current) => ({
      ...current,
      pantry: [...new Set([...current.pantry, ...additions])].slice(0, 30),
    }));
    setPantryInput("");
  }

  function addSuggestedItem(item: string) {
    setState((current) => ({
      ...current,
      pantry: current.pantry.includes(item)
        ? current.pantry
        : [...current.pantry, item].slice(0, 30),
    }));
  }

  function toggleSaved(slug: string) {
    setState((current) => ({
      ...current,
      saved: current.saved.includes(slug)
        ? current.saved.filter((item) => item !== slug)
        : [...current.saved, slug],
    }));
  }

  function addToNextDay(slug: string) {
    const day = weekDays.find((item) => !state.plan[item]) || weekDays[0];
    setState((current) => ({
      ...current,
      plan: { ...current.plan, [day]: slug },
    }));
    setActiveTab("planner");
    showNotice(`${bySlug.get(slug)?.title || "Recipe"} added to ${day}.`);
  }

  function updatePlan(day: string, slug: string) {
    setState((current) => ({
      ...current,
      plan: { ...current.plan, [day]: slug },
      checkedGroceries: [],
    }));
  }

  function toggleGrocery(id: string) {
    setState((current) => ({
      ...current,
      checkedGroceries: current.checkedGroceries.includes(id)
        ? current.checkedGroceries.filter((item) => item !== id)
        : [...current.checkedGroceries, id],
    }));
  }

  async function copyGroceries() {
    const text = groceries
      .map((item) => `${state.checkedGroceries.includes(item.id) ? "✓" : "□"} ${item.ingredient}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(`The Copper Spoon shopping list\n\n${text}`);
      showNotice("Shopping list copied.");
    } catch {
      showNotice("Select Print list to save or print your shopping list.");
    }
  }

  const recipeOptions = [...recipes].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="kitchen-studio">
      {notice && <div className="kitchen-toast" role="status">{notice}</div>}

      <section className="kitchen-hero">
        <div>
          <p className="eyebrow light">Your personal cooking workspace</p>
          <h1>Plan less.<br /><em>Cook with confidence.</em></h1>
          <p>Add what is already in your kitchen, discover your strongest recipe matches, plan the week and let Copper Spoon build the shopping list.</p>
          <div className="kitchen-hero-actions">
            <button className="button" type="button" onClick={() => {
              setActiveTab("pantry");
              document.querySelector(".kitchen-workspace")?.scrollIntoView({ behavior: "smooth" });
            }}>Match my pantry →</button>
            <a className="kitchen-light-link" href="/cuisines">Browse every cuisine</a>
          </div>
        </div>
        <aside className="kitchen-live-board" aria-label="My Kitchen summary">
          <p>My Kitchen today</p>
          <div><strong>{state.pantry.length}</strong><span>pantry ingredients</span></div>
          <div><strong>{plannedCount}</strong><span>meals planned</span></div>
          <div><strong>{state.saved.length}</strong><span>recipes saved</span></div>
          <div><strong>{cookedCountries.length}</strong><span>countries cooked</span></div>
          <small>Stored privately on this device · Works without an account</small>
        </aside>
      </section>

      <section className="kitchen-workspace">
        <div className="kitchen-tabs" role="tablist" aria-label="My Kitchen tools">
          {([
            ["pantry", "Pantry Match", "⌕"],
            ["planner", "Week Planner", "▦"],
            ["saved", "Saved Recipes", "♡"],
            ["passport", "Flavour Passport", "◎"],
          ] as const).map(([id, label, icon]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`kitchen-tab-${id}`}
              aria-controls={`kitchen-panel-${id}`}
              aria-selected={activeTab === id}
              className={activeTab === id ? "active" : ""}
              onClick={() => setActiveTab(id)}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>

        {activeTab === "pantry" && (
          <div className="kitchen-panel" id="kitchen-panel-pantry" role="tabpanel" aria-labelledby="kitchen-tab-pantry">
            <div className="kitchen-section-heading">
              <div><p className="eyebrow">Cook with what you have</p><h2>Your pantry, matched.</h2></div>
              <p>Enter ingredients one at a time or separate them with commas. Your matches update instantly.</p>
            </div>
            <form className="pantry-entry" onSubmit={addPantryItems}>
              <label htmlFor="pantry-item">What is in your kitchen?</label>
              <div><input id="pantry-item" value={pantryInput} onChange={(event) => setPantryInput(event.target.value)} placeholder="Try chicken, rice, tomatoes…" maxLength={180}/><button type="submit">Add ingredients</button></div>
            </form>
            <div className="pantry-suggestions" aria-label="Ingredient suggestions">
              {pantrySuggestions.map((item) => <button type="button" key={item} onClick={() => addSuggestedItem(item)} disabled={state.pantry.includes(item)}>+ {item}</button>)}
            </div>
            {state.pantry.length > 0 && <div className="pantry-chips">{state.pantry.map((item) => <span key={item}>{item}<button type="button" onClick={() => setState((current) => ({ ...current, pantry: current.pantry.filter((entry) => entry !== item) }))} aria-label={`Remove ${item}`}>×</button></span>)}<button className="clear-pantry" type="button" onClick={() => setState((current) => ({ ...current, pantry: [] }))}>Clear pantry</button></div>}

            {!state.pantry.length ? (
              <div className="kitchen-empty"><span>🥕</span><h3>Add your first ingredient.</h3><p>We will compare it with every recipe and show what you can cook.</p></div>
            ) : matches.length ? (
              <div className="pantry-results">
                <div className="pantry-results-title"><h3>Best matches for your kitchen</h3><span>{matches.length} useful ideas</span></div>
                <div className="smart-recipe-grid">
                  {matches.map(({ recipe, matched, missing, score }) => (
                    <article className="smart-recipe-card" key={recipe.slug}>
                      <a href={`/recipes/${recipe.slug}`} className="smart-recipe-photo"><img src={recipe.image} alt=""/><span>{score}% match</span></a>
                      <div>
                        <small>{recipe.flag} {recipe.cuisine} · {recipe.time}</small>
                        <h3><a href={`/recipes/${recipe.slug}`}>{recipe.title}</a></h3>
                        <p><b>You have:</b> {matched.join(", ")}</p>
                        <p><b>Still needed:</b> {missing.slice(0, 3).join(", ")}{missing.length > 3 ? ` +${missing.length - 3} more` : ""}</p>
                        <div className="smart-card-actions"><button type="button" onClick={() => toggleSaved(recipe.slug)}>{state.saved.includes(recipe.slug) ? "♥ Saved" : "♡ Save"}</button><button type="button" onClick={() => addToNextDay(recipe.slug)}>Plan it →</button></div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="kitchen-empty"><span>🥄</span><h3>No close match yet.</h3><p>Add another main ingredient or browse all cuisines for inspiration.</p></div>
            )}
          </div>
        )}

        {activeTab === "planner" && (
          <div className="kitchen-panel" id="kitchen-panel-planner" role="tabpanel" aria-labelledby="kitchen-tab-planner">
            <div className="kitchen-section-heading">
              <div><p className="eyebrow">Seven calm decisions</p><h2>Your week at a glance.</h2></div>
              <p>Choose one recipe for each day. Your combined shopping list appears automatically.</p>
            </div>
            <div className="week-planner">
              {weekDays.map((day, index) => {
                const selected = bySlug.get(state.plan[day]);
                return <article className={selected ? "planned" : ""} key={day}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><small>{day}</small>{selected ? <><h3>{selected.title}</h3><p>{selected.flag} {selected.cuisine} · {selected.time}</p></> : <><h3>Choose a meal</h3><p>Leave room for a new discovery.</p></>}</div>
                  <label><span className="sr-only">Recipe for {day}</span><select value={state.plan[day] || ""} onChange={(event) => updatePlan(day, event.target.value)}><option value="">No meal selected</option>{recipeOptions.map((recipe) => <option value={recipe.slug} key={recipe.slug}>{recipe.title} — {recipe.cuisine}</option>)}</select></label>
                </article>;
              })}
            </div>
            <div className="shopping-board">
              <div className="shopping-board-head"><div><p className="eyebrow light">Built from your plan</p><h2>Smart shopping list</h2></div><div><button type="button" onClick={copyGroceries} disabled={!groceries.length}>Copy list</button><button type="button" onClick={() => window.print()} disabled={!groceries.length}>Print list</button></div></div>
              {groceries.length ? <ul>{groceries.map((item) => <li className={state.checkedGroceries.includes(item.id) ? "checked" : ""} key={item.id}><label><input type="checkbox" checked={state.checkedGroceries.includes(item.id)} onChange={() => toggleGrocery(item.id)}/><span>{item.ingredient}</span></label><small>{item.recipe}</small></li>)}</ul> : <p className="shopping-empty">Plan at least one meal and your ingredients will gather here.</p>}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="kitchen-panel" id="kitchen-panel-saved" role="tabpanel" aria-labelledby="kitchen-tab-saved">
            <div className="kitchen-section-heading">
              <div><p className="eyebrow">Your favourites</p><h2>Recipes worth returning to.</h2></div>
              <p>Save any recipe from Cook Mode or your pantry results. Everything stays on this device.</p>
            </div>
            {savedRecipes.length ? <div className="saved-kitchen-grid">{savedRecipes.map((recipe) => <article key={recipe.slug}><a href={`/recipes/${recipe.slug}`}><img src={recipe.image} alt=""/><div><small>{recipe.flag} {recipe.cuisine}</small><h3>{recipe.title}</h3><p>{recipe.description}</p></div></a><footer><button type="button" onClick={() => addToNextDay(recipe.slug)}>Add to plan</button><button type="button" onClick={() => toggleSaved(recipe.slug)}>Remove</button></footer></article>)}</div> : <div className="kitchen-empty"><span>♡</span><h3>Your recipe shelf is ready.</h3><p>Save something from Pantry Match or open a recipe and select “Save recipe”.</p><a className="button" href="/cuisines">Find a recipe</a></div>}
          </div>
        )}

        {activeTab === "passport" && (
          <div className="kitchen-panel passport-panel" id="kitchen-panel-passport" role="tabpanel" aria-labelledby="kitchen-tab-passport">
            <div className="passport-intro">
              <div><p className="eyebrow light">Food is a way to travel</p><h2>Your Flavour Passport.</h2><p>Each recipe you mark as cooked becomes a stamp—a personal record of the places, techniques and stories you have explored.</p></div>
              <div className="passport-score"><strong>{cookedCountries.length}</strong><span>countries explored</span><small>{state.cooked.length} cooking memories</small></div>
            </div>
            {cookedCountries.length ? <div className="passport-stamps">{cookedCountries.map((item, index) => <article key={item.country}><span>{item.flag}</span><small>Stamp {String(index + 1).padStart(2, "0")}</small><h3>{item.country}</h3><p>{item.title}</p><time dateTime={item.cookedAt}>{new Date(item.cookedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time></article>)}</div> : <div className="passport-empty"><span>◎</span><h3>Your first stamp is waiting.</h3><p>Open a recipe, launch Cook Mode and mark the dish as cooked when you finish.</p><a className="button" href="/cuisines">Choose a country</a></div>}
          </div>
        )}
      </section>
    </div>
  );
}
