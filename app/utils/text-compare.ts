import type { DiffOperation, DiffResult } from '../types/text-compare';

export type { DiffOperation, DiffResult };

function splitLines(text: string): string[] {
  return text.split('\n');
}

function lcs(aLines: string[], bLines: string[], aIdx: number, bIdx: number): number {
  if (aIdx >= aLines.length || bIdx >= bLines.length) {
    return 0;
  }

  const dp: number[][] = Array(aLines.length - aIdx + 1)
    .fill(0)
    .map(() => Array(bLines.length - bIdx + 1).fill(0));

  for (let i = aLines.length - 1; i >= aIdx; i--) {
    for (let j = bLines.length - 1; j >= bIdx; j--) {
      if (aLines[i] === bLines[j]) {
        dp[i - aIdx][j - bIdx] = 1 + dp[i - aIdx + 1][j - bIdx + 1];
      } else {
        dp[i - aIdx][j - bIdx] = Math.max(
          dp[i - aIdx + 1][j - bIdx],
          dp[i - aIdx][j - bIdx + 1]
        );
      }
    }
  }

  return dp[0][0];
}

function myersLineDiff(
  aLines: string[],
  bLines: string[],
  aIdx: number,
  bIdx: number,
  result: DiffResult[]
): void {
  if (aIdx >= aLines.length && bIdx >= bLines.length) {
    return;
  }

  if (aIdx >= aLines.length) {
    while (bIdx < bLines.length) {
      result.push({ operation: 'insert', text: bLines[bIdx] });
      bIdx++;
    }
    return;
  }

  if (bIdx >= bLines.length) {
    while (aIdx < aLines.length) {
      result.push({ operation: 'delete', text: aLines[aIdx] });
      aIdx++;
    }
    return;
  }

  if (aLines[aIdx] === bLines[bIdx]) {
    result.push({ operation: 'equal', text: aLines[aIdx] });
    myersLineDiff(aLines, bLines, aIdx + 1, bIdx + 1, result);
    return;
  }

  const deleteScore = lcs(aLines, bLines, aIdx + 1, bIdx);
  const insertScore = lcs(aLines, bLines, aIdx, bIdx + 1);

  if (deleteScore >= insertScore) {
    result.push({ operation: 'delete', text: aLines[aIdx] });
    myersLineDiff(aLines, bLines, aIdx + 1, bIdx, result);
  } else {
    result.push({ operation: 'insert', text: bLines[bIdx] });
    myersLineDiff(aLines, bLines, aIdx, bIdx + 1, result);
  }
}

export function computeDiff(textA: string, textB: string): DiffResult[] {
  const aLines = splitLines(textA);
  const bLines = splitLines(textB);
  const result: DiffResult[] = [];

  myersLineDiff(aLines, bLines, 0, 0, result);

  return result;
}

export function formatDiffAsUnified(diff: DiffResult[]): string {
  return diff.map(item => {
    switch (item.operation) {
      case 'delete':
        return `- ${item.text}`;
      case 'insert':
        return `+ ${item.text}`;
      case 'equal':
        return `  ${item.text}`;
    }
  }).join('\n');
}
