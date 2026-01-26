import type { SqlError, SqlValidationResult, TokenMatch } from "../types/sql-validator";

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP",
  "ALTER", "TABLE", "INDEX", "VIEW", "JOIN", "INNER", "LEFT", "RIGHT", "OUTER",
  "ON", "AS", "AND", "OR", "NOT", "IN", "LIKE", "BETWEEN", "IS", "NULL",
  "ORDER", "BY", "GROUP", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL", "DISTINCT",
  "COUNT", "SUM", "AVG", "MAX", "MIN", "CASE", "WHEN", "THEN", "ELSE", "END",
  "INTO", "VALUES", "SET", "DEFAULT", "PRIMARY", "KEY", "FOREIGN", "REFERENCES",
  "CONSTRAINT", "UNIQUE", "CHECK", "EXISTS", "ASC", "DESC"
];

export const tokenizeSQL = (sql: string): TokenMatch[] => {
  const tokens: TokenMatch[] = [];
  let i = 0;

  while (i < sql.length) {
    if (/\s/.test(sql[i])) {
      i++;
      continue;
    }

    if (sql[i] === "'" || sql[i] === '"') {
      const quote = sql[i];
      const start = i;
      i++;
      while (i < sql.length && sql[i] !== quote) {
        if (sql[i] === "\\") i++;
        i++;
      }
      i++;
      tokens.push({ type: "string", value: sql.slice(start, i), start, end: i });
      continue;
    }

    if (sql.slice(i, i + 2) === "--") {
      const start = i;
      while (i < sql.length && sql[i] !== "\n") i++;
      tokens.push({ type: "comment", value: sql.slice(start, i), start, end: i });
      continue;
    }

    if (sql.slice(i, i + 2) === "/*") {
      const start = i;
      i += 2;
      while (i < sql.length - 1 && sql.slice(i, i + 2) !== "*/") i++;
      i += 2;
      tokens.push({ type: "comment", value: sql.slice(start, i), start, end: i });
      continue;
    }

    if (/[0-9]/.test(sql[i])) {
      const start = i;
      while (i < sql.length && /[0-9.]/.test(sql[i])) i++;
      tokens.push({ type: "number", value: sql.slice(start, i), start, end: i });
      continue;
    }

    if (/[a-zA-Z_]/.test(sql[i])) {
      const start = i;
      while (i < sql.length && /[a-zA-Z0-9_]/.test(sql[i])) i++;
      const value = sql.slice(start, i);
      const type = SQL_KEYWORDS.includes(value.toUpperCase()) ? "keyword" : "text";
      tokens.push({ type, value, start, end: i });
      continue;
    }

    if (/[+\-*/<>=(),;.]/.test(sql[i])) {
      tokens.push({ type: "operator", value: sql[i], start: i, end: i + 1 });
      i++;
      continue;
    }

    i++;
  }

  return tokens;
};

export const validateSQL = (sql: string): SqlValidationResult => {
  if (!sql.trim()) {
    return { isValid: false, errors: [{ message: "SQL is empty", severity: "error" }] };
  }

  const errors: SqlError[] = [];
  const tokens = tokenizeSQL(sql);
  const keywordTokens = tokens.filter(t => t.type === "keyword");

  if (keywordTokens.length === 0) {
    errors.push({ message: "No SQL keywords found", severity: "warning" });
  }

  const hasValidStart = keywordTokens.length > 0 &&
    ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP"].includes(
      keywordTokens[0].value.toUpperCase()
    );

  if (!hasValidStart && keywordTokens.length > 0) {
    errors.push({
      message: `SQL should start with a valid statement (SELECT, INSERT, UPDATE, etc.)`,
      severity: "error"
    });
  }

  const selectTokens = keywordTokens.filter(t => t.value.toUpperCase() === "SELECT");
  const fromTokens = keywordTokens.filter(t => t.value.toUpperCase() === "FROM");

  if (selectTokens.length > 0 && fromTokens.length === 0) {
    errors.push({
      message: "SELECT statement is missing FROM clause",
      severity: "error"
    });
  }

  const unclosedStrings = tokens.filter(t => {
    if (t.type !== "string") return false;
    const quote = t.value[0];
    return !t.value.endsWith(quote);
  });

  if (unclosedStrings.length > 0) {
    errors.push({
      message: "Unclosed string literal found",
      severity: "error"
    });
  }

  let parenCount = 0;
  tokens.forEach(t => {
    if (t.value === "(") parenCount++;
    if (t.value === ")") parenCount--;
  });

  if (parenCount !== 0) {
    errors.push({
      message: `Mismatched parentheses (${parenCount > 0 ? "missing closing" : "missing opening"})`,
      severity: "error"
    });
  }

  return {
    isValid: errors.filter(e => e.severity === "error").length === 0,
    errors
  };
};

export const highlightSQLWithTokens = (sql: string, tokens: TokenMatch[]): string => {
  if (!sql) return "";

  let result = "";
  let lastEnd = 0;

  tokens.forEach(token => {
    if (token.start > lastEnd) {
      result += sql.slice(lastEnd, token.start);
    }

    const colorClass = {
      keyword: "text-blue-700 font-bold",
      string: "text-green-700",
      comment: "text-gray-500 italic",
      number: "text-orange-600",
      operator: "text-purple-700",
      text: "text-gray-900"
    }[token.type];

    result += `<span class="${colorClass}">${escapeHtml(token.value)}</span>`;
    lastEnd = token.end;
  });

  if (lastEnd < sql.length) {
    result += sql.slice(lastEnd);
  }

  return result;
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
