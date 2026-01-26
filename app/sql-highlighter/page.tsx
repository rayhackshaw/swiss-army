"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  validateSQL,
  tokenizeSQL,
  highlightSQLWithTokens,
} from "../utils/sql-validator";
import type { SqlValidationResult } from "../types/sql-validator";

export const SQLSyntaxValidator = () => {
  const [sqlText, setSqlText] = useState("");
  const [validation, setValidation] = useState<SqlValidationResult>({
    isValid: true,
    errors: [],
  });

  useEffect(() => {
    if (!sqlText.trim()) {
      setValidation({ isValid: true, errors: [] });
      return;
    }

    const result = validateSQL(sqlText);
    setValidation(result);
  }, [sqlText]);

  const getHighlightedSQL = () => {
    if (!sqlText) return "";
    const tokens = tokenizeSQL(sqlText);
    return highlightSQLWithTokens(sqlText, tokens);
  };

  return (
    <div className='w-full'>
      <div className='flex py-4 items-center justify-between'>
        <h2 className='text-xl font-bold'>SQL Syntax Validator</h2>
        {sqlText.trim() && (
          <div
            className={classNames(
              "px-4 py-2 rounded-md font-semibold border",
              validation.isValid
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-red-50 text-red-700 border-red-300"
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
                  ? "bg-red-50 border-red-300"
                  : "bg-yellow-50 border-yellow-300"
              )}
            >
              <div className='flex items-start gap-2'>
                <span
                  className={classNames(
                    "font-bold text-xs uppercase px-2 py-1 rounded",
                    error.severity === "error"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  )}
                >
                  {error.severity}
                </span>
                <p
                  className={classNames(
                    "flex-1",
                    error.severity === "error"
                      ? "text-red-700"
                      : "text-yellow-700"
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
            className='w-full bg-white p-4 border border-gray-300 rounded-sm h-[60vh] font-mono'
            placeholder='Enter your SQL query here...'
          />
        </div>

        <div className='relative flex-1'>
          <label className='block mb-2'>Syntax Highlighted:</label>
          <div
            className={classNames(
              "w-full bg-white p-4 border border-gray-300 rounded-sm h-[60vh] font-mono overflow-auto",
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
