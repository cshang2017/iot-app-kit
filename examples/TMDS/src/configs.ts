import { Viewport } from '@iot-app-kit/core';
import { IDataBindingTemplate } from '@iot-app-kit/scene-composer';
import { TwinMakerEntityHistoryQuery, TwinMakerQuery } from '@iot-app-kit/source-iottwinmaker';
import { getEnvCredentials } from './getEnvCredentials';

export const awsCredentials = getEnvCredentials();

export const region = 'us-east-1';
export const workspaceId = 'CookieFactory';

// SceneViewer
export const sceneId = 'CookieFactory';
export const componentTypeQueries: TwinMakerQuery[] = [
  {
    componentTypeId: 'com.example.cookiefactory.alarm',
    properties: [{ propertyName: 'alarm_status' }],
  },
];
export const entityQueries: TwinMakerQuery[] = [
  {
    entityId: 'Mixer_0_cd81d9fd-3f74-437a-802b-9747ff240837',
    componentName: 'MixerComponent',
    properties: [{ propertyName: 'RPM' }],
  },
  {
    entityId: 'Mixer_0_cd81d9fd-3f74-437a-802b-9747ff240837',
    componentName: 'AlarmComponent',
    properties: [{ propertyName: 'alarm_status' }],
  },
];
export const dataBindingTemplate: IDataBindingTemplate = {
  sel_entity: (entityQueries[0] as TwinMakerEntityHistoryQuery).entityId,
};
