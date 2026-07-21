"use client";
import { useEffect, useMemo, useState } from "react";
import { recipes } from "../data/recipes";

const videoLessons=recipes.slice(0,45);
const cuisineChoices=["All cuisines",...Array.from(new Set(videoLessons.map(recipe=>recipe.cuisine))).sort()];
const videoUrl=(title:string,cuisine:string)=>`https://www.google.com/search?tbm=vid&q=${encodeURIComponent(`${title} ${cuisine} authentic full recipe cooking tutorial`)}`;

export default function VideosPage(){
 const [cuisine,setCuisine]=useState("All cuisines");
 useEffect(()=>{const selected=new URLSearchParams(window.location.search).get("cuisine");if(selected&&cuisineChoices.includes(selected))setCuisine(selected);},[]);
 const shown=useMemo(()=>cuisine==="All cuisines"?videoLessons:videoLessons.filter(recipe=>recipe.cuisine===cuisine),[cuisine]);
 const popular=["All cuisines","West African","Italian","Indian","Mexican","Chinese","Japanese","French","Thai"];
 return <main className="directory-page videos-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/">← Home</a></header>
 <section className="directory-hero video-hero"><p className="eyebrow">Cook, watch and learn</p><h1>All cooking videos</h1><p>Choose a cuisine and open a high-quality video lesson for the exact Copper Spoon recipe you want to cook.</p><div className="choice-chips">{popular.filter(name=>name==="All cuisines"||cuisineChoices.includes(name)).map(name=><button className={cuisine===name?"active":""} onClick={()=>setCuisine(name)} key={name}>{name}</button>)}</div><label className="cuisine-select"><span>Choose any cuisine</span><select value={cuisine} onChange={event=>setCuisine(event.target.value)}>{cuisineChoices.map(name=><option key={name}>{name}</option>)}</select></label></section>
 <section className="video-library"><p className="results-count">{cuisine==="All cuisines"?"Showing all video lessons":`${cuisine} video lessons`}</p><div className="video-grid">{shown.map(recipe=><article className="video-card" key={recipe.slug}><a className="video-thumbnail" href={videoUrl(recipe.title,recipe.cuisine)} target="_blank" rel="noreferrer"><img src={recipe.image} alt={`${recipe.title} cooking video lesson`}/><span className="play-button" aria-hidden="true">▶</span><small>{recipe.time}</small></a><div className="video-card-body"><p>{recipe.flag} {recipe.cuisine}</p><h2>{recipe.title}</h2><a href={videoUrl(recipe.title,recipe.cuisine)} target="_blank" rel="noreferrer">Watch video lesson on Google ↗</a><a className="read-recipe" href={`/recipes/${recipe.slug}`}>Read recipe →</a></div></article>)}</div></section>
 </main>;
}
