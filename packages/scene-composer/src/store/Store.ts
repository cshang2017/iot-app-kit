import create, { StateCreator, UseStore } from 'zustand';
import shallow from 'zustand/shallow';

import { immer, undoMiddleware, UndoState } from './middlewares';

import { SceneComposerOperation } from './StoreOperations';

import { IDataStoreSlice, createDataStoreSlice } from './slices/DataStoreSlice';
import { createSceneDocumentSlice, ISceneDocumentSlice } from './slices/SceneDocumentSlice';
import { createEditStateSlice, IEditorStateSlice } from './slices/EditorStateSlice';
import { createViewOptionStateSlice, IViewOptionStateSlice } from './slices/ViewOptionStateSlice';
import { createNodeErrorStateSlice, INodeErrorStateSlice } from './slices/NodeErrorStateSlice';

import {
  ISceneDocumentInternal,
  ISceneNodeInternal,
  ISceneComponentInternal,

  IModelRefComponentInternal,
  ISubModelRefComponentInternal,

  ICameraComponentInternal,
  IAnchorComponentInternal,
  ILightComponentInternal,
  IAnimationComponentInternal,
  IColorOverlayComponentInternal,

  isISceneComponentInternal,
  isISceneNodeInternal,

  IDataOverlayComponentInternal,
  IEntityBindingComponentInternal,
  IMotionIndicatorComponentInternal,
  IPlaneGeometryComponentInternal,
} from './internalInterfaces';

export type {
  // Document
  ISceneDocumentInternal,
  ISceneNodeInternal,
  ISceneComponentInternal,

  // Components
  IAnchorComponentInternal,
  IAnimationComponentInternal,
  ICameraComponentInternal,
  IColorOverlayComponentInternal,
  IDataOverlayComponentInternal,

  IEntityBindingComponentInternal,
  ILightComponentInternal,
  IModelRefComponentInternal,
  IMotionIndicatorComponentInternal,
  IPlaneGeometryComponentInternal,
  
  ISubModelRefComponentInternal,
};

// ** the name is compused, it only refers to ViewOption
export interface ISharedState {
    // SceneComposerOperation = Data | Doc | Editor | VierOption
  lastOperation?: SceneComposerOperation;
  noHistoryStates: IViewOptionStateSlice;
}

export type RootState = 
  IDataStoreSlice &
  ISceneDocumentSlice &
  IEditorStateSlice &

  ISharedState &
  UndoState &
  INodeErrorStateSlice;

/**
 * Core state management functions
 * TODO: make them into slices and better organized
 */
/**
type State = object 

type PartialState<
    T extends State,
    K1 extends keyof T = keyof T,
    K2 extends keyof T = K1,
    K3 extends keyof T = K2,
    K4 extends keyof T = K3
> = 
                  | (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
    | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)

type StateSelector<T extends State, U> = (state: T) => U
type EqualityChecker<T> = (state: T, newState: T) => boolean
type StateListener<T> = (state: T, previousState: T) => void 

type StateSliceListener<T> = (slice: T, previousSlice: T) => void 
type Subscribe<T extends State> = {
    (listener: StateListener<T>): () => void 
    <StateSlice>(
        listener: StateSliceListener<StateSlice>,
        selector?: StateSelector<T, StateSlice>,
        equalityFn?: EqualityChecker<StateSlice>,
    ): () => void
}

type SetState<T extends State> = {
    <
        K1 extends keyof T,
        K2 extends keyof T = K1,
        K3 extends keyof T = K2,
        K4 extends keyof T = K3
    >(
        partial: PartialState<T, K1, K2, K3, K4>,
        replace?: boolean
    ): void
}
type GetState<T extends State> = () => T
type Destroy = () => void

type StoreApi<T extends State> = {
    setState: SetState<T>
    getState: GetState<T>
    subscribe: Subscribe<T>
    destroy: Destroy
}

type StateCreator<
    T extends State,
    CustomSetState = SetState<T>,
    CustomGetState = GetState<T>,
    CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = (set: CustomSetState, get: CustomGetState, api: CustomStoreApi) => T

function createStore<TState extends State>(
    createState: StateCreator<
        TState,
        SetState<TState>,
        GetState<TState>,
        any>
): StoreApi<TState>

function createStore<
    TState extends State,
    CustomSetState,
    CustomGetState, 
    CustomStoreApi extends StoreApi<TState>
>(
    createState: StateCreator<
        TState,
        CustomSetState,
        CustomGetState,
        CustomStoreApi
        >
) : CustomerStoreApi {

    let state: TState 
    const listeners: Set<StateListener<TState>> = new Set()

    const setState: SetState<TState> = (partial, replace) => {
        const nextState = 
            typeof partial === 'function'
            ? (partial as (state: TState) => TState)(state)
            : partial
        if (nextState != state) {
            const previousState = state
            state = replace
                ? (nextState as TState)
                : Object.assign({}, state, nextState)
            listener.forEach((listener) => listener(state, previousState))
        }
    }

    const getState: GetState<TState> = () => state 

    const subscribeWithSelector = <StateSlice>(
        listener: StateSliceListener<StateSlice>,
        selector: StateSelector<TState, StateSlice> = getState as any,
        equalityFn: EqualityChecker<StateSlice> = Object.is
    ) => {
        let currentSlice: StateSlice = selector(state)
        function listenerToAdd() {
            const nextSlice = selector(state)
            if (!equalityFn(currentSlice, nextSlice)) {
                cosnt previousSlice = currentSlice
                listener((currentSlice = nextSlice), previousSlice)
            }
        }
        listeners.add(listenerToAdd)

        // Unsubscribe
        return () => listeners.delete(listenerToAdd)
    }

    const subscribe: Subscribe<TState> = <StateSlice>(
        listener: StateListener<TState> | StateSliceListener<StateSlice>,
        selector?: StateSelector<TState, StateSlice>,
        equalityFn?: EqualityChecker<StateSlice>
    ) => {
        if (selector || equalityFn) {
            return subscribeWithSelector(
                listener as StateSliceListener<StateSlice>,
                selector,
                equalityFn
            )
        }
        listeners.add(listener as StateListener<TState>)
        return () => listeners.delete(listener as StateListener<TState>)
    }

    const destroy: Destroy = () => listeners.clear()
    
    const api = { setState, getState, subscribe, destroy }
    state = createState(
        setState as unknown as CustomSetState,
        getState as unknown as CustomGetState,
        api as unknown as CustomStoreApi
    )

    return api as unknown as CustomStoreApi
}


 */
const stateCreator: StateCreator<RootState> = (set, get, api) => ({
  lastOperation: undefined,
  ...createSceneDocumentSlice(set, get),
  ...createEditStateSlice(set, get, api),
  ...createDataStoreSlice(set, get, api),
  noHistoryStates: {
    ...createViewOptionStateSlice(set),
  },
  ...createNodeErrorStateSlice(set, get, api),
});

const createStateImpl: 
    () => UseStore<RootState> // return type
    = () => create<RootState>(undoMiddleware(immer(stateCreator)));

// TODO: currently undoMiddleware will record editor state changes, such as select/deselect object.
// We may want to fine-tune the undo/redo experience.
/**
 

type UseStore<
    T extends State,
    CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = {
    (): T
    <U>(selector: StateSelector<T, U>, equalityFn?:EqualityChecker<U>): U 
} & CustomStoreApi;

type UseBoundStore<
    T extends State,
    CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = {
    (): T
    <U>(selector: StateSelector<T, U>, equalityFn?:EqualityChecker<U>): U
} & CustomStoreApi

function create<TState extends State>(
    createState:
        | StateCreator<TState, SetState<TState>, GetState<TState>, any>
        | StoreApi<TState>
): UseBoundStore<TState, StoreApi<TState>>

function create<
    TState extends State,
    CustomSetState,
    CustomGetState,
    CustomStoreApi extends StoreApi<TState>
>(
    createState:
        | StateCreator<TState, CustomSetState, CustomGetState, CustomStoreApi>
        | CustomStoreApi
): UseBoundStore<TState, CustomStoreApi> {
    const api: CustomStoreApi =
        typeof createState === 'function' 
        ? createStore(createState)
        : createState 

    const useStore: any = <StateSlice>(
        selector: StateSelector<TState, StateSlice> = api.getState as any,
        equalityFn: EqualityChecker<StateSlice> = Object.is
    ) => {
        const [, forceUpdate] = useReducer((c) => c+1, 0) as [never, () => void]

        const state = api.getState()
        const stateRef = useRef(state)
        const selectorRef = useRef(selector)
        const equalityFnRef = useRef(equalityFn)
        const erroredRef = useRef(false)

        const currentSliceRef = useRef<StateSlice>()
        if (currentSliceRef.current === undefined) {
            currentSliceRef.current = selector(state)
        }

        let newStateSlice: StateSlice | undefined 
        let hasNewStateSlice = false 

        if (
            stateRef.current !== state ||
            selectorRef.current !== selector ||
            equalityFnRef.current !== equalityFn ||
            erroredRef.current 
        ) {
            newStateSlice = selector(state)
            hasNewStateSlice = !equalityFn(
                currentSliceRef.current as StateSlice,
                newStateSlice
            )
        }

        useEffect(() => {
            if (hasNewStateSlice) {
                currentSliceRef.current = newStateSlice as StateSlice
            }
            stateRef.current = state 
            selectorRef.current = selector
            equalityFnRef.current = equalityFn
            erroredRef.current = false
        })

        const stateBeforeSubscriptionRef = useRef(state)
        useEffect(() => {
            const listener = () => {
                try {
                    const nextState = api.getState()
                    const nextStateSlice = selectorRef.current(nextState)
                    if (
                        !equalityFnRef.current(
                            currentSliceRef.current as StateSlice,
                            nextStateSlice
                        )
                    ) {
                        stateRef.current = nextState
                        currentSliceRef.current = nextStateSlice
                        forceUpdate()
                    }
                } catch(error) {
                    erroredRef.current = true
                    forceUpdate()
                }
            }

            const unsubscribe = api.subscribe(listener)
            if (api.getState() !== stateBeforeSubscriptionRef.current) {
                listener()
            }
            return unsubscribe
        }, [])

        const sliceToReturn = hasNewStateSlice
            ? (newStateSlice as StateSlice)
            : currentSliceRef.current 
        
        useDebugValue(sliceToReturn)
        return sliceToReturn
    }

    Object.assign(useStore, api)

    useStore[Symbol.iterator] = function () {
        const items = [useStore, api]
        return {
            next() {
                const done = item.length <= 0
                return { value: items.shift(), done }
            },
        }
    }

    return useStore
}
*/
const stores = new Map<string, UseStore<RootState>>();
export { stateCreator }

const useStore: (id: string) => UseStore<RootState> = (id: string) => {
  if (!stores.has(id)) {
    stores.set(id, createStateImpl());
  }
  return stores.get(id)!;
};

const sceneDocumentSelector = (state: RootState) => ({
  document: state.document,

  sceneLoaded: state.sceneLoaded,

  getSceneNodeByRef: state.getSceneNodeByRef,
  getSceneNodesByRefs: state.getSceneNodesByRefs,
  appendSceneNodeInternal: state.appendSceneNodeInternal,
  updateSceneNodeInternal: state.updateSceneNodeInternal,
  updateDocumentInternal: state.updateDocumentInternal,
  listSceneRuleMapIds: state.listSceneRuleMapIds,
  getSceneRuleMapById: state.getSceneRuleMapById,
  updateSceneRuleMapById: state.updateSceneRuleMapById,
  removeSceneRuleMapById: state.removeSceneRuleMapById,
  getSceneProperty: state.getSceneProperty,
  removeSceneNode: state.removeSceneNode,
});

const editorStateSelector = (state: RootState) => ({
  editorConfig: state.editorConfig,
  isViewing: state.isViewing,
  isEditing: state.isEditing,
  addingWidget: state.addingWidget,
  isLoadingModel: state.isLoadingModel,
  transformControls: state.transformControls,
  transformControlMode: state.transformControlMode,
  cameraCommand: state.cameraCommand,
  cameraControlsType: state.cameraControlsType,
  selectedSceneNodeRef: state.selectedSceneNodeRef,
  selectedSceneSubmodelRef: state.selectedSceneSubmodelRef,
  cursorPosition: state.cursorPosition,
  cursorLookAt: state.cursorLookAt,
  cursorVisible: state.cursorVisible,
  cursorStyle: state.cursorStyle,

  setEditorConfig: state.setEditorConfig,
  getObject3DBySceneNodeRef: state.getObject3DBySceneNodeRef,
  setSelectedSceneNodeRef: state.setSelectedSceneNodeRef,
  setSelectedSceneSubmodelRef: state.setSelectedSceneSubmodelRef,
  setTransformControls: state.setTransformControls,
  setTransformControlMode: state.setTransformControlMode,
  setCameraTarget: state.setCameraTarget,
  setCameraControlsType: state.setCameraControlsType,
  setSceneNodeObject3DMapping: state.setSceneNodeObject3DMapping,
  setAddingWidget: state.setAddingWidget,
  setCursorPosition: state.setCursorPosition,
  setCursorLookAt: state.setCursorLookAt,
  setCursorVisible: state.setCursorVisible,
  setCursorStyle: state.setCursorStyle,
  activeCameraSettings: state.activeCameraSettings,
  setActiveCameraSettings: state.setActiveCameraSettings,
  activeCameraName: state.activeCameraName,
  setActiveCameraName: state.setActiveCameraName,
  mainCameraObject: state.mainCameraObject,
  setMainCameraObject: state.setMainCameraObject,
});

const dataStoreSelector = (state: RootState): IDataStoreSlice => ({
  dataBindingTemplate: state.dataBindingTemplate,
  dataInput: state.dataInput,
  setDataInput: state.setDataInput,
  setDataBindingTemplate: state.setDataBindingTemplate,
});

const nodeErrorStateSelector = (state: RootState): INodeErrorStateSlice => ({
  nodeErrorMap: state.nodeErrorMap,
  addNodeError: state.addNodeError,
  removeNodeError: state.removeNodeError,
});

const viewOptionStateSelector = (state: RootState): IViewOptionStateSlice => ({
  viewport: state.noHistoryStates.viewport,
  setViewport: state.noHistoryStates.setViewport,

  dataBindingQueryRefreshRate: state.noHistoryStates.dataBindingQueryRefreshRate,
  setDataBindingQueryRefreshRate: state.noHistoryStates.setDataBindingQueryRefreshRate,

  autoQueryEnabled: state.noHistoryStates.autoQueryEnabled,
  setAutoQueryEnabled: state.noHistoryStates.setAutoQueryEnabled,

  componentVisibilities: state.noHistoryStates.componentVisibilities,
  toggleComponentVisibility: state.noHistoryStates.toggleComponentVisibility,
  
  tagSettings: state.noHistoryStates.tagSettings,
  setTagSettings: state.noHistoryStates.setTagSettings,
});

/**
 * useSceneDocument is a useful short-hand hook for reacting to scene document changes.
 * NOTE: this will cause refresh whenever there is a change in the whole document.
 * You should use a smaller granular state if that's not your intention.
 */
const useSceneDocument = (id: string) => {
  return useStore(id)(sceneDocumentSelector, shallow);
};

const useEditorState = (id: string) => {
  return useStore(id)(editorStateSelector, shallow);
};

const useDataStore = (id: string): IDataStoreSlice => {
  return useStore(id)(dataStoreSelector, shallow);
};

const useNodeErrorState = (id: string): INodeErrorStateSlice => {
  return useStore(id)(nodeErrorStateSelector, shallow);
};

const useViewOptionState = (id: string): IViewOptionStateSlice => {
  return useStore(id)(viewOptionStateSelector, shallow);
};

const isDocumentStateChanged = (current: ISceneDocumentInternal, previous: ISceneDocumentInternal): boolean => {
  // TODO: we'll just implement a simple comparision version for beta release
  return !shallow(current, previous);
};

export {
  useStore,
  sceneDocumentSelector,
  editorStateSelector,
  useSceneDocument,
  useEditorState,
  dataStoreSelector,
  useDataStore,
  nodeErrorStateSelector,
  useNodeErrorState,
  isDocumentStateChanged,
  isISceneComponentInternal,
  isISceneNodeInternal,
  viewOptionStateSelector,
  useViewOptionState,
};
