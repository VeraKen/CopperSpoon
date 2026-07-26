export const metadata = { title: "Offline Kitchen | The Copper Spoon" };

export default function OfflinePage() {
  return (
    <main className="recovery-page">
      <div>
        <span aria-hidden="true">🥘</span>
        <p className="eyebrow">Your kitchen is offline</p>
        <h1>The connection needs a moment.</h1>
        <p>Previously visited recipes and your My Kitchen plan may still work. Reconnect to explore the complete collection.</p>
        <div className="recovery-actions">
          <a className="button" href="/kitchen">Open My Kitchen</a>
          <a className="text-link" href="/">Reconnect, then try again</a>
        </div>
      </div>
    </main>
  );
}
