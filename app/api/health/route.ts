import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks = {
    siteUrl: Boolean(process.env.SITE_URL),
    emailDelivery: Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM),
    newsletterSecurity: Boolean(process.env.UNSUBSCRIBE_SECRET && process.env.CRON_SECRET),
    accountService: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };
  const ready = Object.values(checks).every(Boolean);

  return NextResponse.json(
    {
      status: ready ? "healthy" : "configuration-needed",
      service: "the-copper-spoon",
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: ready ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
