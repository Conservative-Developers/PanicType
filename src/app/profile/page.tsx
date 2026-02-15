"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TypingResult {
  id: string;
  wpm: number;
  accuracy: number;
  textLength: number;
  duration: number;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [results, setResults] = useState<TypingResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/results?limit=50")
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const bestWPM =
    results.length > 0 ? Math.max(...results.map((r) => r.wpm)) : 0;
  const avgWPM =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length)
      : 0;
  const avgAccuracy =
    results.length > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.accuracy, 0) / results.length,
        )
      : 0;

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-500/20">
              {session.user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {session.user?.name}
              </h1>
              <p className="text-gray-500 text-sm">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {Math.round(bestWPM)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Best WPM
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-200">{avgWPM}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Avg WPM
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-200">
              {avgAccuracy}%
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Avg Accuracy
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-200">
              {results.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Games Played
            </div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Recent Games</h2>
          </div>

          {results.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 mb-4">No games played yet</p>
              <Link
                href="/play"
                className="inline-block px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                Play Now
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    WPM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {results.map((result) => (
                  <tr
                    key={result.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        {Math.round(result.wpm)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {Math.round(result.accuracy)}%
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden sm:table-cell">
                      {result.duration}s
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 text-sm">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
