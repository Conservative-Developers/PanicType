"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { getRandomText } from "@/lib/texts";

type GameState = "idle" | "playing" | "finished";

interface GameResult {
  wpm: number;
  accuracy: number;
  textLength: number;
  duration: number;
}

export default function TypingGame() {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [result, setResult] = useState<GameResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = useCallback(() => {
    setText(getRandomText());
    setInput("");
    setGameState("idle");
    setStartTime(0);
    setCurrentTime(0);
    setResult(null);
    setSaving(false);
    setSaved(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const getElapsedSeconds = () => {
    if (startTime === 0) return 0;
    return (currentTime - startTime) / 1000;
  };

  const getCurrentWPM = () => {
    const elapsed = getElapsedSeconds();
    if (elapsed < 1) return 0;
    const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
    return Math.round((wordsTyped / elapsed) * 60);
  };

  const calculateAccuracy = () => {
    if (input.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
    }
    return Math.round((correct / input.length) * 100);
  };

  const finishGame = useCallback(
    async (finalInput: string) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      const words = text.trim().split(/\s+/).length;
      const wpm = Math.round((words / duration) * 60);

      let correct = 0;
      for (let i = 0; i < finalInput.length; i++) {
        if (finalInput[i] === text[i]) correct++;
      }
      const accuracy = Math.round((correct / finalInput.length) * 100);

      const gameResult: GameResult = {
        wpm,
        accuracy,
        textLength: text.length,
        duration: Math.round(duration * 100) / 100,
      };

      setResult(gameResult);
      setGameState("finished");

      if (session?.user) {
        setSaving(true);
        try {
          await fetch("/api/results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameResult),
          });
          setSaved(true);
        } catch {
          // silently fail
        } finally {
          setSaving(false);
        }
      }
    },
    [startTime, text, session],
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (gameState === "idle") {
        setGameState("playing");
        const now = Date.now();
        setStartTime(now);
        setCurrentTime(now);
      }

      setInput(value);

      if (value.length >= text.length) {
        finishGame(value);
      }
    },
    [gameState, text, finishGame],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      initGame();
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const renderText = () => {
    return text.split("").map((char, i) => {
      let className = "text-gray-500"; // not yet typed

      if (i < input.length) {
        className =
          input[i] === char
            ? "text-emerald-400" // correct
            : "text-red-400 bg-red-400/10"; // incorrect
      }

      if (i === input.length) {
        className += " border-l-2 border-violet-400 animate-pulse";
      }

      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto" onKeyDown={handleKeyDown}>
      {/* Stats Bar */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tabular-nums">
              {gameState === "playing" ? getCurrentWPM() : (result?.wpm ?? 0)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              WPM
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-200 tabular-nums">
              {gameState === "playing"
                ? calculateAccuracy()
                : (result?.accuracy ?? 100)}
              <span className="text-lg text-gray-500">%</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Accuracy
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-200 tabular-nums">
              {gameState === "playing"
                ? Math.floor(getElapsedSeconds())
                : result?.duration
                  ? Math.floor(result.duration)
                  : 0}
              <span className="text-lg text-gray-500">s</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Time
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {gameState === "finished" && saving && (
            <span className="text-xs text-gray-500 animate-pulse">
              Saving...
            </span>
          )}
          {gameState === "finished" && saved && (
            <span className="text-xs text-emerald-400">✓ Saved</span>
          )}
          {gameState === "finished" && !session && (
            <span className="text-xs text-amber-400">
              Sign in to save results
            </span>
          )}
        </div>
      </div>

      {/* Text Display */}
      <div
        className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 mb-4 cursor-text backdrop-blur-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="font-mono text-lg leading-relaxed tracking-wide select-none">
          {renderText()}
        </div>

        {/* Hidden input that captures keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={gameState === "finished"}
          className="absolute inset-0 opacity-0 cursor-text"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Idle State Overlay */}
        {gameState === "idle" && input.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/60 rounded-2xl backdrop-blur-[2px]">
            <div className="text-center">
              <p className="text-gray-400 text-lg">Start typing to begin</p>
              <p className="text-gray-600 text-sm mt-2">
                Click here or just start typing
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Finished State */}
      {gameState === "finished" && result && (
        <div className="mt-8 text-center">
          <div className="inline-flex flex-col items-center gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white">Race Complete!</h2>
            <div className="flex gap-10">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {result.wpm}
                </div>
                <div className="text-sm text-gray-500 mt-1">WPM</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-200">
                  {result.accuracy}%
                </div>
                <div className="text-sm text-gray-500 mt-1">Accuracy</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-200">
                  {result.duration}s
                </div>
                <div className="text-sm text-gray-500 mt-1">Duration</div>
              </div>
            </div>
            <button
              onClick={() => {
                initGame();
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              className="mt-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/20 cursor-pointer"
            >
              Play Again
            </button>
            <p className="text-gray-600 text-xs">
              or press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                Tab
              </kbd>{" "}
              to restart
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {gameState !== "finished" && (
        <div className="text-center mt-4">
          <p className="text-gray-600 text-xs">
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
              Tab
            </kbd>{" "}
            to get a new text
          </p>
        </div>
      )}
    </div>
  );
}
