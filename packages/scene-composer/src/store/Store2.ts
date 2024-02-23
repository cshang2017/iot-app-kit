import create, { StateCreator, UseStore } from 'zustand';
import shallow from 'zustand/shallow';

import { log, immer, undoMiddleware } from './middlewares';

import { SceneComposerOperation } from './StoreOperations';
import { createSceneDocumentSlice, ISceneDocumentSlice } from './slices/SceneDocumentSlice2';
import { createEditStateSlice, IEditorStateSlice } from './slices/EditorStateSlice2';

import { useStore } from './Store'


interface ISharedState {
    lastOperation?: SceneComposerOperation;
    noHistoryStates: any;
  }

export type RootState = ISharedState
& ISceneDocumentSlice
& IEditorStateSlice;


const stateCreator: StateCreator<RootState> = (set, get, api) => ({
    lastOperation: undefined,
    ...createSceneDocumentSlice(set, get),
    ...createEditStateSlice(set, get, api),
    noHistoryStates: {},
})


/*
const stores = new Map<string, UseStore<RootState>>();

const createStateImpl: () => 
    UseStore<RootState> = () => 
        create<RootState>(undoMiddleware( log( immer( stateCreator))));

const useStore: (id: string) => UseStore<RootState> = (id: string) => {
    if (!stores.has(id)) {
        stores.set(id, createStateImpl());
    }
    return stores.get(id)!;
} 
*/



const sceneDocumentSelector = (state: RootState) => ({
    document: state.document,
    sceneLoaded: state.sceneLoaded,
    getSceneNodeByRef: state.getSceneNodeByRef,
    getSceneProperty: state.getSceneProperty,
});

const useSceneDocument = (id: string) => {
    console.log('useSceneDocument: ', id);
    return useStore(id)(sceneDocumentSelector, shallow);
}

export {
    useSceneDocument, 
    useStore,
}