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
      <div className='flex py-4 items-center justify-between'>
        <div></div>
        <div className='space-x-2'>
          <button
            onClick={compare}
            className='cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-100 border border-gray-300'
          >
            Compare
          </button>
          <button
            onClick={swap}
            className='cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all duration-100 border border-gray-300'
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
            className='w-full bg-white p-2 border border-gray-300 rounded-sm h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 left-2 text-gray-600 text-sm'>
            {firstText.length}
          </div>
        </div>
        <div className='relative flex-1 shrink-0'>
          <textarea
            value={secondText}
            onChange={(e) => setSecondText(e.target.value)}
            className='w-full bg-white p-2 border border-gray-300 rounded-sm h-[60vh]'
          ></textarea>
          <div className='absolute bottom-2 left-2 text-gray-600 text-sm'>
            {secondText.length}
          </div>
        </div>
      </div>

      {diff.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold mb-2'>
            Diff Result:
          </h3>
          <pre className='bg-white border border-gray-300 p-4 rounded-md overflow-auto max-h-96'>
            {diff.map((item, idx) => (
              <div
                key={idx}
                className={classNames(
                  item.operation === "insert" && "bg-green-100 text-green-800",
                  item.operation === "delete" && "bg-red-100 text-red-800",
                  item.operation === "equal" && "text-gray-600"
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
