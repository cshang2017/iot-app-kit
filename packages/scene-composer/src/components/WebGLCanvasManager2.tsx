import React, { useContext, useEffect, useRef } from 'react';


import { EditorMainCamera } from './three-fiber/EditorCamera';
import GroundPlane from './three-fiber/GroundPlane'
import Environment, { presets } from './three-fiber/Environment';
import { sceneComposerIdContext } from '../common/sceneComposerIdContext';
import { useSceneDocument } from '../store';
import { KnownSceneProperty } from '../interfaces';

import { ROOT_OBJECT_3D_NAME } from '../common/constants';
import EntityGroup from './three-fiber/EntityGroup';

export const WebGLCanvasManager2: React.FC = () => {

    const sceneComposerId = useContext(sceneComposerIdContext);
    const { document, sceneLoaded, getSceneNodeByRef, getSceneProperty } = useSceneDocument(sceneComposerId);


    const environmentPreset = getSceneProperty<string>(KnownSceneProperty.EnvironmentPreset);
    const rootNodeRefs = document.rootNodeRefs;

    console.log('WebGLVanvasManager2, sceneLoad status: ', sceneLoaded);
    console.log('WebGLVanvasManager2, rootNodsRefs: ', rootNodeRefs);
    return (
<>
{ console.log('WebGL2 Return+')}
    <React.Fragment>
        <EditorMainCamera />
        {environmentPreset && environmentPreset in presets && (
        <Environment preset={environmentPreset} />
      )}
        <group name={ROOT_OBJECT_3D_NAME} dispose={null}>
            {rootNodeRefs &&
            rootNodeRefs.map((rootNodeRef) => {
                const node = getSceneNodeByRef(rootNodeRef);
                console.log('WebGLCanvasManager: node: ', node);
                return node && <EntityGroup key={rootNodeRef} node={node} />;
            })}
        </group>
        <GroundPlane />
    </React.Fragment>
    { console.log('WebGL2 Return-')}
    </>
    )
}