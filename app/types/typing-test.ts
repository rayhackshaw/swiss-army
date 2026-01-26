export type WordCount = 10 | 25 | 50 | 100 | 200;

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
}

export interface TestState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number;
}

export interface CharacterStatus {
  char: string;
  status: "pending" | "correct" | "incorrect" | "extra";
  wordIndex: number;
  charIndex: number;
}
