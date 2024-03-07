import { State, StateCreator } from 'zustand';
import { produce, Draft } from 'immer';

/**
 * Make nested state update simple.
 */
export const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState = typeof partial === 'function' 
            ? produce(partial as (state: Draft<T>) => T) 
            : (partial as T);
        set(nextState as any, replace);
      },
      get,
      api,
    );








