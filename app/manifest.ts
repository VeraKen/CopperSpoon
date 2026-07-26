import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Copper Spoon",
    short_name: "Copper Spoon",
    description: "Global recipes, guided Cook Mode, pantry matching and personal meal planning.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#b95125",
    orientation: "portrait-primary",
    categories: ["food", "lifestyle", "education"],
    icons: [
      {
        src: "/copper-spoon-logo.png",
        sizes: "1256x1256",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      { name: "My Kitchen", short_name: "Kitchen", url: "/kitchen" },
      { name: "Find a recipe", short_name: "Recipes", url: "/cuisines#recipes" },
      { name: "Desserts", short_name: "Desserts", url: "/desserts" },
    ],
  };
}
