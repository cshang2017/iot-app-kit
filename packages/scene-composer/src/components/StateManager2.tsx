import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import ab2str from 'arraybuffer-to-string';

import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

import { SceneComposerInternalProps } from '../interfaces/sceneComposerInternal';
import { useStore, RootState } from '../store';
import { useSceneComposerId } from '../common/sceneComposerIdContext';
import SceneLayout from '../layouts/SceneLayout/SceneLayout';
import SceneLayout2 from '../layouts/SceneLayout/SceneLayout2';
import { LoadingProgress } from './three-fiber/LoadingProgress';

import sceneDocumentSnapshotCreator from '../utils/sceneDocumentSnapshotCreator';
import { 
    setDracoDecoder,
    setGetSceneObjectFunction,
    setTwinMakerSceneMetadataModule 
} from '../common/GlobalSettings';
import { createStandardUriModifier } from '../utils/uriModifiers';

const StateManager2: React.FC<SceneComposerInternalProps> = ({
    sceneLoader,
    sceneMetadataModule,
    config,
    onSceneUpdated,
    onSceneLoaded,
    viewport
}: SceneComposerInternalProps) => {

    const sceneComposerId = useSceneComposerId();

    const {
        setEditorConfig,
        loadScene,
        sceneLoaded,
        setSelectedSceneNodeRef
    } = useStore(sceneComposerId)((state) => state);

    const [sceneContentUri, setSceneContentUri] = useState<string>('');
    const [sceneContent, setSceneContent] = useState<string>('');
    const [loadSceneError, setLoadSceneError] = useState<Error | undefined>();

    const standardUriModifier = useMemo(
        () => createStandardUriModifier(sceneContentUri || '', undefined),
        [sceneContentUri],
      );    

    console.log('sceneComposerId: ', {sceneComposerId});

    const isViewing = config.mode === 'Viewing';

    // important to load glb files
    useLayoutEffect(() => {
        THREE.Cache.enabled = true;

        setEditorConfig({
            uriModifier: standardUriModifier,
        })

    }, [standardUriModifier])

    useEffect(() => {
        if (config.dracoDecoder) {
          setDracoDecoder(config.dracoDecoder);
        }
      }, [config.dracoDecoder]);

    // key to load glb files.
    useEffect(() => {
        setGetSceneObjectFunction(sceneLoader.getSceneObject);
      }, [sceneLoader]);

    useEffect(() => {
        if (sceneMetadataModule) {
            console.log('set sceneMetadataModule...');
            setTwinMakerSceneMetadataModule(sceneMetadataModule);
        }
    }, [sceneMetadataModule])

    useEffect(() => {
        console.log('sceneLoader..');
        sceneLoader
            .getSceneUri()
            .then((uri) => {
                if (uri) {
                    console.log('scene uri: ', {uri});
                    setSceneContentUri(uri);
                } else {
                    throw new Error('Got empty scene url');
                }
            })
            .catch((error) => {
                setLoadSceneError(error || new Error('Failed to get scene uri'));
            })
    }, [sceneLoader]);

    useEffect(() => {
        if (sceneContentUri && sceneContentUri.length > 0) {
            const promise = sceneLoader.getSceneObject(sceneContentUri);
            if (!promise) {
                setLoadSceneError(new Error('Failed to fetch scene content'));
            } else {
                promise
                    .then((arrayBuffer) => {
                        return ab2str(arrayBuffer);
                    })
                    .then((sceneContent) => {
                        setSceneContent(sceneContent);
                    })
                    .catch((error) => {
                        setLoadSceneError(error || new Error('Failed to fetch scene content'));
                    });
            }
        }
    }, [sceneContentUri])

    useLayoutEffect(() => {
        if (sceneContent?.length > 0) {
            console.log('sceneContent...');
            loadScene(sceneContent, { disableMotionIndicator: false});
        }
    }, [sceneContent]);

    useEffect(() => {
        if (onSceneLoaded && sceneLoaded) {
            console.log('onSceneLoaded..')
            setTimeout(() => {
                onSceneLoaded();
            }, 1);
        }
    }, [sceneLoaded, onSceneLoaded]);

    useEffect(() => {
        if (onSceneUpdated) {
            console.log('onSceneUpdated ...')
            return useStore(sceneComposerId).subscribe(
                (state, old: Pick<RootState, 'document' | 'sceneLoaded'>) => {
                    if (!state.sceneLoaded || !old.sceneLoaded || state.document === old.document) {
                        return;
                    }
                    console.log('run onSceneUpdated...');
                    onSceneUpdated(sceneDocumentSnapshotCreator.create({ document: state.document}));
                },
                (state) => ({ document: state.document, sceneLoaded: state.sceneLoaded}),
            );
        }
    }, [onSceneUpdated]);
 
    useEffect(() => {
        if (loadSceneError) {
          throw loadSceneError;
        }
      }, [loadSceneError]);

    const pointerMissedCallback = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
        
            console.log('pointerMissedCallback called..');
        },[setSelectedSceneNodeRef],
    );

    return (
        <SceneLayout2 
            isViewing={isViewing}
            LoadingView={
                <LoadingProgress />
            }
            //onPointerMissed={pointerMissedCallback}
            />
    )
};

export default StateManager2;