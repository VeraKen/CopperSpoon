import SiteHeader from "../components/site-header";
import KitchenStudio from "../components/kitchen-studio";
import { desserts } from "../data/desserts";
import { recipes } from "../data/recipes";

export const metadata = {
  title: "My Kitchen | The Copper Spoon",
  description: "Match recipes to your pantry, plan the week, build a shopping list and collect a personal passport of cuisines cooked.",
};

export default function KitchenPage() {
  return (
    <main className="kitchen-page">
      <SiteHeader/>
      <KitchenStudio recipes={[...recipes, ...desserts]}/>
      <footer>
        <div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div>
        <a href="/project-story">How My Kitchen was designed →</a>
      </footer>
    </main>
  );
}
