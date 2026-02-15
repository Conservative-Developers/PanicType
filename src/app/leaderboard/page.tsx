"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  createdAt: string;
  user: {
    username: string;
  };
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard?limit=50")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-amber-400 font-bold text-lg";
    if (rank === 2) return "text-gray-300 font-bold text-lg";
    if (rank === 3) return "text-orange-400 font-bold text-lg";
    return "text-gray-500";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">🏆 Leaderboard</h1>
          <p className="text-gray-500 text-sm">
            Top typists ranked by Words Per Minute
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
              <p className="text-gray-500 mt-4 text-sm">Loading rankings...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-lg mb-2">No results yet</p>
              <p className="text-gray-600 text-sm">
                Be the first to play and set a record!
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    WPM
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Accuracy
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {entries.map((entry, i) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className={getRankStyle(i + 1)}>
                        {getRankIcon(i + 1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">
                        {entry.user.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        {Math.round(entry.wpm)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden sm:table-cell">
                      <span className="text-gray-400">
                        {Math.round(entry.accuracy)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell">
                      <span className="text-gray-600 text-sm">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
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
