import { recipes } from "./data/recipes";
import { desserts } from "./data/desserts";
import NewsletterForm from "./components/newsletter-form";
import SiteHeader from "./components/site-header";
/*
const oldRecipes = [
  { slug: "silky-tomato-pasta", image: "/recipes/silky-pasta.jpg", title: "Silky Tomato Pasta", type: "Italian", time: "30 min", text: "Slow-roasted tomato, garlic, basil, and a glossy parmesan finish." },
  { slug: "golden-butter-chicken", image: "/recipes/butter-chicken.jpg", title: "Golden Butter Chicken", type: "Indian", time: "45 min", text: "A warmly spiced, creamy classic made for sharing around the table." },
  { slug: "smoky-jollof-rice", image: "/recipes/smoky-jollof.jpg", title: "Smoky Jollof Rice", type: "West African", time: "55 min", text: "Party-style rice with peppers, tomatoes, thyme, and deep smoky flavour." },
];*/

const cuisines = [
  { icon: "🍝", name: "Italian", note: "Silky Tomato Pasta", href: "/recipes/silky-tomato-pasta" },
  { icon: "🌶️", name: "West African", note: "Smoky Jollof Rice", href: "/recipes/smoky-jollof-rice" },
  { icon: "🍛", name: "Indian", note: "Golden Butter Chicken", href: "/recipes/golden-butter-chicken" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader/>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Food made with heart</p>
          <h1>Every plate tells <em>a story.</em></h1>
          <p className="intro">Discover comforting recipes, explore flavours from around the world, and join us for unforgettable dining at The Copper Spoon.</p>
          <div className="hero-actions">
            <a className="button" href="#recipes">Explore recipes <span>→</span></a>
            <a className="text-link" href="#restaurant">Discover our restaurant <span>↗</span></a>
          </div>
          <div className="trust"><span>★★★★★</span> Recipes tested with love in our kitchen</div>
        </div>
        <div className="hero-art">
          <div className="sun"></div>
          <img src="/copper-spoon-logo.png" alt="The Copper Spoon chef holding a wooden spoon" />
          <div className="floating-note"><b>Fresh every day</b><span>Seasonal ingredients</span></div>
        </div>
      </section>

      <section className="marquee" aria-label="Our values"><span>Fresh ingredients</span><i>✦</i><span>Global flavours</span><i>✦</i><span>Made from scratch</span><i>✦</i><span>Shared with love</span></section>

      <section className="section" id="recipes">
        <div className="section-heading">
          <div><p className="eyebrow">From our kitchen</p><h2>Recipes worth gathering for</h2></div>
          <a className="text-link" href="/cuisines">View all recipes <span>→</span></a>
        </div>
        <div className="recipe-grid">
          {recipes.slice(0, 6).map((recipe, index) => (
            <article className="recipe-card" key={recipe.title}>
              <div className={`recipe-visual visual-${index + 1}`}><img src={recipe.image} alt={recipe.title} /><b>{recipe.time}</b></div>
              <div className="recipe-body"><small>{recipe.cuisine}</small><h3>{recipe.title}</h3><p>{recipe.description}</p><a href={`/recipes/${recipe.slug}`}>Cook this recipe <span>→</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="dessert-preview">
        <div className="section">
          <div className="section-heading">
            <div><p className="eyebrow light">Save room for something sweet</p><h2>All desserts from around the world</h2></div>
            <a className="text-link dessert-preview-link" href="/desserts">Explore every dessert <span>→</span></a>
          </div>
          <div className="dessert-preview-grid">
            {[desserts[0],desserts[9],desserts[26]].map((dessert)=><a href={`/recipes/${dessert.slug}`} className="dessert-preview-card" key={dessert.slug}><img src={dessert.image} alt={dessert.title}/><div><small>{dessert.flag} {dessert.country}</small><h3>{dessert.title}</h3><span>Make this dessert →</span></div></a>)}
          </div>
        </div>
      </section>

      <section className="cuisine-section" id="cuisines">
        <div className="section cuisine-inner">
          <div className="cuisine-copy"><p className="eyebrow light">Taste the world</p><h2>A table without borders</h2><p>Food brings us closer. Travel through treasured culinary traditions and discover new favourites—all from one generous table.</p><a className="button cream" href="/cuisines">View all cuisines</a></div>
          <div className="cuisine-grid">
            {cuisines.map((item) => <a className="cuisine-card" href={item.href} key={item.name}><span>{item.icon}</span><div><h3>{item.name}</h3><p>{item.note}</p><small>View recipe →</small></div></a>)}
          </div>
        </div>
      </section>

      <section className="restaurant section" id="restaurant">
        <div className="restaurant-art"><img src="/copper-spoon-logo.png" alt="Copper Spoon restaurant identity" /></div>
        <div className="restaurant-copy"><p className="eyebrow">Lagos dining guide</p><h2>Find your next<br /><em>favourite table.</em></h2><p>Explore restaurants across Victoria Island, Ikoyi, Lekki and Ikeja—from Nigerian classics to memorable global dining.</p><div className="details"><div><span>Restaurants</span><b>All Lagos choices</b></div><div><span>Neighbourhoods</span><b>VI · Ikoyi · Lekki · Ikeja</b></div></div><a className="button" href="/restaurants">Explore restaurants <span>→</span></a></div>
      </section>

      <section className="newsletter" id="contact"><p className="eyebrow light">Stay for seconds</p><h2>Three recipes, every day.</h2><p>Join the table and receive three fresh Copper Spoon recipes in your inbox each morning.</p><NewsletterForm/></section>

      <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><p>Recipes · Cuisines · Desserts · Restaurants</p><p><a href="/project-story">Project story</a> · © 2026 The Copper Spoon</p></footer>
    </main>
  );
}
