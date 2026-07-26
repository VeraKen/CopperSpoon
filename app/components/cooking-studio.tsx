"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  emptyKitchenState,
  formatTimer,
  kitchenStorageKey,
  parseStepDuration,
  scaleIngredient,
  type KitchenRecipe,
  type KitchenState,
} from "../lib/kitchen";

type WakeLockSentinelLike = {
  release: () => Promise<void>;
  addEventListener?: (type: string, listener: () => void) => void;
};

function storedKitchen(): KitchenState {
  try {
    const value = JSON.parse(localStorage.getItem(kitchenStorageKey) || "{}");
    return {
      ...emptyKitchenState,
      ...value,
      pantry: Array.isArray(value.pantry) ? value.pantry : [],
      saved: Array.isArray(value.saved) ? value.saved : [],
      plan: value.plan && typeof value.plan === "object" ? value.plan : {},
      cooked: Array.isArray(value.cooked) ? value.cooked : [],
      checkedGroceries: Array.isArray(value.checkedGroceries) ? value.checkedGroceries : [],
    };
  } catch {
    return emptyKitchenState;
  }
}

function writeKitchen(value: KitchenState) {
  localStorage.setItem(kitchenStorageKey, JSON.stringify(value));
  window.dispatchEvent(new Event("copper-kitchen-change"));
}

export default function CookingStudio({ recipe }: { recipe: KitchenRecipe }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [cooked, setCooked] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wakeActive, setWakeActive] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const wakeLock = useRef<WakeLockSentinelLike | null>(null);

  const scaledIngredients = useMemo(
    () => recipe.ingredients.map((ingredient) => scaleIngredient(ingredient, scale)),
    [recipe.ingredients, scale],
  );
  const stepTimer = parseStepDuration(recipe.steps[stepIndex]);
  const progress = Math.round(((stepIndex + 1) / recipe.steps.length) * 100);

  useEffect(() => {
    const state = storedKitchen();
    setSaved(state.saved.includes(recipe.slug));
    setCooked(state.cooked.some((item) => item.slug === recipe.slug));
  }, [recipe.slug]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setStepIndex((current) => Math.min(recipe.steps.length - 1, current + 1));
      if (event.key === "ArrowLeft") setStepIndex((current) => Math.max(0, current - 1));
      if (event.key === "Tab") {
        const focusable = [...(dialog.current?.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled), a[href]") || [])];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first && last) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last && first) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keys);
    };
  }, [open, recipe.steps.length]);

  useEffect(() => {
    if (!timerRunning || remaining <= 0) return;
    const timer = window.setInterval(() => {
      setRemaining((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [remaining, timerRunning]);

  useEffect(() => {
    if (timerRunning && remaining === 0) {
      setTimerRunning(false);
      setAnnouncement("Timer finished.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Copper Spoon timer finished."));
      }
    }
  }, [remaining, timerRunning]);

  useEffect(() => {
    if (!open && wakeLock.current) {
      wakeLock.current.release().catch(() => undefined);
      wakeLock.current = null;
      setWakeActive(false);
    }
  }, [open]);

  function toggleSaved() {
    const state = storedKitchen();
    const nextSaved = state.saved.includes(recipe.slug)
      ? state.saved.filter((slug) => slug !== recipe.slug)
      : [...state.saved, recipe.slug];
    writeKitchen({ ...state, saved: nextSaved });
    setSaved(nextSaved.includes(recipe.slug));
    setAnnouncement(nextSaved.includes(recipe.slug) ? "Recipe saved to My Kitchen." : "Recipe removed from My Kitchen.");
  }

  function markCooked() {
    const state = storedKitchen();
    const memory = {
      slug: recipe.slug,
      title: recipe.title,
      country: recipe.country,
      flag: recipe.flag,
      cookedAt: new Date().toISOString(),
    };
    writeKitchen({
      ...state,
      cooked: [...state.cooked.filter((item) => item.slug !== recipe.slug), memory],
    });
    setCooked(true);
    setAnnouncement(`${recipe.title} added to your Flavour Passport.`);
  }

  function readStep() {
    if (!("speechSynthesis" in window)) {
      setAnnouncement("Spoken steps are not supported by this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(
      `Step ${stepIndex + 1}. ${recipe.steps[stepIndex]}`,
    );
    voice.rate = 0.9;
    window.speechSynthesis.speak(voice);
    setAnnouncement(`Reading step ${stepIndex + 1} aloud.`);
  }

  function startTimer(seconds: number) {
    setRemaining(seconds);
    setTimerRunning(true);
    setAnnouncement(`Timer started for ${formatTimer(seconds)}.`);
  }

  async function toggleWakeLock() {
    if (wakeLock.current) {
      await wakeLock.current.release();
      wakeLock.current = null;
      setWakeActive(false);
      return;
    }
    const capableNavigator = navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> };
    };
    if (!capableNavigator.wakeLock) {
      setAnnouncement("Screen wake lock is not supported by this browser.");
      return;
    }
    try {
      wakeLock.current = await capableNavigator.wakeLock.request("screen");
      wakeLock.current.addEventListener?.("release", () => setWakeActive(false));
      setWakeActive(true);
      setAnnouncement("Screen will stay awake during Cook Mode.");
    } catch {
      setAnnouncement("Your browser did not allow the screen to stay awake.");
    }
  }

  async function shareRecipe() {
    const shareData = {
      title: recipe.title,
      text: `Cook ${recipe.title} with The Copper Spoon.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setAnnouncement("Recipe link copied.");
      }
    } catch {
      setAnnouncement("Sharing was cancelled.");
    }
  }

  return (
    <>
      <section className="cooking-studio-bar" aria-label="Interactive recipe tools">
        <div>
          <p className="eyebrow">Kitchen Intelligence</p>
          <h2>Make this recipe work for you.</h2>
          <p>Scale the ingredients, follow one calm step at a time, start built-in timers and keep a personal record of what you cook.</p>
        </div>
        <div className="cooking-studio-actions">
          <button className="cook-primary" type="button" onClick={() => setOpen(true)}>Start Cook Mode <span>→</span></button>
          <button type="button" onClick={toggleSaved}>{saved ? "♥ Saved" : "♡ Save recipe"}</button>
          <button type="button" onClick={shareRecipe}>↗ Share</button>
          <a href="/kitchen">Open My Kitchen</a>
        </div>
        <div className="serving-scale">
          <span>Ingredient scale</span>
          <div>{[[0.5, "½×"], [1, "1×"], [2, "2×"], [3, "3×"]].map(([value, label]) => <button type="button" className={scale === value ? "active" : ""} aria-pressed={scale === value} key={value} onClick={() => setScale(Number(value))}>{label}</button>)}</div>
          <small>{scale === 1 ? recipe.servings : `${scale}× the original recipe`}</small>
        </div>
        <ul className="scaled-ingredient-preview">{scaledIngredients.slice(0, 4).map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
        <p className="sr-only" role="status">{announcement}</p>
      </section>

      {open && (
        <div ref={dialog} className="cook-mode" role="dialog" aria-modal="true" aria-labelledby="cook-mode-title">
          <header>
            <div><span>{recipe.flag}</span><p><small>Cooking now</small><strong id="cook-mode-title">{recipe.title}</strong></p></div>
            <div className="cook-mode-header-actions">
              <button type="button" onClick={toggleWakeLock} aria-pressed={wakeActive}>{wakeActive ? "☀ Screen awake" : "☾ Keep screen awake"}</button>
              <button ref={closeButton} className="cook-close" type="button" onClick={() => setOpen(false)} aria-label="Close Cook Mode">×</button>
            </div>
          </header>

          <div className="cook-progress" aria-label={`${progress}% complete`}><span style={{ width: `${progress}%` }}/></div>

          <div className="cook-mode-grid">
            <aside>
              <div className="cook-scale">
                <span>Scale ingredients</span>
                <div>{[[0.5, "½×"], [1, "1×"], [2, "2×"], [3, "3×"]].map(([value, label]) => <button type="button" className={scale === value ? "active" : ""} aria-pressed={scale === value} key={value} onClick={() => setScale(Number(value))}>{label}</button>)}</div>
              </div>
              <h2>Ingredients</h2>
              <ul className="cook-ingredient-list">{scaledIngredients.map((ingredient, index) => <li className={checkedIngredients.includes(index) ? "checked" : ""} key={`${ingredient}-${index}`}><label><input type="checkbox" checked={checkedIngredients.includes(index)} onChange={() => setCheckedIngredients((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])}/><span>{ingredient}</span></label></li>)}</ul>
            </aside>

            <main>
              <div className="cook-step-count"><span>Step {stepIndex + 1}</span><small>of {recipe.steps.length}</small></div>
              <article className="cook-current-step">
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <p>{recipe.steps[stepIndex]}</p>
              </article>
              <div className="cook-step-tools">
                <button type="button" onClick={readStep}>🔊 Read step aloud</button>
                {stepTimer ? <button type="button" onClick={() => startTimer(stepTimer)}>⏱ Start {formatTimer(stepTimer)} timer</button> : <button type="button" onClick={() => startTimer(5 * 60)}>⏱ Start 5:00 timer</button>}
              </div>

              {(remaining > 0 || timerRunning) && <section className={`cook-timer ${timerRunning ? "running" : ""}`} aria-label="Cooking timer"><div><small>Kitchen timer</small><strong>{formatTimer(remaining)}</strong></div><div><button type="button" onClick={() => setTimerRunning((current) => !current)}>{timerRunning ? "Pause" : "Resume"}</button><button type="button" onClick={() => setRemaining((current) => current + 60)}>+ 1 min</button><button type="button" onClick={() => { setRemaining(0); setTimerRunning(false); }}>Clear</button></div></section>}

              <div className="cook-navigation">
                <button type="button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={stepIndex === 0}>← Previous</button>
                {stepIndex < recipe.steps.length - 1 ? <button className="next" type="button" onClick={() => setStepIndex((current) => Math.min(recipe.steps.length - 1, current + 1))}>Next step →</button> : <button className="finish" type="button" onClick={markCooked}>{cooked ? "✓ Added to passport" : "Finish & mark cooked"}</button>}
              </div>
              <div className="cook-tip"><span>Chef’s tip</span><p>{recipe.tip}</p></div>
              <p className="cook-keyboard-note">Keyboard: ← previous · → next · Esc close</p>
            </main>
          </div>
          <div className="sr-only" aria-live="polite">{announcement}</div>
        </div>
      )}
    </>
  );
}
