import React, { useContext, useLayoutEffect} from 'react';

import { useQuery } from '@tanstack/react-query';

import { sceneComposerIdContext } from '../common/sceneComposerIdContext';
import { useStore } from '../store';

import { processQueries3 } from '../utils/entityModelUtils/processQueries3';

import { getGlobalSettings } from '../common/GlobalSettings';

export const SceneLayers3: React.FC = () => {
    const sceneComposerId = useContext(sceneComposerIdContext);
    const isViewing = useStore(sceneComposerId)((state) => state.isViewing());
    const sceneMetadataModule = getGlobalSettings().twinMakerSceneMetadataModule;

    console.log('SceneLayers3...');

    const renderSceneNodesFromLayers = useStore(sceneComposerId)((state) => state.renderSceneNodesFromLayers);

    useLayoutEffect(() => {
        const fetchData = async () => { 
            try {
                const nodes = await processQueries3(
                    [`select entity, r, e
                                from EntityGraph
                                match (entity)-[r]->(e)
                                where r.relationshipName = 'isChildOf'
                                and e.entityId = 'Mixers_sceneid'`])

                renderSceneNodesFromLayers(nodes, 'layerId123')

                console.log('ProcessQuery completed with result: ', nodes);
            } catch(error) {
                console.error('ProcessQueries reached error: ', error);
            }
        }

        fetchData();
    }, [sceneMetadataModule]);
    
    return <>
    { console.log('ScenLayers3 return')}
    </>;
}