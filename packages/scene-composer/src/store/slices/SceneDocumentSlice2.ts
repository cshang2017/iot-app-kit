import { GetState, SetState } from 'zustand';
import { isEmpty } from 'lodash';
import { RootState2 } from '../Store2';

import {
    KnownSceneProperty
} from '../../interfaces';

import {
    ISceneDocumentInternal,
    ISceneNodeInternal,
    ISerializationErrorDetails,
  } from '../internalInterfaces';
import serializationHelpers, { IDeserializeOptions } from '../helpers/serializationHelpers';

export interface ISceneDocumentSlice {
    document: ISceneDocumentInternal;
    sceneLoaded?: boolean;

    getSceneNodeByRef(ref?: string): Readonly<ISceneNodeInternal> | undefined;
    getSceneProperty<T>(property: KnownSceneProperty, defaultValue?: T): T | undefined;
    getSceneProperty<T>(property: KnownSceneProperty, value: T): void;

    loadScene(sceneContent: string, options?: IDeserializeOptions): void;
}

function createEmptyDocumentState(): ISceneDocumentInternal {
    return {
        nodeMap: {},
        ruleMap: {},
        rootNodeRefs: [],
        componentNodeMap: {},
        unit: 'meter',
        version: '1',
        specVersion: undefined,
        properties: {},
    };
}

export const createSceneDocumentSlice = (set: SetState<RootState2>, get: GetState<RootState2>):
ISceneDocumentSlice =>
({
    document: createEmptyDocumentState(),
    getSceneNodeByRef: (ref?) => {
        if (!ref) return undefined;
        return get().document?.nodeMap[ref];
    },
    getSceneProperty: (property, defaultValue?) => {
        const document = get().document;
        if (document.properties && property in document.properties) {
            return document.properties[property];
        }
    },
    loadScene: (sceneContent, options) => {
        get().resetEditorState();

        let errors: ISerializationErrorDetails[] | undefined;
        set((draft) => {
            const result = serializationHelpers.document.deserialize(sceneContent, options);
            errors = result.errors;

            if (result.document) {
                draft.document = result.document;
            } else {
                // fallback to the empty state
                draft.document = createEmptyDocumentState();
            }

            draft.lastOperation = 'loadScene';
        })

        if (errors && !!isEmpty(errors)) {
            errors.forEach((e) => console.log('errors when createSceneDocSlice: ', e));
        }
    }

})