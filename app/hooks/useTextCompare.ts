import { useState, useCallback } from 'react';
import { computeDiff, type DiffResult } from '../utils/text-compare';

export function useTextCompare() {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [diff, setDiff] = useState<DiffResult[]>([]);

  const compare = useCallback(() => {
    const result = computeDiff(firstText, secondText);
    setDiff(result);
  }, [firstText, secondText]);

  const swap = useCallback(() => {
    const temp = firstText;
    setFirstText(secondText);
    setSecondText(temp);
  }, [firstText, secondText]);

  const reset = useCallback(() => {
    setFirstText('');
    setSecondText('');
    setDiff([]);
  }, []);

  return {
    firstText,
    setFirstText,
    secondText,
    setSecondText,
    diff,
    compare,
    swap,
    reset,
  };
}
