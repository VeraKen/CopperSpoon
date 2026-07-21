"use client";
import { useEffect, useMemo, useState } from "react";
import { recipes, worldCuisines } from "../data/recipes";

export default function CuisinesPage(){
 const [query,setQuery]=useState("");
 useEffect(()=>{setQuery(new URLSearchParams(window.location.search).get("name")||"");},[]);
 const cuisines=useMemo(()=>worldCuisines.filter(x=>x.toLowerCase().includes(query.toLowerCase())),[query]);
 return <main className="directory-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/">← Home</a></header>
 <section className="directory-hero"><p className="eyebrow">Taste the world</p><h1>World cuisines</h1><p>Explore food traditions from across the globe and open a complete Copper Spoon recipe.</p><label><span>Search cuisines</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try Italian, Nigerian or Japanese…"/></label></section>
 <section className="directory-section"><div className="alphabet-list">{cuisines.map(name=>{const recipe=recipes.find(r=>r.cuisine===name||r.country===name);return recipe?<a className="directory-item has-recipe" href={`/recipes/${recipe.slug}`} key={name}><span>{recipe.flag}</span><div><b>{name}</b><small>{recipe.title}</small></div><i>View recipe →</i></a>:<article className="directory-item" key={name}><span>🍽️</span><div><b>{name}</b><small>Cuisine guide</small></div><i>Coming soon</i></article>})}</div></section>
 <section className="section"><div className="section-heading"><div><p className="eyebrow">Cook around the world</p><h2>Featured global recipes</h2></div></div><div className="recipe-grid">{recipes.map(r=><article className="recipe-card" key={r.slug}><div className="recipe-visual"><img src={r.image} alt={r.title}/><b>{r.time}</b></div><div className="recipe-body"><small>{r.flag} {r.cuisine}</small><h3>{r.title}</h3><p>{r.description}</p><a href={`/recipes/${r.slug}`}>Cook this recipe <span>→</span></a></div></article>)}</div></section></main>
}
