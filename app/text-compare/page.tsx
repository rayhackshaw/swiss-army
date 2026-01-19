"use client";

import { useTextCompare } from "../hooks/useTextCompare";

export default function TextComparePage() {
  const {
    firstText,
    setFirstText,
    secondText,
    setSecondText,
    diff,
    compare,
    swap,
  } = useTextCompare();

  return (
    <div className='w-full'>
      <div className='flex py-4 items-center justify-between'>
        <div></div>
        <div className='space-x-2'>
          <button
            onClick={compare}
            className='cursor-pointer p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-100'
          >
            Compare
          </button>
          <button
            onClick={swap}
            className='cursor-pointer p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-100'
          >
            Swap
          </button>
        </div>
        <div></div>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
        <div className='relative flex-1 shrink-0'>
          <textarea
            value={firstText}
            onChange={(e) => setFirstText(e.target.value)}
            className='w-full text-white bg-gray-800 p-2 border rounded-sm h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 text-white left-2'>
            {firstText.length}
          </div>
        </div>
        <div className='relative flex-1 shrink-0'>
          <textarea
            value={secondText}
            onChange={(e) => setSecondText(e.target.value)}
            className='w-full text-white bg-gray-800 p-2 border rounded-sm h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 text-white left-2'>
            {secondText.length}
          </div>
        </div>
      </div>

      {diff.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-gray-900 text-lg font-semibold mb-2'>
            Diff Result:
          </h3>
          <pre className='bg-gray-900 text-white p-4 rounded-md overflow-auto max-h-96'>
            {diff.map((item, idx) => (
              <div
                key={idx}
                className={
                  item.operation === "insert"
                    ? "bg-green-900/30 text-green-300"
                    : item.operation === "delete"
                    ? "bg-red-900/30 text-red-300"
                    : "text-gray-400"
                }
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
}
