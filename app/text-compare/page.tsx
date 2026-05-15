"use client";

import { useRef } from "react";
import { useTextCompare } from "../hooks/useTextCompare";
import { useSyncedHeight } from "../hooks/useSyncedHeight";
import classNames from "classnames";

export const TextComparePage = () => {
  const {
    firstText,
    setFirstText,
    secondText,
    setSecondText,
    diff,
    compare,
    swap,
  } = useTextCompare();

  const firstRef = useRef<HTMLTextAreaElement>(null);
  const secondRef = useRef<HTMLTextAreaElement>(null);
  useSyncedHeight(firstRef, secondRef);

  return (
    <div className='w-full'>
      <div className='flex py-4 justify-between'>
        <div></div>
        <div className='space-x-2 w-full'>
          <button
            onClick={compare}
            className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
          >
            Compare
          </button>
          <button
            onClick={swap}
            className='cursor-pointer px-4 py-2 rounded-md bg-silk-light text-walnut font-medium border border-walnut/15 shadow-sm hover:bg-silk hover:border-walnut/30 active:translate-y-px transition-all duration-150'
          >
            Swap
          </button>
        </div>
        <div></div>
      </div>

      <div className='flex flex-col md:flex-row items-stretch gap-2 w-full'>
        <div className='relative flex-1 w-full'>
          <textarea
            ref={firstRef}
            value={firstText}
            onChange={(e) => setFirstText(e.target.value)}
            className='w-full bg-white p-2 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh]'
          ></textarea>
          <div className='absolute bottom-4 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
            {firstText.length} characters
          </div>
        </div>
        <div className='relative flex-1 w-full'>
          <textarea
            ref={secondRef}
            value={secondText}
            onChange={(e) => setSecondText(e.target.value)}
            className='w-full bg-white p-2 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh]'
          ></textarea>
          <div className='absolute bottom-4 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
            {secondText.length} characters
          </div>
        </div>
      </div>

      {diff.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold mb-2'>Diff Result:</h3>
          <pre className='bg-white border border-walnut/20 p-4 rounded-md overflow-auto max-h-96'>
            {diff.map((item, idx) => (
              <div
                key={idx}
                className={classNames(
                  item.operation === "insert" && "bg-green-100 text-green-800",
                  item.operation === "delete" && "bg-red-100 text-red-800",
                  item.operation === "equal" && "text-black/60"
                )}
              >
                {item.operation === "insert"
                  ? "+ "
                  : item.operation === "delete"
                  ? "- "
                  : "  "}
                {item.text}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TextComparePage;
