import { SetState } from 'zustand';
import { Viewport } from '@iot-app-kit/core';

import { ITagSettings, KnownComponentType } from '../../interfaces';
import { Component } from '../../models/SceneModels';
import { RootState } from '../Store';

export interface IViewOptionStateSlice {
  componentVisibilities: Partial<{
    [key in KnownComponentType | Component.DataOverlaySubType]: boolean;
  }>;
  viewport?: Viewport;
  dataBindingQueryRefreshRate?: number;
  autoQueryEnabled?: boolean;
  tagSettings?: ITagSettings;

  setViewport: (viewport?: Viewport) => void;
  setDataBindingQueryRefreshRate: (dataBindingQueryRefreshRate?: number) => void;
  setAutoQueryEnabled: (autoQueryEnabled: boolean) => void;
  toggleComponentVisibility: (componentType: KnownComponentType | Component.DataOverlaySubType) => void;
  setTagSettings: (settings: ITagSettings) => void;
}

export const createViewOptionStateSlice = (set: SetState<RootState>): IViewOptionStateSlice => ({
  componentVisibilities: {
    [KnownComponentType.MotionIndicator]: true,
    [KnownComponentType.Tag]: true,
    [Component.DataOverlaySubType.TextAnnotation]: true,
  },
  tagSettings: undefined,

  setViewport: (viewport) => {
    set((draft) => {
      draft.noHistoryStates.viewport = viewport;
      draft.lastOperation = 'setViewport';
    });
  },
  setDataBindingQueryRefreshRate: (rate) => {
    set((draft) => {
      draft.noHistoryStates.dataBindingQueryRefreshRate = rate;
      draft.lastOperation = 'setDataBindingQueryRefreshRate';
    });
  },
  setAutoQueryEnabled: (autoQueryEnabled) => {
    set((draft) => {
      draft.noHistoryStates.autoQueryEnabled = autoQueryEnabled;
      draft.lastOperation = 'setAutoQueryEnabled';
    });
  },
  toggleComponentVisibility: (componentType) => {
    set((draft) => {
      draft.noHistoryStates.componentVisibilities[componentType] =
        !draft.noHistoryStates.componentVisibilities[componentType];
      draft.lastOperation = 'toggleComponentVisibility';
    });
  },
  setTagSettings: (settings) => {
    set((draft) => {
      draft.noHistoryStates.tagSettings = settings;
      draft.lastOperation = 'setTagSettings';
    });
  },
});
