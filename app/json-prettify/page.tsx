"use client";

import { useState, useRef } from "react";
import type { JsonError } from "../types/json-prettify";
import { useSyncedHeight } from "../hooks/useSyncedHeight";

export const JSONPrettify = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<JsonError | null>(null);
  const [indentSize, setIndentSize] = useState(2);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  useSyncedHeight(inputRef, outputRef);

  const prettifyJSON = () => {
    if (!input.trim()) {
      setError({ message: "Input is empty" });
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
      setError({ message: errorMessage });
      setOutput("");
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setError({ message: "Input is empty" });
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
      setError({ message: errorMessage });
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      setError({ message: "Failed to copy to clipboard" });
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className='w-full'>
      <div className='flex py-4 items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <label className='text-sm'>Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className='bg-white px-2 py-1 rounded border border-walnut/20'
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 mb-4'>
        <button
          onClick={prettifyJSON}
          className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
        >
          Prettify
        </button>
        <button
          onClick={minifyJSON}
          className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
        >
          Minify
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
          >
            Copy Output
          </button>
        )}
        <button
          onClick={clearAll}
          className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
        >
          Clear
        </button>
      </div>

      {error && (
        <div className='bg-rust/10 border border-rust/30 p-4 rounded-lg mb-4'>
          <h3 className='text-black font-bold mb-1'>Error</h3>
          <p className='text-black/80 text-sm'>{error.message}</p>
        </div>
      )}

      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='relative flex-1'>
          <label className='block mb-2'>Input JSON:</label>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full bg-white p-4 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh] font-mono'
            placeholder='{"name": "example", "value": 123}'
          />
          <div className='absolute bottom-4 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
            {input.length} characters
          </div>
        </div>

        <div className='relative flex-1'>
          <label className='block mb-2'>Output:</label>
          <textarea
            ref={outputRef}
            value={output}
            readOnly
            className='w-full bg-white p-4 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh] font-mono'
            placeholder='Formatted JSON will appear here...'
          />
          <div className='absolute bottom-4 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
            {output.length} characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONPrettify;
