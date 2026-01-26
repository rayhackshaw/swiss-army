export type DiffOperation = 'equal' | 'insert' | 'delete';

export interface DiffResult {
  operation: DiffOperation;
  text: string;
}
