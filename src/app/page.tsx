import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Test your typing speed
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            PanicType
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-4 leading-relaxed">
          Race against the clock. Track your progress.
          <br />
          <span className="text-gray-500">Climb the global leaderboard.</span>
        </p>

        <p className="text-sm text-gray-600 mb-10 max-w-lg">
          Type the given text as fast as you can. Your WPM and accuracy are
          tracked, and your best scores land on the global leaderboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/play"
            className="group px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
          >
            Start Typing
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="px-8 py-4 rounded-xl text-lg font-semibold text-gray-300 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:scale-105"
          >
            View Leaderboard
          </Link>
        </div>

        {/* Floating keyboard animation hint */}
        <div className="absolute bottom-12 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-gray-200">Why </span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              PanicType
            </span>
            <span className="text-gray-200">?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Instant Feedback
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                See every correct and incorrect keystroke highlighted in
                real-time. Your WPM updates live as you type.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Global Leaderboard
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Compete with typists worldwide. Your fastest scores are ranked
                on the global leaderboard for all to see.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Track Progress
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your personal profile tracks every game. Watch your average WPM
                and accuracy improve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-gray-600 text-sm">
          Made with ❤️ —{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            PanicType
          </span>
        </p>
      </footer>
    </div>
  );
}
