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
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    if (gameState === "idle") return "bg-blue-200 border-blue-400";
    if (gameState === "waiting") return "bg-red-200 border-red-400";
    if (gameState === "ready") return "bg-green-200 border-green-400";
    if (gameState === "tooEarly") return "bg-orange-200 border-orange-400";
    return "bg-blue-200 border-blue-400";
  };

  const getMessage = () => {
    if (gameState === "idle") return "Click to Start";
    if (gameState === "waiting") return "Wait for Green...";
    if (gameState === "ready") return "CLICK NOW!";
    if (gameState === "tooEarly") return "Too Early! Click to Try Again";
    return `${stats.currentTime}ms - Click to Continue`;
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='flex py-4 items-center justify-between'>
        <h2 className='text-xl font-bold'>Reaction Speed Test</h2>
        {results.length > 0 && (
          <button
            onClick={reset}
            className='cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-100 border border-gray-300'
          >
            Reset
          </button>
        )}
      </div>

      {stats.attempts > 0 && (
        <div className='bg-gray-100 p-6 rounded-lg mb-4 border border-gray-300'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <div className='text-gray-600 text-sm'>Best Time</div>
              <div className='text-green-700 text-2xl font-bold'>
                {stats.bestTime}ms
              </div>
            </div>
            <div>
              <div className='text-gray-600 text-sm'>Average</div>
              <div className='text-2xl font-bold'>{stats.averageTime}ms</div>
            </div>
            <div>
              <div className='text-gray-600 text-sm'>Attempts</div>
              <div className='text-2xl font-bold'>{stats.attempts}</div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        className={classNames(
          "w-full h-96 rounded-lg transition-all duration-200",
          "flex items-center justify-center",
          "text-4xl font-bold border-4",
          "cursor-pointer hover:opacity-90",
          getBackgroundColor()
        )}
      >
        {getMessage()}
      </button>

      {results.length > 0 && (
        <div className='mt-6 bg-gray-100 p-6 rounded-lg border border-gray-300'>
          <h3 className='text-lg font-bold mb-4'>History</h3>
          <div className='space-y-2 max-h-64 overflow-y-auto'>
            {results.map((result, index) => (
              <div
                key={index}
                className='flex justify-between items-center bg-white p-3 rounded border border-gray-300'
              >
                <span className='text-gray-600'>Attempt {index + 1}</span>
                <span
                  className={classNames(
                    "font-bold",
                    result.time === stats.bestTime ? "text-green-700" : ""
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
