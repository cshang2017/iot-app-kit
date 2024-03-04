import { SetState } from 'zustand';
import { Viewport } from '@iot-app-kit/core';

import { ITagSettings, KnownComponentType } from '../../interfaces';
import { Component } from '../../models/SceneModels';
import { RootState } from '../Store';

export interface IViewOptionStateSlice {

  autoQueryEnabled?: boolean;
  componentVisibilities: Partial<{
    [key in KnownComponentType | Component.DataOverlaySubType]: boolean;
  }>;
  dataBindingQueryRefreshRate?: number;
  tagSettings?: ITagSettings;
  viewport?: Viewport;

  setAutoQueryEnabled: (autoQueryEnabled: boolean) => void;
  setDataBindingQueryRefreshRate: (dataBindingQueryRefreshRate?: number) => void;
  setTagSettings: (settings: ITagSettings) => void;
  toggleComponentVisibility: (componentType: KnownComponentType | Component.DataOverlaySubType) => void;
  setViewport: (viewport?: Viewport) => void;
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
      draft.viewport = viewport;
    });
  },
  setDataBindingQueryRefreshRate: (rate) => {
    set((draft) => {
      draft.dataBindingQueryRefreshRate = rate;
    });
  },
  setAutoQueryEnabled: (autoQueryEnabled) => {
    set((draft) => {
      draft.autoQueryEnabled = autoQueryEnabled;
    });
  },
  toggleComponentVisibility: (componentType) => {
    set((draft) => {
      draft.componentVisibilities[componentType] =
        !draft.componentVisibilities[componentType];
    });
  },
  setTagSettings: (settings) => {
    set((draft) => {
      draft.tagSettings = settings;
    });
  },
});
