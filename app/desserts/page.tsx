"use client";

import { useMemo, useState } from "react";
import { desserts } from "../data/desserts";

const regions = ["All regions", "Africa", "Europe", "Asia", "Middle East", "Americas"];
const categories = ["All types", "Cake", "Pastry", "Pudding", "Fried", "Frozen", "Confection"];

export default function DessertsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [category, setCategory] = useState("All types");

  const shown = useMemo(() => {
    const search = query.trim().toLowerCase();
    return desserts.filter((dessert) => {
      const matchesSearch =
        !search ||
        `${dessert.title} ${dessert.country} ${dessert.description}`
          .toLowerCase()
          .includes(search);
      const matchesRegion = region === "All regions" || dessert.region === region;
      const matchesCategory = category === "All types" || dessert.category === category;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [query, region, category]);

  return (
    <main className="desserts-page">
      <header className="recipe-nav">
        <a className="brand" href="/">
          <span className="brand-mark">CS</span>
          <span>
            <b>The Copper Spoon</b>
            <small>Recipes · Culture · Dining</small>
          </span>
        </a>
        <a className="text-link" href="/">← Home</a>
      </header>

      <section className="dessert-hero">
        <div className="dessert-hero-copy">
          <p className="eyebrow light">The sweet table</p>
          <h1>45 desserts.<br /><em>A world of joy.</em></h1>
          <p>
            Bake, chill, fry and share beloved sweet recipes from Africa,
            Europe, Asia, the Middle East and the Americas.
          </p>
          <div className="dessert-stats">
            <span><b>45</b><small>complete recipes</small></span>
            <span><b>5</b><small>world regions</small></span>
            <span><b>6</b><small>dessert styles</small></span>
          </div>
        </div>
        <div className="dessert-hero-art" aria-hidden="true">
          <span className="dessert-orbit orbit-one">🍰</span>
          <span className="dessert-orbit orbit-two">🍮</span>
          <span className="dessert-orbit orbit-three">🍩</span>
          <div className="dessert-centre">Sweet<br />stories</div>
        </div>
      </section>

      <section className="dessert-controls" aria-label="Dessert filters">
        <label className="dessert-search">
          <span>Search desserts</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try tiramisu, Nigeria or chocolate…"
          />
        </label>
        <label>
          <span>World region</span>
          <select value={region} onChange={(event) => setRegion(event.target.value)}>
            {regions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Dessert type</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </section>

      <section className="dessert-library">
        <div className="dessert-library-heading">
          <div>
            <p className="eyebrow">Choose something sweet</p>
            <h2>{shown.length === 45 ? "The complete dessert collection" : `${shown.length} desserts found`}</h2>
          </div>
          <p>{shown.length} of 45 recipes</p>
        </div>

        {shown.length > 0 ? (
          <div className="dessert-grid">
            {shown.map((dessert) => (
              <article className="dessert-card" key={dessert.slug}>
                <a className="dessert-photo" href={`/recipes/${dessert.slug}`} aria-label={`View ${dessert.title}`}>
                  <img src={dessert.image} alt={dessert.title} loading="lazy" />
                  <span>{dessert.flag} {dessert.country}</span>
                </a>
                <div className="dessert-card-body">
                  <div className="dessert-meta">
                    <small>{dessert.category}</small>
                    <small>{dessert.time}</small>
                  </div>
                  <h2><a href={`/recipes/${dessert.slug}`}>{dessert.title}</a></h2>
                  <p>{dessert.description}</p>
                  <a className="dessert-recipe-link" href={`/recipes/${dessert.slug}`}>
                    Make this dessert <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="dessert-empty">
            <span>🍮</span>
            <h2>No dessert matched that search.</h2>
            <button onClick={() => { setQuery(""); setRegion("All regions"); setCategory("All types"); }}>
              Show all 45 desserts
            </button>
          </div>
        )}
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">CS</span>
          <span><b>The Copper Spoon</b><small>Food made with heart</small></span>
        </div>
        <a href="/cuisines">Explore world cuisines →</a>
      </footer>
    </main>
  );
}
