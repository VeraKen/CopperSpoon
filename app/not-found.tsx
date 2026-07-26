export default function NotFound() {
  return (
    <main className="recovery-page">
      <div>
        <span aria-hidden="true">🥄</span>
        <p className="eyebrow">404 · Missing from the table</p>
        <h1>We could not find that page.</h1>
        <p>The recipe may have moved, but there is always something good waiting in the kitchen.</p>
        <div className="recovery-actions">
          <a className="button" href="/cuisines">Explore recipes</a>
          <a className="text-link" href="/desserts">Browse desserts</a>
        </div>
      </div>
    </main>
  );
}
