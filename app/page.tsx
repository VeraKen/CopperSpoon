const recipes = [
  { icon: "🍝", title: "Silky Tomato Pasta", type: "Italian", time: "30 min", text: "Slow-roasted tomato, garlic, basil, and a glossy parmesan finish." },
  { icon: "🍛", title: "Golden Butter Chicken", type: "Indian", time: "45 min", text: "A warmly spiced, creamy classic made for sharing around the table." },
  { icon: "🥘", title: "Smoky Jollof Rice", type: "West African", time: "55 min", text: "Party-style rice with peppers, tomatoes, thyme, and deep smoky flavour." },
];

const cuisines = [
  { icon: "🌿", name: "Mediterranean", note: "Bright, fresh & generous" },
  { icon: "🌶️", name: "West African", note: "Bold, soulful & vibrant" },
  { icon: "🍋", name: "Modern European", note: "Elegant seasonal plates" },
  { icon: "🥢", name: "Asian Inspired", note: "Sweet, savoury & aromatic" },
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
          <a href="#recipes">Recipes</a><a href="#cuisines">Cuisines</a><a href="#restaurant">Restaurant</a>
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
          <a className="text-link" href="#recipes">View all recipes <span>→</span></a>
        </div>
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <article className="recipe-card" key={recipe.title}>
              <div className={`recipe-visual visual-${index + 1}`}><span>{recipe.icon}</span><b>{recipe.time}</b></div>
              <div className="recipe-body"><small>{recipe.type}</small><h3>{recipe.title}</h3><p>{recipe.text}</p><a href="#contact">Cook this recipe <span>→</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cuisine-section" id="cuisines">
        <div className="section cuisine-inner">
          <div className="cuisine-copy"><p className="eyebrow light">Taste the world</p><h2>A table without borders</h2><p>Food brings us closer. Travel through treasured culinary traditions and discover new favourites—all from one generous table.</p><a className="button cream" href="#contact">Explore our flavours</a></div>
          <div className="cuisine-grid">
            {cuisines.map((item) => <article key={item.name}><span>{item.icon}</span><div><h3>{item.name}</h3><p>{item.note}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="restaurant section" id="restaurant">
        <div className="restaurant-art"><img src="/copper-spoon-logo.png" alt="Copper Spoon restaurant identity" /></div>
        <div className="restaurant-copy"><p className="eyebrow">The restaurant</p><h2>Come hungry.<br /><em>Leave inspired.</em></h2><p>Our dining room is warm, relaxed, and full of life. From intimate dinners to lively celebrations, we serve thoughtful food and genuine hospitality.</p><div className="details"><div><span>Opening hours</span><b>Tuesday–Sunday<br />12:00 PM–10:00 PM</b></div><div><span>Reservations</span><b>Tables available<br />for lunch & dinner</b></div></div><a className="button" href="#contact">Reserve your table <span>→</span></a></div>
      </section>

      <section className="newsletter" id="contact"><p className="eyebrow light">Stay for seconds</p><h2>Good food, straight to your inbox.</h2><p>Fresh recipes, chef stories, and restaurant news—served occasionally.</p><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" /><button type="submit">Join the table</button></form></section>

      <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><p>Recipes · Cuisines · Restaurant</p><p>© 2026 The Copper Spoon</p></footer>
    </main>
  );
}
