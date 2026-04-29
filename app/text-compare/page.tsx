"use client";

import { useTextCompare } from "../hooks/useTextCompare";
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

  return (
    <div className='w-full'>
      <div className='flex py-4 justify-between'>
        <div></div>
        <div className='space-x-2 w-full'>
          <button
            onClick={compare}
            className='cursor-pointer p-2 rounded-md bg-silk hover:bg-saffron hover:text-black transition-all duration-100 border border-walnut/20'
          >
            Compare
          </button>
          <button
            onClick={swap}
            className='cursor-pointer p-2 rounded-md bg-silk hover:bg-saffron hover:text-black transition-all duration-100 border border-walnut/20'
          >
            Swap
          </button>
        </div>
        <div></div>
      </div>

      <div className='flex flex-col md:flex-row items-stretch gap-2 w-full'>
        <div className='relative flex-1 w-full'>
          <textarea
            value={firstText}
            onChange={(e) => setFirstText(e.target.value)}
            className='w-full bg-white p-2 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
            {firstText.length} characters
          </div>
        </div>
        <div className='relative flex-1 w-full'>
          <textarea
            value={secondText}
            onChange={(e) => setSecondText(e.target.value)}
            className='w-full bg-white p-2 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 left-2 text-black/60 text-xs bg-silk px-2 py-1 rounded'>
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
