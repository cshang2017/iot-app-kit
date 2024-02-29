import React, { FC, Fragment, ReactNode, Suspense, useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from 'styled-components';
import { Canvas, useThree } from '@react-three/fiber';

import { useSceneDocument } from '../../store';
import { StaticLayout } from '../StaticLayout';
import { WebGLCanvasManager } from "../../components/WebGLCanvasManager";
import { WebGLCanvasManager2 } from "../../components/WebGLCanvasManager2";
import { sceneComposerIdContext, useSceneComposerId } from '../../common/sceneComposerIdContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDynamicScene from '../../hooks/useDynamicScene';
import { SceneLayers3 } from '../../components/SceneLayers3';

const queryClient = new QueryClient();

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

const SceneLayout3: FC<SceneLayoutProps> = ({ isViewing, LoadingView = null}) => {
    const sceneComposerId = useContext(sceneComposerIdContext);
    const { sceneLoaded } = useSceneDocument(sceneComposerId);

    const dynamicSceneEnabled = useDynamicScene();

    console.log('SceneLayout3...')

    return (
        <>
        { console.log('SceneLayout3 Return+')}
        <StaticLayout
            mainContent={
                <>
                { (
                    <QueryClientProvider client={queryClient}>
                      <SceneLayers3 />
                    </QueryClientProvider>
                  )}
                <R3FWrapper sceneLoaded={sceneLoaded} >
                    <Suspense fallback={LoadingView}>
                        <Fragment>
                            <WebGLCanvasManager2 />
                        </Fragment>   
                    </Suspense>
                </R3FWrapper>
                </>
            }
        />
        { console.log('SceneLayout3 Return-')}
        </>
    )

}

export default SceneLayout3;