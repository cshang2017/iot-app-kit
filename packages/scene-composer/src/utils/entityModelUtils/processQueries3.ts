
import { Row } from '@aws-sdk/client-iottwinmaker';

import { getGlobalSettings } from "../../common/GlobalSettings";
import { KnownComponentType } from '../../interfaces';
import {
    DEFAULT_ENTITY_BINDING_RELATIONSHIP_NAME,
    DEFAULT_PARENT_RELATIONSHIP_NAME,
    NODE_COMPONENT_TYPE_ID,
    SUB_MODEL_REF_PARENT_RELATIONSHIP_NAME,
  } from '../../common/entityModelConstants';
import { IEntityBindingComponentInternal, 
    ISceneNodeInternal, ISubModelRefComponentInternal } 
from '../../store';
import { parseNode } from './nodeComponent';
import { findComponentByType } from '../nodeUtils';
import { generateUUID } from '../mathUtils';

export const isValidSceneNodeEntity = (entity: DocumentType): boolean => {
    return !!(entity && entity['entityId'] && entity['components'] && entity['components'].length > 0);
  };
  

export const processQueries3 = async (
    queries: string[],
    postProcessNode?: (node: ISceneNodeInternal) => void,
): Promise<ISceneNodeInternal[]> => {
    //console.log('ProcessQueries3: ', queries);

    // ensure sceneMetadataModule exist
    const sceneMetadataModule = getGlobalSettings().twinMakerSceneMetadataModule;
    if (!sceneMetadataModule) {
        return [];
    }

    const requests = queries.map(
        (query) => sceneMetadataModule.kgModule.executeQuery({queryStatement: query})
    )
    const results = await Promise.all(requests);
    const rows: Row[] = [];
    results.forEach((r) => {
        if (r.rows) {
            rows.push(...r.rows);
        }
    })

    const sceneNodes: Record<string, ISceneNodeInternal> = {};

    rows.forEach((row) => {
        const [entity, relationship, pentity] = row.rowData?row.rowData:[];
        if (!entity || !isValidSceneNodeEntity(entity as unknown as DocumentType)) {
            console.error('Invalid scene node entity from query');
            return;
          }

        const entityId = entity['entityId'];
        if (!sceneNodes[entityId]) {
            const nodeCompo = entity['components']
                .find((comp) => comp['componentTypeId'] === NODE_COMPONENT_TYPE_ID);

            const node = parseNode(entity, nodeCompo);
            if (!node) {
                return;
            }
            sceneNodes[entityId] = node;
        }

        if (relationship && relationship['sourceEntityId'] == entityId) {
            if (relationship['relationshipName'] === DEFAULT_PARENT_RELATIONSHIP_NAME) {
                sceneNodes[entityId].parentRef = relationship['targetEntityId'];
            } else if (relationship['relationshipName'] === SUB_MODEL_REF_PARENT_RELATIONSHIP_NAME) {
                sceneNodes[entityId].parentRef = relationship['targetEntityId'];

                const subModelComp = findComponentByType(sceneNodes[entityId], KnownComponentType.SubModelRef) as
                | ISubModelRefComponentInternal
                | undefined;
                if (subModelComp && !subModelComp.parentRef) {
                subModelComp.parentRef = relationship['targetEntityId'];
                }
            } else if (relationship['relationshipName'] === DEFAULT_ENTITY_BINDING_RELATIONSHIP_NAME) {
                const entityBinding: IEntityBindingComponentInternal = {
                ref: generateUUID(),
                type: KnownComponentType.EntityBinding,
                valueDataBinding: {
                    dataBindingContext: {
                    entityId: relationship['targetEntityId'],
                    },
                },
                };

                sceneNodes[entityId].components!.push(entityBinding);
            }
        }
    })

    for (const node of Object.values(sceneNodes)) {
        postProcessNode?.(node);
    
        if (node.parentRef && !sceneNodes[node.parentRef]) {
          node.parentRef = undefined;
        }
      }

    //console.log('ProcessQueries: SceneNodes: ', sceneNodes)

    return Object.values(sceneNodes);
}