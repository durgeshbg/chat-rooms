export type LogTitle = 'error' | 'success' | 'info' | 'warn';

export interface Log {
  type: 'log';
  payload: {
    title: LogTitle;
    description: string;
  };
}
