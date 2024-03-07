import { GetState, SetState, StoreApi } from 'zustand';

import { IDataInput, IDataBindingTemplate } from '../../interfaces';
import { RootState } from '../Store';
import { SliceCreator } from '../middlewares';

export interface IDataStoreSlice {
  dataInput: IDataInput;
  dataBindingTemplate: IDataBindingTemplate;

  setDataInput: (dataInput?: IDataInput) => void;
  setDataBindingTemplate: (dataBindingTemplate: IDataBindingTemplate) => void;
}

export const createDataStoreSlice: SliceCreator<keyof IDataStoreSlice> = (
  set,
  get
): IDataStoreSlice => ({
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
