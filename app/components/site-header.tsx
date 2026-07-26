"use client";

import { useEffect, useState } from "react";
import { desserts } from "../data/desserts";
import { recipes } from "../data/recipes";
import AuthNav from "./auth-nav";

const primaryLinks = [
  { href: "/cuisines#recipes", label: "Recipes" },
  { href: "/cuisines", label: "Cuisines" },
  { href: "/desserts", label: "Desserts" },
  { href: "/videos", label: "Videos" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/project-story", label: "Our Story" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", escape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav-wrap">
      <a className="brand" href="/#home" aria-label="The Copper Spoon home">
        <span className="brand-mark">CS</span>
        <span><b>The Copper Spoon</b><small>Recipes · Culture · Dining</small></span>
      </a>

      <nav className="desktop-navigation" aria-label="Main navigation">
        <div className="nav-dropdown"><a href="/cuisines#recipes">Recipes</a><div className="dropdown-menu">{recipes.slice(0,8).map((recipe)=><a key={recipe.slug} href={`/recipes/${recipe.slug}`}>{recipe.title}</a>)}<a className="view-all" href="/cuisines#recipes">View all recipes</a></div></div>
        <div className="nav-dropdown"><a href="/cuisines">Cuisines</a><div className="dropdown-menu">{["Mexican","Italian","Chinese","Indian","German","Greek","Filipino","Japanese"].map((name)=><a key={name} href={`/cuisines?name=${encodeURIComponent(name)}`}>{name}</a>)}<a className="view-all" href="/cuisines">View all cuisines</a></div></div>
        <div className="nav-dropdown"><a href="/desserts">Desserts</a><div className="dropdown-menu dessert-menu">{desserts.slice(0,7).map((dessert)=><a key={dessert.slug} href={`/recipes/${dessert.slug}`}>{dessert.title}</a>)}<a className="view-all" href="/desserts">View all desserts</a></div></div>
        <div className="nav-dropdown"><a href="/videos">Videos</a><div className="dropdown-menu video-menu">{recipes.slice(0,7).map((recipe)=><a key={recipe.slug} href={`/videos?cuisine=${encodeURIComponent(recipe.cuisine)}`}>{recipe.title}</a>)}<a className="view-all" href="/videos">View all videos</a></div></div>
        <div className="nav-dropdown"><a href="/restaurants">Restaurants</a><div className="dropdown-menu restaurant-menu">{["NOK by Alara","Shiro Lagos","Cactus Restaurant","RSVP Lagos","Z Kitchen","Ocean Basket"].map((name)=><a key={name} href="/restaurants">{name}</a>)}<a className="view-all" href="/restaurants">View all restaurants</a></div></div>
        <a className="story-navigation-link" href="/project-story">Our Story</a>
      </nav>

      <div className="header-actions">
        <AuthNav/>
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close main menu" : "Open main menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <div className={`mobile-menu-layer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)}></button>
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-menu-heading">
            <span>Explore Copper Spoon</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close main menu">×</button>
          </div>
          {primaryLinks.map((link, index) => (
            <a href={link.href} onClick={() => setOpen(false)} key={link.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>{link.label}<b>→</b>
            </a>
          ))}
          <div className="mobile-menu-note">
            <small>Food made with heart</small>
            <p>Global recipes, sweet discoveries and memorable Lagos tables.</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
