"use client";

import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import type {
  GameState,
  ReactionResult,
  ReactionStats,
} from "../types/reaction-test";

export const ReactionSpeedTest = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [results, setResults] = useState<ReactionResult[]>([]);
  const [stats, setStats] = useState<ReactionStats>({
    currentTime: 0,
    bestTime: 0,
    averageTime: 0,
    attempts: 0,
  });

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const calculateStats = (newResults: ReactionResult[]) => {
    if (newResults.length === 0) return;

    const times = newResults.map((r) => r.time);
    const bestTime = Math.min(...times);
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;

    setStats({
      currentTime: times[times.length - 1],
      bestTime,
      averageTime: Math.round(averageTime),
      attempts: newResults.length,
    });
  };

  const startGame = () => {
    setGameState("waiting");
    const randomDelay = Math.random() * 3000 + 1000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("ready");
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === "idle") {
      startGame();
      return;
    }

    if (gameState === "waiting") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState("tooEarly");
      return;
    }

    if (gameState === "ready") {
      const reactionTime = Date.now() - startTimeRef.current;
      const newResult: ReactionResult = {
        time: reactionTime,
        timestamp: new Date(),
      };
      const newResults = [...results, newResult];
      setResults(newResults);
      calculateStats(newResults);
      setGameState("result");
      return;
    }

    if (gameState === "result" || gameState === "tooEarly") {
      startGame();
      return;
    }
  };

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGameState("idle");
    setResults([]);
    setStats({
      currentTime: 0,
      bestTime: 0,
      averageTime: 0,
      attempts: 0,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    if (gameState === "idle") return "bg-violet border-violet text-white";
    if (gameState === "waiting") return "bg-rust border-rust text-white";
    if (gameState === "ready") return "bg-saffron border-saffron text-black";
    if (gameState === "tooEarly") return "bg-walnut border-walnut text-white";
    return "bg-violet border-violet text-white";
  };

  const getMessage = () => {
    if (gameState === "idle") return "Click or Press Space to Start";
    if (gameState === "waiting") return "Wait for Green...";
    if (gameState === "ready") return "CLICK NOW!";
    if (gameState === "tooEarly") return "Too Early! Click to Try Again";
    return `${stats.currentTime}ms - Click or Space to Continue`;
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='flex py-4 items-center justify-between'>
        {results.length > 0 && (
          <button
            onClick={reset}
            className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
          >
            Reset
          </button>
        )}
      </div>

      {stats.attempts > 0 && (
        <div className='bg-white p-6 rounded-lg mb-4 border border-walnut/20'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <div className='text-black/60 text-sm'>Best Time</div>
              <div className='text-saffron text-2xl font-bold'>
                {stats.bestTime}ms
              </div>
            </div>
            <div>
              <div className='text-black/60 text-sm'>Average</div>
              <div className='text-2xl font-bold'>{stats.averageTime}ms</div>
            </div>
            <div>
              <div className='text-black/60 text-sm'>Attempts</div>
              <div className='text-2xl font-bold'>{stats.attempts}</div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        className={classNames(
          "w-full h-96 transition-all duration-200",
          "flex items-center justify-center",
          "text-4xl font-bold border",
          "cursor-pointer hover:opacity-90",
          getBackgroundColor()
        )}
      >
        {getMessage()}
      </button>

      {results.length > 0 && (
        <div className='mt-6 bg-white p-6 rounded-lg border border-walnut/20'>
          <h3 className='text-lg font-bold mb-4'>History</h3>
          <div className='space-y-2 max-h-64 overflow-y-auto'>
            {results.map((result, index) => (
              <div
                key={index}
                className='flex justify-between items-center bg-silk-light p-3 rounded border border-walnut/20'
              >
                <span className='text-gray-600'>Attempt {index + 1}</span>
                <span
                  className={classNames(
                    "font-bold",
                    result.time === stats.bestTime ? "text-saffron" : ""
                  )}
                >
                  {result.time}ms
                  {result.time === stats.bestTime && " (Best!)"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionSpeedTest;
