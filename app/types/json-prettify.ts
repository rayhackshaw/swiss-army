export interface JsonError {
  message: string;
  line?: number;
}

export interface JsonPrettifyState {
  input: string;
  output: string;
  error: JsonError | null;
  indentSize: number;
}
