import React, { useMemo } from 'react';

import { useViewport } from '@iot-app-kit/react-components';

import { SceneComposerInternalProps } from '../interfaces/sceneComposerInternal';
import { generateUUID } from '../utils/mathUtils';
import { sceneComposerIdContext } from '../common/sceneComposerIdContext';
import StateManager2 from './StateManager2';
import StateManager from './StateManager';
import IntlProvider from './IntlProvider';

export const SceneComposerInternal2: React.FC<SceneComposerInternalProps> = ({
    sceneComposerId,
    ErrorView,
    onError,
    config,
    ...props
}) => {
    const currentSceneComposerId = useMemo(() => sceneComposerId ?? generateUUID(), [sceneComposerId]);
    const { viewport } = useViewport();

    return (
        <IntlProvider locale={config.locale}>
            <sceneComposerIdContext.Provider value={currentSceneComposerId}>
                <StateManager2 config={config} {...props} viewport={props.viewport || viewport}/>
            </sceneComposerIdContext.Provider>
        </IntlProvider>
        )
}