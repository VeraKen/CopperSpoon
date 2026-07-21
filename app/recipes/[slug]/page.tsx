import { notFound } from "next/navigation";

const recipes = {
  "silky-tomato-pasta": {
    icon: "🍝", title: "Silky Tomato Pasta", cuisine: "Italian", time: "30 minutes", difficulty: "Easy", servings: "4 people",
    intro: "A comforting bowl of pasta coated in a rich tomato and parmesan sauce. Simple ingredients, beautiful results.",
    ingredients: ["400g spaghetti or linguine", "2 tablespoons olive oil", "4 garlic cloves, finely chopped", "800g canned whole tomatoes", "1 teaspoon dried oregano", "A handful of fresh basil", "60g finely grated parmesan", "Salt and black pepper"],
    steps: ["Bring a large pot of salted water to a boil and cook the pasta until al dente. Save one cup of pasta water before draining.", "Warm the olive oil in a wide pan. Add the garlic and cook gently for one minute without browning.", "Crush in the tomatoes, add oregano, salt, and pepper, then simmer for 15 minutes until thick and glossy.", "Add the drained pasta to the sauce. Toss with parmesan and small splashes of pasta water until silky.", "Fold through fresh basil, taste for seasoning, and serve with extra parmesan."],
    tip: "Let the pasta finish cooking in the sauce for the final minute—it absorbs more flavour and gives the sauce a restaurant-style texture."
  },
  "golden-butter-chicken": {
    icon: "🍛", title: "Golden Butter Chicken", cuisine: "Indian", time: "45 minutes", difficulty: "Medium", servings: "4 people",
    intro: "Tender chicken in a fragrant, creamy tomato sauce with just enough warmth. Perfect with rice or naan.",
    ingredients: ["700g boneless chicken thighs, cubed", "150g plain yoghurt", "2 teaspoons garam masala", "1 teaspoon turmeric", "2 tablespoons butter", "1 onion, finely chopped", "3 garlic cloves, crushed", "1 tablespoon grated ginger", "400g crushed tomatoes", "200ml cooking cream", "Salt and fresh coriander"],
    steps: ["Mix the chicken with yoghurt, half the garam masala, turmeric, and a pinch of salt. Rest for 15 minutes.", "Melt half the butter in a large pan and brown the chicken in batches. Transfer it to a plate.", "Add the remaining butter and soften the onion. Stir in garlic and ginger for one minute.", "Add tomatoes and the remaining garam masala. Simmer for 10 minutes, then stir in the cream.", "Return the chicken to the pan and simmer gently until cooked through. Finish with coriander and serve."],
    tip: "Chicken thighs stay juicy and tender, but chicken breast also works—just reduce the final simmering time."
  },
  "smoky-jollof-rice": {
    icon: "🥘", title: "Smoky Jollof Rice", cuisine: "West African", time: "55 minutes", difficulty: "Medium", servings: "6 people",
    intro: "A vibrant one-pot rice dish with a deep pepper-tomato base and the unmistakable flavour of a celebration.",
    ingredients: ["3 cups long-grain parboiled rice", "4 red bell peppers", "3 plum tomatoes", "1 scotch bonnet pepper", "2 onions", "3 tablespoons tomato paste", "1/3 cup vegetable oil", "2 teaspoons curry powder", "1 teaspoon dried thyme", "2 bay leaves", "4 cups chicken or vegetable stock", "Salt to taste"],
    steps: ["Blend the bell peppers, tomatoes, scotch bonnet, and one onion until smooth.", "Heat oil in a heavy pot. Fry the remaining sliced onion and tomato paste for 4 minutes.", "Pour in the pepper blend and cook uncovered for 15 minutes, stirring occasionally, until reduced.", "Add curry powder, thyme, bay leaves, stock, and salt. Stir in the washed rice and cover tightly.", "Cook on low heat for 25–30 minutes. Let the rice toast gently at the bottom for a smoky flavour, then fluff and serve."],
    tip: "Cover the pot with foil before adding the lid. The trapped steam cooks the rice evenly without needing too much liquid."
  }
} as const;

export function generateStaticParams() { return Object.keys(recipes).map((slug) => ({ slug })); }

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes[slug as keyof typeof recipes];
  if (!recipe) notFound();
  return <main className="recipe-page">
    <header className="recipe-nav"><a className="brand" href="/"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span></a><a className="text-link" href="/#recipes">← All recipes</a></header>
    <section className="recipe-hero"><div><p className="eyebrow">{recipe.cuisine} recipe</p><h1>{recipe.title}</h1><p>{recipe.intro}</p><div className="recipe-facts"><span><small>Prep & cook</small><b>{recipe.time}</b></span><span><small>Difficulty</small><b>{recipe.difficulty}</b></span><span><small>Serves</small><b>{recipe.servings}</b></span></div></div><div className="recipe-icon">{recipe.icon}</div></section>
    <section className="recipe-content"><aside><p className="eyebrow">What you need</p><h2>Ingredients</h2><ul>{recipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul></aside><article><p className="eyebrow">Make it step by step</p><h2>Method</h2><ol>{recipe.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol><div className="chef-tip"><b>Chef’s tip</b><p>{recipe.tip}</p></div></article></section>
    <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><a href="/#recipes">Discover another recipe →</a></footer>
  </main>;
}
