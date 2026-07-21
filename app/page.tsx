import { recipes } from "./data/recipes";
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
      <header className="nav-wrap">
        <a className="brand" href="#home" aria-label="The Copper Spoon home">
          <span className="brand-mark">CS</span>
          <span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span>
        </a>
        <nav aria-label="Main navigation">
          <div className="nav-dropdown"><a href="/cuisines#recipes">Recipes</a><div className="dropdown-menu">{recipes.slice(0,8).map((recipe)=><a key={recipe.slug} href={`/recipes/${recipe.slug}`}>{recipe.title}</a>)}<a className="view-all" href="/cuisines#recipes">View all</a></div></div>
          <div className="nav-dropdown"><a href="/cuisines">Cuisines</a><div className="dropdown-menu">{["Mexican","Italian","Chinese","Indian","German","Greek","Filipino","Japanese"].map((name)=><a key={name} href={`/cuisines?name=${encodeURIComponent(name)}`}>{name}</a>)}<a className="view-all" href="/cuisines">View all</a></div></div>
          <div className="nav-dropdown"><a href="/restaurants">Restaurants</a><div className="dropdown-menu restaurant-menu">{["NOK by Alara","Shiro Lagos","Cactus Restaurant","RSVP Lagos","Z Kitchen","Ocean Basket","Terra Kulture","Kapadoccia Lagos"].map((name)=><a key={name} href="/restaurants">{name}</a>)}<a className="view-all" href="/restaurants">View all 45</a></div></div>
        </nav>
        <a className="button button-small" href="#contact">Book a table</a>
      </header>

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
        <div className="restaurant-copy"><p className="eyebrow">Lagos dining guide</p><h2>Find your next<br /><em>favourite table.</em></h2><p>Explore 45 restaurants across Victoria Island, Ikoyi, Lekki and Ikeja—from Nigerian classics to memorable global dining.</p><div className="details"><div><span>Restaurants</span><b>45 Lagos choices</b></div><div><span>Neighbourhoods</span><b>VI · Ikoyi · Lekki · Ikeja</b></div></div><a className="button" href="/restaurants">Explore restaurants <span>→</span></a></div>
      </section>

      <section className="newsletter" id="contact"><p className="eyebrow light">Stay for seconds</p><h2>Good food, straight to your inbox.</h2><p>Fresh recipes, chef stories, and restaurant news—served occasionally.</p><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" /><button type="submit">Join the table</button></form></section>

      <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><p>Recipes · Cuisines · Restaurant</p><p>© 2026 The Copper Spoon</p></footer>
    </main>
  );
}
