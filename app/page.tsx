// app/page.tsx
import Link from "next/link";
import { headers } from "next/headers";
import ServerSyncedClock from "./ServerSyncedClock"; // adjust path if needed
import { Server } from "http";


export default async function Home() {
  const h = headers();
  //In production (behind a proxy), platforms set x-forwarded-proto/x-forwarded-host.
  //Locally, you’ll have host like localhost:3000 and default to http.
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;

  const res = await fetch(`${base}/api/hello`, { cache: "no-store" });
  const data = await res.json();
  const serverEpochMs = new Date(data.timestamp).getTime();

  // GitHub URL from env variables ELSE fallback
  const gitHubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/yourname/hello-beautiful-world";

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="blur-blob" />

      <div className="w-full max-w-2xl rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 text-center">
          Hello, <span className="text-pink-400">Beautiful</span> World
        </h1>
        <p className="mt-4 text-center text-slate-600">
          Next.js + Tailwind app. Built for Docker • Azure • GitHub Actions.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card title="API" href="/api/hello" subtitle="JSON endpoint" />
          <Card title="Repo" href={gitHubUrl} subtitle="Version control" />
          <Card title="Deploy" href="https://portal.azure.com/" subtitle="Azure App Service" />
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            <span>Server says:  </span>
            <code className="px-2 py-1 rounded bg-slate-100 border border-slate-200">
              {data.message}
            </code>
          </p>
          
          <p className="mt-4">
            <span>Client responds:  </span>
            <code className="px-2 py-1 text-pink-400">
              <span>No, it's </span>
              <ServerSyncedClock serverEpochMs={serverEpochMs} />
              <span>!</span>
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}

function Card({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow hover:shadow-md transition-shadow"
    >
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-500">{subtitle}</div>
    </Link>
  );
}