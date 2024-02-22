import { SceneLoader, TwinMakerSceneMetadataModule } from '@iot-app-kit/source-iottwinmaker';
import { DataStream, TimeSeriesDataQuery, Viewport } from '@iot-app-kit/core';

import { IDataBindingTemplate, ISelectedDataBinding, IValueDataBindingProvider } from './dataBinding';
import { SelectionChangedEventCallback, WidgetClickEventCallback } from './components';

export interface DracoDecoderConfig {
  enable: boolean;
  path?: string;
}

export interface SceneViewerConfig {
  dracoDecoder?: DracoDecoderConfig;
  locale?: string;
  dataBindingQueryRefreshRate?: number; // in milliseconds
}



export interface ExternalLibraryConfig {}
export type GetSceneObjectFunction = (uri: string) => Promise<ArrayBuffer> | null;

export interface SceneViewerPropsShared {
  sceneComposerId?: string;

  sceneLoader: SceneLoader;
  sceneMetadataModule?: TwinMakerSceneMetadataModule;
  valueDataBindingProviders?: { TwinMakerEntityProperty: IValueDataBindingProvider };

  onSelectionChanged?: SelectionChangedEventCallback;
  onWidgetClick?: WidgetClickEventCallback;
  onSceneLoaded?: () => void;

  dataStreams?: DataStream[];
  queries?: TimeSeriesDataQuery[];
  viewport?: Viewport;

  dataBindingTemplate?: IDataBindingTemplate;

  externalLibraryConfig?: ExternalLibraryConfig;
  config?: SceneViewerConfig;

  selectedDataBinding?: ISelectedDataBinding;
  activeCamera?: string;
}

export type SceneViewerProps = SceneViewerPropsShared;
