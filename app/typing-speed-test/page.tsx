"use client";

import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import type { TypingStats, TestState, WordCount } from "../types/typing-test";
import { generateRandomWords } from "../utils/word-dictionary";

const WORD_COUNT_OPTIONS: WordCount[] = [10, 25, 50, 100, 200];

const PRESET_WORD_SETS = [
  [
    "produce",
    "river",
    "wind",
    "since",
    "travel",
    "final",
    "hour",
    "test",
    "into",
    "blue",
    "well",
    "wood",
    "were",
    "problem",
    "machine",
    "run",
    "piece",
    "between",
    "remember",
    "work",
    "beauty",
    "best",
    "such",
    "left",
    "with",
  ],
];

const DEFAULT_WORDS = PRESET_WORD_SETS[0];

export const TypingSpeedTest = () => {
  const [wordCount, setWordCount] = useState<WordCount>(25);
  const [words, setWords] = useState<string[]>(DEFAULT_WORDS);
  const [userInput, setUserInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [testState, setTestState] = useState<TestState>({
    isActive: false,
    isComplete: false,
    startTime: 0,
  });
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const generateNewWords = () => {
    const currentIndex = PRESET_WORD_SETS.findIndex(
      (set) =>
        set.length === words.length && set.every((word, i) => word === words[i])
    );
    const nextIndex = (currentIndex + 1) % PRESET_WORD_SETS.length;
    const newWords = PRESET_WORD_SETS[nextIndex];

    setWords(newWords);
    setUserInput("");
    setCurrentWordIndex(0);
    setTestState({
      isActive: false,
      isComplete: false,
      startTime: 0,
    });
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
    });
  };

  const handleWordCountChange = (count: WordCount) => {
    setWordCount(count);
    const newWords = generateRandomWords(count);
    setWords(newWords);
    setUserInput("");
    setCurrentWordIndex(0);
    setTestState({
      isActive: false,
      isComplete: false,
      startTime: 0,
    });
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
    });
  };

  const startTest = () => {
    if (!testState.isActive) {
      setTestState({
        isActive: true,
        isComplete: false,
        startTime: Date.now(),
      });
      inputRef.current?.focus();
    }
  };

  const calculateStats = () => {
    if (!testState.isActive) return;

    const timeElapsed = (Date.now() - testState.startTime) / 1000 / 60;
    const wordsTyped = currentWordIndex;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

    let totalChars = 0;
    let correctChars = 0;

    for (let i = 0; i < currentWordIndex; i++) {
      const targetWord = words[i];
      totalChars += targetWord.length;
      correctChars += targetWord.length;
    }

    if (userInput.length > 0) {
      const targetWord = words[currentWordIndex];
      totalChars += userInput.length;
      for (let i = 0; i < Math.min(userInput.length, targetWord.length); i++) {
        if (userInput[i] === targetWord[i]) {
          correctChars++;
        }
      }
    }

    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const errors = totalChars - correctChars;

    setStats({
      wpm,
      accuracy,
      errors,
      timeElapsed: Math.round((Date.now() - testState.startTime) / 1000),
    });
  };

  useEffect(() => {
    if (!testState.isActive) return;

    const interval = setInterval(calculateStats, 100);
    return () => clearInterval(interval);
  }, [testState.isActive, userInput, currentWordIndex, testState.startTime]);

  const handleInputChange = (value: string) => {
    if (!testState.isActive) {
      startTest();
    }

    if (testState.isComplete) return;

    if (value.endsWith(" ")) {
      if (currentWordIndex === words.length - 1) {
        setTestState((prev) => ({
          ...prev,
          isActive: false,
          isComplete: true,
        }));
        calculateStats();
        return;
      }

      setCurrentWordIndex((prev) => prev + 1);
      setUserInput("");
      return;
    }

    setUserInput(value);
  };

  const getWordClass = (index: number) => {
    if (index < currentWordIndex) {
      return "text-gray-400";
    }

    if (index === currentWordIndex) {
      return "text-gray-900";
    }

    return "text-gray-500";
  };

  const getCharClass = (wordIndex: number, charIndex: number) => {
    if (wordIndex !== currentWordIndex) {
      return "";
    }

    if (charIndex >= userInput.length) {
      return "";
    }

    if (userInput[charIndex] === words[wordIndex][charIndex]) {
      return "text-green-700";
    }

    return "text-red-700 bg-red-100";
  };

  const getContainerHeight = () => {
    if (wordCount <= 25) return "h-48";
    if (wordCount <= 50) return "h-64";
    if (wordCount <= 100) return "h-96";
    return "h-[28rem]";
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='flex py-4 items-center justify-between'>
        <h2 className='text-xl font-bold'>Typing Speed Test</h2>
        <button
          onClick={generateNewWords}
          className='cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-100 border border-gray-300'
        >
          Randomise
        </button>
      </div>

      <div className='flex justify-between items-center w-full mb-4'>
        <div className='flex gap-2'>
          {WORD_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              onClick={() => handleWordCountChange(count)}
              className={classNames(
                "px-4 py-2 rounded-md transition-all duration-100 border cursor-pointer",
                wordCount === count
                  ? "bg-gray-300 font-bold border-gray-400"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              )}
            >
              {count}
            </button>
          ))}
        </div>

        <div className='flex gap-6'>
          <div className='text-center'>
            <div className='text-gray-600 text-sm'>WPM</div>
            <div className='font-bold'>{stats.wpm}</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-600 text-sm'>ACC</div>
            <div className='font-bold'>{stats.accuracy}%</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-600 text-sm'>Time</div>
            <div className='font-bold'>{stats.timeElapsed}s</div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "bg-white p-6 rounded-lg mb-4 overflow-auto border border-gray-300",
          getContainerHeight()
        )}
        suppressHydrationWarning
      >
        <div
          className='text-lg leading-tight flex flex-wrap gap-2'
          suppressHydrationWarning
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className={getWordClass(wordIndex)}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={getCharClass(wordIndex, charIndex)}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div>
        <input
          ref={inputRef}
          type='text'
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={testState.isComplete}
          className={classNames(
            "w-full bg-white p-4 border border-gray-300 rounded-lg text-xl",
            testState.isComplete && "opacity-50 cursor-not-allowed"
          )}
          placeholder='Start typing to begin...'
          autoComplete='off'
          autoCapitalize='off'
          autoCorrect='off'
        />
      </div>
    </div>
  );
};

export default TypingSpeedTest;
