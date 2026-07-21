import { notFound } from "next/navigation";
import { recipes, recipeBySlug } from "../../data/recipes";

export function generateStaticParams(){return recipes.map(({slug})=>({slug}));}
export default async function RecipePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const recipe=recipeBySlug(slug); if(!recipe)notFound();
 return <main className="recipe-page"><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/cuisines">← All cuisines</a></header>
 <section className="recipe-hero"><div><p className="eyebrow">{recipe.flag} {recipe.cuisine} recipe</p><h1>{recipe.title}</h1><p>{recipe.description}</p><div className="recipe-facts"><span><small>Prep & cook</small><b>{recipe.time}</b></span><span><small>Difficulty</small><b>{recipe.difficulty}</b></span><span><small>Serves</small><b>{recipe.servings}</b></span></div><a className="button recipe-video-button" href={`https://www.google.com/search?tbm=vid&q=${encodeURIComponent(recipe.title+" "+recipe.cuisine+" authentic full recipe cooking tutorial")}`} target="_blank" rel="noreferrer">▶ Watch the video lesson</a></div><div className="recipe-icon"><img src={recipe.image} alt={recipe.title}/></div></section>
 <section className="recipe-content"><aside><p className="eyebrow">What you need</p><h2>Ingredients</h2><ul>{recipe.ingredients.map(x=><li key={x}>{x}</li>)}</ul></aside><article><p className="eyebrow">Make it step by step</p><h2>Method</h2><ol>{recipe.steps.map((x,i)=><li key={x}><span>{i+1}</span><p>{x}</p></li>)}</ol><div className="chef-tip"><b>Chef’s tip</b><p>{recipe.tip}</p></div></article></section>
 <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><a href="/cuisines">Explore another cuisine →</a></footer></main>;
}
