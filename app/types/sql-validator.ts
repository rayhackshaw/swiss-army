export interface SqlError {
  message: string;
  line?: number;
  severity: "error" | "warning";
}

export interface SqlValidationResult {
  isValid: boolean;
  errors: SqlError[];
}

export interface TokenMatch {
  type: "keyword" | "string" | "comment" | "number" | "operator" | "text";
  value: string;
  start: number;
  end: number;
}
