import { FC } from 'react';

import { sceneId} from '../configs';
import { dataSource } from '../dataSource';
import { SceneViewer as SceneViewerComp } from '@iot-app-kit/scene-composer';

import './SceneViewer.scss';

const sceneLoader = dataSource.s3SceneLoader(sceneId);
const sceneMetadataModule = dataSource.sceneMetadataModule(sceneId);


interface SceneViewerProps {
    onSelectionChanged: (e: any) => void;
    onWidgetClick: (e: any) => void;
}

const SceneViewer: FC<SceneViewerProps> = ({ onSelectionChanged, onWidgetClick }) => {


    return (
        <div className="SceneViewer">
            <SceneViewerComp
                sceneLoader={sceneLoader}
                onSelectionChanged={onSelectionChanged}
                sceneMetadataModule={sceneMetadataModule}
                onWidgetClick={onWidgetClick}
                sceneComposerId={sceneId}
                />
        </div>
    )
}

export default SceneViewer;