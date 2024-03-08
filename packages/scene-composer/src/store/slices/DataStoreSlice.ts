import { GetState, SetState, StoreApi } from 'zustand';

import { IDataInput, IDataBindingTemplate } from '../../interfaces';
import { SliceCreator } from '../middlewares';

export interface IDataStoreSlice {
  dataInput?: IDataInput;
  dataBindingTemplate?: IDataBindingTemplate;

  setDataInput: (dataInput?: IDataInput) => void;
  setDataBindingTemplate: (dataBindingTemplate: IDataBindingTemplate) => void;
}

export const createDataStoreSlice: SliceCreator<keyof IDataStoreSlice> = (
  set
) => ({
  dataInput: undefined,

  setDataInput: (dataInput) => {
    set((draft) => {
      draft.dataInput = dataInput;
    });
  },

  setDataBindingTemplate: (dataBindingTemplate) => {
    set((draft) => {
      draft.dataBindingTemplate = dataBindingTemplate;
    });
  },
});
