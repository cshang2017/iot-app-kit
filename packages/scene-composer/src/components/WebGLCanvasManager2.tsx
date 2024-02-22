import React from 'react';

import { useThree } from '@react-three/fiber';

import { EditorMainCamera } from './three-fiber/EditorCamera';
import GroundPlane from './three-fiber/GroundPlane';



export const WebGLCanvasManager2: React.FC = () => {

    const { gl } = useThree();

    console.log('load WebGLVanvasManager2...');
    return (
    <React.Fragment>
        <EditorMainCamera />
        <GroundPlane />
    </React.Fragment>
    )
}