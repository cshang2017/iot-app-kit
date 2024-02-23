import { State, StateCreator } from 'zustand';
import  createVanilla, { GetState, SetState, StoreApi } from 'zustand/vanilla';
import { produce, Draft } from 'immer';

import { SceneComposerOperationTypeMap } from './StoreOperations';
import { RootState } from './Store2';

export const log = 
    <T extends State>(config: StateCreator<T>): StateCreator<T> => 
    (set, get, api) => {
        return config(
            (...args) => {
                set(...args);
            },
            get,
            api,
        );
    };

export const immer = 
    <T extends State>(config: StateCreator<T>): StateCreator<T> => 
    (set, get, api) => 
        config(
            (partial, replace) => {
                const nextState = typeof partial === 'function'
                    ? produce(partial as (state: Draft<T>) => T)
                    : (partial as T);
                set(nextState, replace);
            },
            get,
            api,
        );

export interface UndoStoreState {
    prevStates: any[],
    futureStates: any[],

    undo: () => void;
    redo: () => void;
    clear: () => void;
    setStore: Function;
    getStore: Function;
}

function filterNoHistoryStates(newState: RootState, currentState: RootState) {
    return {
      ...newState,
      noHistoryStates: currentState.noHistoryStates,
    };
  }

export type UndoState = Partial<
    Pick<UndoStoreState, 'undo' | 'redo' | 'clear'> & {
        getUndoState: () => UndoStoreState;
        undoStore: StoreApi<UndoStoreState>;
        // last operation that changed the parent state
        lastOperation?: string;
    }
>;

export const createUndoStore = () => {
    return createVanilla<UndoStoreState>((set, get) => {
        return {
            prevStates: [],
            futureStates: [],
            undo: () => {
                const { prevStates, futureStates, setStore, getStore } = get();
                if (prevStates.length > 0) {
                    futureStates.push(getStore());
                    const prevState = filterNoHistoryStates(prevStates.pop(), getStore());
                    setStore(prevState);
                    set({ prevStates, futureStates});
                }
            }, 
            redo: () => {
                const { prevStates, futureStates, setStore, getStore } = get();
                if (futureStates.length > 0) {
                    prevStates.push(getStore());
                    const futureState = filterNoHistoryStates(futureStates.pop(), getStore());
                    setStore(futureState);
                    set({ prevStates, futureStates });
                }
            },
            clear: () => {
                set( { prevStates: [], futureStates: []});
            },
            setStore: () => {},
            getStore: () => {},
        }
    })
}

export const undoMiddleware = 
    <TState extends UndoState>(config: StateCreator<TState>) =>
    (set: SetState<TState>, get:GetState<TState>, api: StoreApi<TState>) => {
        const undoStore = createUndoStore();
        const { getState, setState } = undoStore;
        const { undo, clear, redo } = getState();
        return config(
            (args) => {
                const snapshot = {
                    prevStates: [...getState().prevStates, { ...get() }],
                    setStore: set,
                    futureStates: [],
                    getStore: get,
                };

                if (!get().getUndoState) {
                    set({
                        undo, 
                        clear,
                        redo,
                        getUndoState: getState,
                        undoStore,
                    });
                }

                set(args);

                const lastOperation =get().lastOperation || '';
                const lastOperationType = SceneComposerOperationTypeMap[lastOperation];

                if (lastOperationType === 'INITIALIZE') {
                    clear();
                } else if (lastOperationType === 'UPDATE_DOCUMENT') {
                    setState(snapshot);
                } 
            },
            get,
            api,
        );
    }