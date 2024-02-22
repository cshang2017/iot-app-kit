import React, { FC, ReactNode, Suspense, useContext } from "react";
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';

import { useSceneDocument } from '../../store';
import { StaticLayout } from '../StaticLayout';
import { WebGLCanvasManager2 } from "../../components/WebGLCanvasManager2";
import { sceneComposerIdContext, useSceneComposerId } from '../../common/sceneComposerIdContext';

const UnselectableCanvas = styled(Canvas)`
  user-select: none;
  background: ${({ theme }) => {
    return theme.canvasBackground;
  }};
  z-index: 0;
`;

const R3FWrapper = (props: { children?: ReactNode; sceneLoaded?: boolean}) => {
    const { children, sceneLoaded, } = props;
    const sceneComposerId = useContext(sceneComposerIdContext);

    return (
    <UnselectableCanvas shadows dpr={window.devicePixelRatio} id='tm-scene-unselectable-canvas'>
        {children}
    </UnselectableCanvas>
    )
}

interface SceneLayoutProps {
    isViewing: boolean;
    LoadingView: ReactNode;
}

const SceneLayout2: FC<SceneLayoutProps> = ({ isViewing, LoadingView = null}) => {
    const sceneComposerId = useContext(sceneComposerIdContext);
    const { sceneLoaded } = useSceneDocument(sceneComposerId);

    return (
        <StaticLayout
            mainContent={
                <R3FWrapper sceneLoaded={sceneLoaded} >
                    <Suspense fallback={LoadingView}>
                        <WebGLCanvasManager2 />
                    </Suspense>
                </R3FWrapper>
            }
        />
    )

}

export default SceneLayout2;