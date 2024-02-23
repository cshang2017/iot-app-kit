import { GetState, SetState, StoreApi } from 'zustand';

import { RootState } from '../Store2';
import { IEditorConfig } from '../internalInterfaces';

export interface IEditorStateSlice {
    editorConfig: IEditorConfig;
    selectedSceneNodeRef?: string;

    setEditorConfig(config: IEditorConfig, replace?: boolean): void;
    setSelectedSceneNodeRef(nodeRef?: string): void;

    resetEditorState(): void;
}

function createDefaultEditorState(): Partial<IEditorStateSlice> {
    return {
    };
  }

export const createEditStateSlice = (
    set: SetState<RootState>,
    get: SetState<RootState>,
    _api: StoreApi<RootState>,
): IEditorStateSlice => ({
    ...createDefaultEditorState(),

    editorConfig: {
      operationMode: undefined,
      uriModifier: undefined,
      valueDataBindingProvider: undefined,
      showAssetBrowserCallback: undefined,
      onWidgetClick: undefined,
      onSelectionChanged: undefined,
    },
    setEditorConfig(config, replace?) {
        set((draft) => {
          if (replace) {
            draft.editorConfig = config;
          } else {
            draft.editorConfig = Object.assign({}, draft.editorConfig, config);
          }
          draft.lastOperation = 'setEditorConfig';
        });
      },

      setSelectedSceneNodeRef(nodeRef?: string) {
        set((draft) => {
          draft.selectedSceneNodeRef = nodeRef;
          draft.lastOperation = 'setSelectedSceneNodeRef';
        });
      },

      resetEditorState() {
        set((draft) => {
          Object.assign(draft, createDefaultEditorState());
          draft.lastOperation = 'resetEditorState';
        });
      },
})