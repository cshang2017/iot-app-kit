import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

import { COMPOSER_FEATURES, SceneViewerProps } from './interfaces';

import { SceneComposerInternal2 } from './components/SceneComposerInternal2';

const SceneComposerContainer = styled.div`
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;

canvas {
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
}
`;

export const SceneViewer2: React.FC<SceneViewerProps> = ( {sceneComposerId, config, ...props}: SceneViewerProps)  => {
    const composerId = useMemo(() => {
        return sceneComposerId || uuid();
      }, [sceneComposerId]);
    const [sceneLoaded, setSceneLoaded] = useState(false);

    const onSceneLoaded = useCallback(() => {
        setSceneLoaded(true);
        console.log('onSceneLoaded...')
    }, [setSceneLoaded])

    return (
        <SceneComposerContainer data-testid='webgl-root' className='sceneViewer'>
            <SceneComposerInternal2
                sceneComposerId={composerId}
                config={{
                    ...(config || {}),
                    mode: 'Viewing',
                    featureConfig: {
                      ...((config as any)?.featureConfig || {}),
                      [COMPOSER_FEATURES.SceneAppearance]: true,
                    },
                  }}
                  onSceneLoaded={onSceneLoaded}
                  {...props}
            />
        </SceneComposerContainer>
    )
}