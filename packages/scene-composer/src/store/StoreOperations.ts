export type OperationType = 
    | 'INITIALIZE' 
    | 'UPDATE_DOCUMENT' 
    | 'UPDATE_EDITOR' 
    | 'TRANSIENT';

export type SceneComposerDataOperation = 
    | 'setDataBindingTemplate'
    | 'setDataInput'
    ;

/* doc hierarchy
    document
    -> Node
        -> Component
            -> property
                -> rule
    */
export type SceneComposerDocumentOperation =
    | 'loadScene'
  
    | 'renderSceneNodesFromLayers'

    | 'updateDocumentInternal'

    | 'appendSceneNodeInternal'
    | 'updateSceneNodeInternal'
    | 'updateSceneNodeInternalTransient'
    | 'removeSceneNode'
     
    | 'addComponentInternal'
    | 'updateComponentInternal'
    | 'removeComponent'
    
    | 'setSceneProperty'
    
    | 'updateSceneRuleMapById'
    | 'removeSceneRuleMapById'
    ;

export type SceneComposerEditorOperation =
  | 'resetEditorState'
  | 'setEditorConfig'
  | 'setLoadingModelState' 
  | 'setSubModelSelection'
  | 'setHighlightedSceneNodeRef'
  | 'setSelectedSceneNodeRef'

  | 'setTransformControlMode'
  | 'setTransformControls'

  | 'addMessages'
  | 'clearMessages'

  | 'setAddingWidget'

  | 'setCursorLookAt'
  | 'setCursorPosition'
  | 'setCursorStyle'
  | 'setCursorVisible'

  | 'setActiveCameraName'
  | 'setActiveCameraSettings'
  | 'setCameraControlsType'
  | 'setCameraTarget'
  | 'setMainCameraObject';

export type SceneComposerViewOptionOperation =
  | 'setAutoQueryEnabled'
  | 'setDataBindingQueryRefreshRate'
  | 'setTagSettings'
  | 'setViewport'
  | 'toggleComponentVisibility'
  ;

export type SceneComposerOperation =
  | SceneComposerDataOperation
  | SceneComposerDocumentOperation
  | SceneComposerEditorOperation
  | SceneComposerViewOptionOperation
  ;

export const SceneComposerOperationTypeMap: Record<SceneComposerOperation, OperationType> = {

    // SceneComposer-Data-Operation 
    setDataInput: 'TRANSIENT',
    setDataBindingTemplate: 'TRANSIENT',

  // SceneComposer-Document-Operation
  // loadScene is a speical operation as we want to clear the undo/redo state after this
  loadScene: 'INITIALIZE',

  renderSceneNodesFromLayers: 'UPDATE_DOCUMENT',

  appendSceneNodeInternal: 'UPDATE_DOCUMENT',
  updateSceneNodeInternal: 'UPDATE_DOCUMENT',
  updateSceneNodeInternalTransient: 'TRANSIENT',
  removeSceneNode: 'UPDATE_DOCUMENT',

  updateDocumentInternal: 'UPDATE_DOCUMENT',

  addComponentInternal: 'UPDATE_DOCUMENT',
  updateComponentInternal: 'UPDATE_DOCUMENT',
  removeComponent: 'UPDATE_DOCUMENT',
  
  setSceneProperty: 'UPDATE_DOCUMENT',
  
  updateSceneRuleMapById: 'UPDATE_DOCUMENT',
  removeSceneRuleMapById: 'UPDATE_DOCUMENT',
  
  // SceneComposer-Editor-Operation
  resetEditorState: 'UPDATE_EDITOR',
  setEditorConfig: 'UPDATE_EDITOR',
  
  setLoadingModelState: 'TRANSIENT',
  setSubModelSelection: 'UPDATE_EDITOR',
  setHighlightedSceneNodeRef: 'UPDATE_EDITOR',
  setSelectedSceneNodeRef: 'UPDATE_EDITOR',  

  setTransformControlMode: 'UPDATE_EDITOR',
  setTransformControls: 'UPDATE_EDITOR',

  addMessages: 'UPDATE_EDITOR',
  clearMessages: 'UPDATE_EDITOR',

  setAddingWidget: 'UPDATE_EDITOR',

  setCursorLookAt: 'UPDATE_EDITOR',
  setCursorPosition: 'UPDATE_EDITOR',
  setCursorStyle: 'UPDATE_EDITOR',
  setCursorVisible: 'UPDATE_EDITOR',

  setActiveCameraName: 'UPDATE_EDITOR',
  setActiveCameraSettings: 'UPDATE_EDITOR',
  setCameraControlsType: 'UPDATE_EDITOR',
  setCameraTarget: 'UPDATE_EDITOR',
  setMainCameraObject: 'UPDATE_EDITOR',

  // SceneCompser-ViewOption-Operation
  setAutoQueryEnabled: 'TRANSIENT',
  setDataBindingQueryRefreshRate: 'TRANSIENT',
  setTagSettings: 'TRANSIENT',
  setViewport: 'TRANSIENT',
  toggleComponentVisibility: 'TRANSIENT',
}
 ;
