import { FC } from 'react';

import { sceneId} from '../configs';
import { dataSource } from '../dataSource';
import { SceneViewer3 as SceneViewerComp } from '@iot-app-kit/scene-composer';

import './SceneViewer.scss';

const sceneLoader = dataSource.s3SceneLoader(sceneId);

interface SceneViewerProps {
  onSelectionChanged: (e: any) => void;
  onWidgetClick: (e: any) => void;
}

const SceneViewer: FC<SceneViewerProps> = ({ onSelectionChanged, onWidgetClick }) => {

    const sceneMetadataModule = dataSource.sceneMetadataModule(sceneId);

  return (
    <div className="SceneViewer">
      <SceneViewerComp
        sceneComposerId={sceneId}
        sceneLoader={sceneLoader}
        onSelectionChanged={onSelectionChanged}
        onWidgetClick={onWidgetClick}
        sceneMetadataModule={sceneMetadataModule}
      />
    </div>
  );
};

export default SceneViewer;
