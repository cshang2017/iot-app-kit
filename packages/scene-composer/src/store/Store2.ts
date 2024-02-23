import create, { StateCreator, UseStore } from 'zustand';
import shallow from 'zustand/shallow';

import { log, immer, undoMiddleware } from './middlewares2';

import { SceneComposerOperation } from './StoreOperations';
import { createSceneDocumentSlice, ISceneDocumentSlice } from './slices/SceneDocumentSlice2';
import { createEditStateSlice, IEditorStateSlice } from './slices/EditorStateSlice2';

export interface ISharedState2 {
    lastOperation?: SceneComposerOperation;
    noHistoryStates: any;
  }

export type RootState2 = ISharedState2 
& ISceneDocumentSlice
& IEditorStateSlice;

const stateCreator: StateCreator<RootState2> = (set, get, api) => ({
    lastOperation: undefined,
    ...createSceneDocumentSlice(set, get),
    ...createEditStateSlice(set, get, api),
    noHistoryStates: {},
})

const stores = new Map<string, UseStore<RootState2>>();

const createStateImpl: () => 
    UseStore<RootState2> = () => 
        create<RootState2>(undoMiddleware( log( immer( stateCreator))));

const useStore2: (id: string) => UseStore<RootState2> = (id: string) => {
    if (!stores.has(id)) {
        stores.set(id, createStateImpl());
    }
    return stores.get(id)!;
} 

const sceneDocumentSelector2 = (state: RootState2) => ({
    document: state.document,
    sceneLoaded: state.sceneLoaded,
    getSceneNodeByRef: state.getSceneNodeByRef,
    getSceneProperty: state.getSceneProperty,
});

const useSceneDocument2 = (id: string) => {
    console.log('useSceneDocument2: ', id);
    return useStore2(id)(sceneDocumentSelector2, shallow);
}

export {
    useSceneDocument2, 
    useStore2,
}