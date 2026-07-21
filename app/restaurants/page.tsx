"use client";
import { useMemo, useState } from "react";
import { restaurants } from "../data/restaurants";

export default function RestaurantsPage(){
 const [area,setArea]=useState("All Lagos"); const areas=["All Lagos","Victoria Island","Ikoyi","Lekki","Ikeja"];
 const shown=useMemo(()=>area==="All Lagos"?restaurants:restaurants.filter(r=>r.area===area),[area]);
 return <main className="directory-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/">← Home</a></header>
 <section className="directory-hero restaurant-directory-hero"><p className="eyebrow">The Lagos table</p><h1>All Lagos restaurants</h1><p>Choose an area to discover standout dining across the city.</p><div className="choice-chips">{areas.map(name=><button className={area===name?"active":""} onClick={()=>setArea(name)} key={name}>{name}</button>)}</div></section>
 <section className="restaurant-list-section"><p className="results-count">{area==="All Lagos"?"Showing all restaurants":`Showing ${shown.length} restaurants in ${area}`}</p><div className="restaurant-grid">{shown.map(r=><article className="restaurant-card" key={r.name}><div className="restaurant-photo"><img src={r.image} alt={`${r.name} restaurant atmosphere`}/><span>{r.price}</span></div><div className="restaurant-card-body"><small>📍 {r.area}, Lagos</small><h2>{r.name}</h2><p>{r.cuisine}</p><a className="location-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name+" "+r.area+" Lagos Nigeria")}`} target="_blank" rel="noreferrer">View location on Google Maps ↗</a></div></article>)}</div></section>
 </main>;
}
