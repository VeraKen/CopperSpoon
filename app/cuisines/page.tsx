"use client";
import { useEffect, useMemo, useState } from "react";
import { recipes, worldCuisines } from "../data/recipes";

export default function CuisinesPage(){
 const [selected,setSelected]=useState("All cuisines");
 useEffect(()=>{const name=new URLSearchParams(window.location.search).get("name");if(name)setSelected(name);},[]);
 const cuisineList=useMemo(()=>selected==="All cuisines"?worldCuisines:worldCuisines.filter(x=>x===selected),[selected]);
 const shownRecipes=useMemo(()=>selected==="All cuisines"?recipes:recipes.filter(r=>r.cuisine===selected||r.country===selected),[selected]);
 const popular=["All cuisines","Nigerian","Italian","Mexican","Indian","Chinese","Japanese","West African","Thai","French","Greek","Filipino"];
 return <main className="directory-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/">← Home</a></header>
 <section className="directory-hero"><p className="eyebrow">Taste the world</p><h1>Choose a cuisine</h1><p>No spelling needed—tap a popular choice or select from the complete list.</p><div className="choice-chips">{popular.map(name=><button className={selected===name?"active":""} onClick={()=>setSelected(name)} key={name}>{name}</button>)}</div><label className="cuisine-select"><span>Or choose from every cuisine</span><select value={selected} onChange={e=>setSelected(e.target.value)}><option>All cuisines</option>{worldCuisines.map(name=><option key={name}>{name}</option>)}</select></label></section>
 <section className="directory-section"><div className="alphabet-list">{cuisineList.map(name=>{const recipe=recipes.find(r=>r.cuisine===name||r.country===name);return <a className="directory-item has-recipe" href={`/recipes/${recipe?.slug}`} key={name}><span>{recipe?.flag||"🌍"}</span><div><b>{name}</b><small>{recipe?.title}</small></div><i>View recipe →</i></a>})}</div></section>
 <section className="section" id="recipes"><div className="section-heading"><div><p className="eyebrow">Cook around the world</p><h2>{selected==="All cuisines"?"Recipes for every cuisine":`${selected} recipes`}</h2></div></div><div className="recipe-grid">{shownRecipes.map(r=><article className="recipe-card" key={r.slug}><div className="recipe-visual"><img src={r.image} alt={r.title}/><b>{r.time}</b></div><div className="recipe-body"><small>{r.flag} {r.cuisine}</small><h3>{r.title}</h3><p>{r.description}</p><a href={`/recipes/${r.slug}`}>Cook this recipe <span>→</span></a></div></article>)}</div></section></main>
}
