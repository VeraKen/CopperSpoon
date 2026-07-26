import SiteHeader from "../components/site-header";

const featureEvidence = [
  { number: "60+", title: "Global recipes", text: "A cuisine directory with searchable, step-by-step recipes representing food traditions across the world." },
  { number: "Smart", title: "Pantry matching", text: "My Kitchen compares ingredients visitors already own with the full recipe library and ranks useful matches instantly." },
  { number: "Guided", title: "Cook Mode", text: "Scalable ingredients, spoken steps, built-in timers, keyboard control and screen wake lock support real cooking." },
  { number: "Personal", title: "Flavour Passport", text: "Saved recipes, weekly plans, shopping lists and countries cooked form a private journey stored on the visitor’s device." },
  { number: "All", title: "Dessert journeys", text: "A filterable dessert collection spanning Africa, Europe, Asia, the Middle East and the Americas." },
  { number: "All", title: "Lagos tables", text: "A practical dining guide organised by neighbourhood, with direct Google Maps location links." },
];

const decisions = [
  { challenge: "A very large food library could feel overwhelming.", decision: "Use familiar filters, popular-choice buttons and searchable directories.", result: "Visitors can reach a useful recipe without knowing how to spell its cuisine." },
  { challenge: "Desktop dropdown navigation did not translate well to phones.", decision: "Create an accessible mobile drawer with clear labels, Escape-key support and large tap targets.", result: "Every major area remains reachable on small screens." },
  { challenge: "Account and email services can fail outside the browser.", decision: "Add friendly errors, environment health checks, safe retries and structured monitoring.", result: "Problems are clearer to visitors and easier for the site owner to diagnose." },
  { challenge: "The brand needed to feel culturally grounded and globally welcoming.", decision: "Combine an African chef identity with copper, clay, cream and sage colours.", result: "The visual language feels warm, recognisable and connected to food culture." },
  { challenge: "Most recipe sites stop at showing instructions.", decision: "Build a complete kitchen workflow: pantry discovery, planning, shopping, guided cooking and a personal passport.", result: "Copper Spoon now helps before, during and after someone cooks—not only while they browse." },
  { challenge: "Personalisation often requires an account and internet connection.", decision: "Keep My Kitchen data private in the browser and make the core experience installable and offline-friendly.", result: "Visitors receive immediate value without surrendering personal data or completing registration." },
];

export default function ProjectStoryPage() {
  return (
    <main className="story-page">
      <SiteHeader/>

      <section className="story-hero">
        <div>
          <p className="eyebrow light">Purpose, process and learning</p>
          <h1>We built a table<br /><em>without borders.</em></h1>
          <p>The Copper Spoon helps curious home cooks discover global recipes, learn visually, find memorable Lagos restaurants and receive fresh cooking inspiration every day.</p>
          <div className="story-audience"><span>For home cooks</span><span>For food explorers</span><span>For Lagos diners</span></div>
        </div>
        <aside aria-label="Project purpose">
          <span>Our purpose</span>
          <blockquote>Make world food feel welcoming, practical and worth sharing.</blockquote>
          <p>Success means a visitor can discover something new and confidently take their next step—cook it, watch it or visit it.</p>
        </aside>
      </section>

      <section className="story-section">
        <div className="story-section-heading">
          <p className="eyebrow">Purpose and impact</p>
          <h2>Useful from the first click.</h2>
          <p>The project turns food discovery into action. Every major feature answers a real visitor question: What can I cook with what I own? How do I make it confidently? What should I plan this week? Which culture will I explore next?</p>
        </div>
        <div className="evidence-grid">
          {featureEvidence.map((item)=><article key={item.title}><strong>{item.number}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>

      <section className="design-story">
        <div className="story-section">
          <div className="story-section-heading light-copy">
            <p className="eyebrow light">Design and visual appeal</p>
            <h2>Warmth, heritage and appetite.</h2>
            <p>The design uses editorial typography, generous spacing and food-led photography. Copper and clay suggest cookware and warmth; cream keeps long recipes comfortable to read; sage adds a natural counterpoint.</p>
          </div>
          <div className="design-system">
            <div className="colour-story">
              <span style={{background:"#b95125"}}><b>Copper</b><small>Energy and action</small></span>
              <span style={{background:"#667054"}}><b>Sage</b><small>Freshness and balance</small></span>
              <span className="dark-swatch" style={{background:"#252118"}}><b>Ink</b><small>Clarity and contrast</small></span>
              <span className="light-swatch" style={{background:"#f7eedc"}}><b>Cream</b><small>Warm reading space</small></span>
            </div>
            <div className="type-story">
              <small>Editorial voice</small>
              <p>Georgia gives food stories a timeless, human character.</p>
              <small>Interface voice</small>
              <p className="sans-sample">Arial keeps buttons, filters and instructions direct and readable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-section-heading">
          <p className="eyebrow">Technical achievement</p>
          <h2>A complete cooking system.</h2>
          <p>The interface combines immediate browser-based intelligence with real account, email, offline and scheduled-delivery services—not demonstration buttons.</p>
        </div>
        <div className="architecture-flow" aria-label="Project architecture">
          <div><span>01</span><b>Next.js interface</b><p>Fast, responsive pages, installable PWA support and pre-built recipe routes.</p></div>
          <i>→</i>
          <div><span>02</span><b>Kitchen Intelligence</b><p>Pantry ranking, serving calculations, meal planning, timers and private local persistence.</p></div>
          <i>→</i>
          <div><span>03</span><b>Connected services</b><p>Supabase accounts plus Resend welcome messages, unsubscribe support and daily recipes.</p></div>
          <i>→</i>
          <div><span>04</span><b>Reliable operations</b><p>Vercel schedules, health reporting, safe retries, automated tests and offline recovery.</p></div>
        </div>
        <div className="technical-proof">
          <span><b>Smart</b><small>pantry matching</small></span>
          <span><b>Guided</b><small>interactive cooking</small></span>
          <span><b>Offline</b><small>installable kitchen</small></span>
          <span><b>Private</b><small>personal planning</small></span>
        </div>
      </section>

      <section className="decision-section">
        <div className="story-section">
          <div className="story-section-heading light-copy">
            <p className="eyebrow light">Challenges and decisions</p>
            <h2>Every obstacle shaped the result.</h2>
          </div>
          <div className="decision-list">
            {decisions.map((item,index)=><article key={item.challenge}><span>{String(index+1).padStart(2,"0")}</span><div><small>Challenge</small><p>{item.challenge}</p></div><div><small>Decision</small><p>{item.decision}</p></div><div><small>Result</small><p>{item.result}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="story-section learning-section">
        <div>
          <p className="eyebrow">Learning and reflection</p>
          <h2>What this project taught us.</h2>
        </div>
        <div className="learning-grid">
          <article><span>01</span><h3>Design for real choices</h3><p>A large library becomes useful only when visitors can narrow it quickly. Search, filters and clear categories are part of the product—not decoration.</p></article>
          <article><span>02</span><h3>Reliability is a feature</h3><p>A successful button animation means little if the email never arrives. External services need validation, retries, monitoring and human-friendly failure messages.</p></article>
          <article><span>03</span><h3>Accessibility improves everyone’s experience</h3><p>Keyboard focus, reduced-motion support, semantic labels and mobile navigation make the interface easier for more people and more situations.</p></article>
          <article><span>04</span><h3>Culture deserves care</h3><p>Global food should be presented with correct names, origin context and respectful imagery. Specificity creates trust and celebrates the people behind each dish.</p></article>
          <article><span>05</span><h3>Personal does not have to mean invasive</h3><p>A useful pantry, meal plan and cooking history can live privately on a visitor’s device, work before sign-in and remain available when the connection disappears.</p></article>
          <article><span>06</span><h3>Design for the kitchen, not the desk</h3><p>Large steps, screen wake lock, timers, speech and ingredient checklists respond to floury hands, busy pans and divided attention.</p></article>
        </div>
      </section>

      <section className="story-accessibility">
        <div>
          <p className="eyebrow light">Inclusive by design</p>
          <h2>Made for more ways of browsing.</h2>
        </div>
        <ul>
          <li>Keyboard-visible focus and skip navigation</li>
          <li>Responsive mobile menu with large tap targets</li>
          <li>Alternative text and semantic page landmarks</li>
          <li>Reduced-motion support for sensitive visitors</li>
          <li>Clear form labels, status messages and recovery paths</li>
          <li>Spoken cooking steps and keyboard-controlled Cook Mode</li>
          <li>Offline access to previously visited kitchen pages</li>
        </ul>
      </section>

      <section className="story-cta">
        <p className="eyebrow">See the outcome</p>
        <h2>Now, make the kitchen yours.</h2>
        <div><a className="button" href="/kitchen">Open My Kitchen →</a><a className="text-link" href="/cuisines">Choose a recipe →</a></div>
      </section>

      <footer><div className="brand"><span className="brand-mark">CS</span><span><b>The Copper Spoon</b><small>Food made with heart</small></span></div><p>Purpose · Process · Reflection</p><p>© 2026 The Copper Spoon</p></footer>
    </main>
  );
}
