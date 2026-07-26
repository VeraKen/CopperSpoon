"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaRegister() {
  const [online, setOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const wentOnline = () => setOnline(true);
    const wentOffline = () => setOnline(false);
    const canInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const appInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("online", wentOnline);
    window.addEventListener("offline", wentOffline);
    window.addEventListener("beforeinstallprompt", canInstall);
    window.addEventListener("appinstalled", appInstalled);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    return () => {
      window.removeEventListener("online", wentOnline);
      window.removeEventListener("offline", wentOffline);
      window.removeEventListener("beforeinstallprompt", canInstall);
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  }

  return (
    <>
      {!online && <div className="offline-banner" role="status"><span>Offline kitchen</span> Saved recipes and previously visited pages are still available.</div>}
      {installPrompt && !installed && <button className="install-app-button" type="button" onClick={install}><span>＋</span> Install Copper Spoon</button>}
    </>
  );
}
