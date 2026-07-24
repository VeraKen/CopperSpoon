import { notFound } from "next/navigation";
import { recipes, recipeBySlug } from "../../data/recipes";
import { dessertBySlug, desserts } from "../../data/desserts";

export function generateStaticParams(){return [...recipes,...desserts].map(({slug})=>({slug}));}
export default async function RecipePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const dessert=dessertBySlug(slug); const recipe=recipeBySlug(slug)||dessert; if(!recipe)notFound();
 const hasVideo=recipes.slice(0,45).some(item=>item.slug===recipe.slug);
 return <main className={`recipe-page ${dessert?"dessert-recipe-page":""}`}><header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href={dessert?"/desserts":"/cuisines"}>← {dessert?"All desserts":"All cuisines"}</a></header>
 <section className="recipe-hero"><div><p className="eyebrow">{recipe.flag} {recipe.cuisine} {dessert?"dessert":"recipe"}</p><h1>{recipe.title}</h1><p>{recipe.description}</p><div className="recipe-facts"><span><small>Prep & cook</small><b>{recipe.time}</b></span><span><small>Difficulty</small><b>{recipe.difficulty}</b></span><span><small>Serves</small><b>{recipe.servings}</b></span></div>{hasVideo&&<a className="button recipe-video-button" href="#video-lesson">▶ Watch the video lesson</a>}</div><div className="recipe-icon"><img src={recipe.image} alt={recipe.title}/></div></section>
 {hasVideo&&<section className="recipe-video-section" id="video-lesson"><div><p className="eyebrow">Original Copper Spoon lesson</p><h2>Cook {recipe.title}</h2><p>Follow the ingredients, method and chef’s tip in this Full HD visual guide.</p></div><video controls preload="metadata" poster={recipe.image}><source src={`/videos/${recipe.slug}.mp4`} type="video/mp4"/>Your browser does not support HTML video.</video></section>}
 <section className="recipe-content"><aside><p className="eyebrow">What you need</p><h2>Ingredients</h2><ul>{recipe.ingredients.map(x=><li key={x}>{x}</li>)}</ul></aside><article><p className="eyebrow">Make it step by step</p><h2>Method</h2><ol>{recipe.steps.map((x,i)=><li key={x}><span>{i+1}</span><p>{x}</p></li>)}</ol><div className="chef-tip"><b>Chef’s tip</b><p>{recipe.tip}</p></div></article></section>
 <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><a href={dessert?"/desserts":"/cuisines"}>Explore another {dessert?"dessert":"cuisine"} →</a></footer></main>;
}
