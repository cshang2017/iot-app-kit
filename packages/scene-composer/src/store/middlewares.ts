import { State, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { produce, Draft } from 'immer';
import { immer } from "zustand/middleware/immer";
import { RootState } from './Store';




/**
 * Make nested state update simple.
 */
export const _immer =
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

export type ImmerStateCreator<
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  > = StateCreator<T, [...Mps, ['zustand/immer', never]], Mcs>;


  export type MyAppStateCreator = ImmerStateCreator<RootState>;

// Defines the type of a function used to create a slice of the store. The
// slice has access to all the store's actions and state, but only returns
// the actions and state necessary for the slice.
export type SliceCreator<TSlice extends keyof RootState> = (
  ...params: Parameters<MyAppStateCreator>
) => Pick<ReturnType<MyAppStateCreator>, TSlice>;

