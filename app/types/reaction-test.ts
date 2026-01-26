export type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

export interface ReactionResult {
  time: number;
  timestamp: Date;
}

export interface ReactionStats {
  currentTime: number;
  bestTime: number;
  averageTime: number;
  attempts: number;
}
