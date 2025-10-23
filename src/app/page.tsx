import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-white mb-6">
          Next.js on Cloudflare Workers
        </h1>
        <p className="text-2xl text-white mb-10 leading-relaxed">
          Successfully deployed with SSR support!
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-8 py-4 border-2 border-white text-xl font-bold text-white bg-[#1f1f1f] hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
        >
          View GitHub Dashboard
        </Link>
      </div>
    </div>
  );
}
