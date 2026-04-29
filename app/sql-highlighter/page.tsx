"use client";

import { useState, useMemo } from "react";
import classNames from "classnames";
import {
  validateSQL,
  tokenizeSQL,
  highlightSQLWithTokens,
} from "../utils/sql-validator";
import type { SqlValidationResult } from "../types/sql-validator";

export const SQLSyntaxValidator = () => {
  const [sqlText, setSqlText] = useState("");

  const validation = useMemo<SqlValidationResult>(() => {
    if (!sqlText.trim()) {
      return { isValid: true, errors: [] };
    }
    return validateSQL(sqlText);
  }, [sqlText]);

  const getHighlightedSQL = () => {
    if (!sqlText) return "";
    const tokens = tokenizeSQL(sqlText);
    return highlightSQLWithTokens(sqlText, tokens);
  };

  return (
    <div className='w-full'>
      <div className='flex py-4 items-center justify-between'>
        {sqlText.trim() && (
          <div
            className={classNames(
              "px-4 py-2 rounded-md font-semibold border",
              validation.isValid
                ? "bg-saffron/15 text-black border-saffron/40"
                : "bg-rust/10 text-black border-rust/30"
            )}
          >
            {validation.isValid ? "✓ Valid SQL" : "✗ Invalid SQL"}
          </div>
        )}
      </div>

      {validation.errors.length > 0 && (
        <div className='mb-4 space-y-2'>
          {validation.errors.map((error, index) => (
            <div
              key={index}
              className={classNames(
                "p-4 rounded-lg border",
                error.severity === "error"
                  ? "bg-rust/10 border-rust/30"
                  : "bg-saffron/15 border-saffron/40"
              )}
            >
              <div className='flex items-start gap-2'>
                <span
                  className={classNames(
                    "font-bold text-xs uppercase px-2 py-1 rounded",
                    error.severity === "error"
                      ? "bg-rust/20 text-black"
                      : "bg-saffron/30 text-black"
                  )}
                >
                  {error.severity}
                </span>
                <p
                  className={classNames(
                    "flex-1",
                    error.severity === "error"
                      ? "text-black"
                      : "text-black"
                  )}
                >
                  {error.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='relative flex-1'>
          <label className='block mb-2'>Input SQL:</label>
          <textarea
            value={sqlText}
            onChange={(e) => setSqlText(e.target.value)}
            className='w-full bg-white p-4 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh] font-mono'
            placeholder='Enter your SQL query here...'
          />
        </div>

        <div className='relative flex-1'>
          <label className='block mb-2'>Syntax Highlighted:</label>
          <div
            className={classNames(
              "w-full bg-white p-4 border border-walnut/20 rounded-sm h-[40vh] md:h-[60vh] font-mono overflow-auto",
              "whitespace-pre-wrap"
            )}
            dangerouslySetInnerHTML={{ __html: getHighlightedSQL() }}
          />
        </div>
      </div>
    </div>
  );
};

export default SQLSyntaxValidator;
