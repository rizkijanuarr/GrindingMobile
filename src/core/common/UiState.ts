export type UiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

// Helper functions biar gak nulis manual terus
export const UiState = {
  idle: (): UiState<never> => ({ status: 'idle' }),
  loading: (): UiState<never> => ({ status: 'loading' }),
  success: <T>(data: T): UiState<T> => ({ status: 'success', data }),
  error: (message: string): UiState<never> => ({ status: 'error', message }),
};
