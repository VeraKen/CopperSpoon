"use client";
import { useEffect, useMemo, useState } from "react";
import { recipes } from "../data/recipes";

const videoLessons=recipes.slice(0,45);
const cuisineChoices=["All cuisines",...Array.from(new Set(videoLessons.map(recipe=>recipe.cuisine))).sort()];
export default function VideosPage(){
 const [cuisine,setCuisine]=useState("All cuisines");
 useEffect(()=>{const selected=new URLSearchParams(window.location.search).get("cuisine");if(selected&&cuisineChoices.includes(selected))setCuisine(selected);},[]);
 const shown=useMemo(()=>cuisine==="All cuisines"?videoLessons:videoLessons.filter(recipe=>recipe.cuisine===cuisine),[cuisine]);
 const popular=["All cuisines","West African","Italian","Indian","Mexican","Chinese","Japanese","French","Thai"];
 return <main className="directory-page videos-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/">← Home</a></header>
 <section className="directory-hero video-hero"><p className="eyebrow">Cook, watch and learn</p><h1>All cooking videos</h1><p>Choose a cuisine and watch an original Full HD Copper Spoon visual lesson for the exact recipe you want to cook.</p><div className="choice-chips">{popular.filter(name=>name==="All cuisines"||cuisineChoices.includes(name)).map(name=><button className={cuisine===name?"active":""} onClick={()=>setCuisine(name)} key={name}>{name}</button>)}</div><label className="cuisine-select"><span>Choose any cuisine</span><select value={cuisine} onChange={event=>setCuisine(event.target.value)}>{cuisineChoices.map(name=><option key={name}>{name}</option>)}</select></label></section>
 <section className="video-library"><p className="results-count">{cuisine==="All cuisines"?"Showing all video lessons":`${cuisine} video lessons`}</p><div className="video-grid">{shown.map(recipe=><article className="video-card" key={recipe.slug}><video className="video-player" controls preload="metadata" poster={recipe.image}><source src={`/videos/${recipe.slug}.mp4`} type="video/mp4"/>Your browser does not support HTML video.</video><div className="video-card-body"><p>{recipe.flag} {recipe.cuisine} · Full HD</p><h2>{recipe.title}</h2><span className="video-duration">Visual lesson · {recipe.time} recipe</span><a className="read-recipe" href={`/recipes/${recipe.slug}`}>Read recipe →</a></div></article>)}</div></section>
 </main>;
}
