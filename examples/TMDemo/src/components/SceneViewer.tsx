import { FC } from 'react';

import { sceneId} from '../configs';
import { dataSource } from '../dataSource';
import { SceneViewer2 as SceneViewerComp } from '@iot-app-kit/scene-composer';

import './SceneViewer.scss';

const sceneLoader = dataSource.s3SceneLoader(sceneId);

interface SceneViewerProps {
    onSelectionChanged: (e: any) => void;
    onWidgetClick: (e: any) => void;
}

const SceneViewer: FC<SceneViewerProps> = ({ onSelectionChanged, onWidgetClick }) => {

    return (
        <div className="SceneViewer">
            <SceneViewerComp
                sceneComposerId={sceneId}
                sceneLoader={sceneLoader}

                onSelectionChanged={onSelectionChanged}
                onWidgetClick={onWidgetClick}
                />
        </div>
    )
}

export default SceneViewer;