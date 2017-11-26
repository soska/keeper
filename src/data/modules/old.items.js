import { createAction, handleActions } from 'redux-actions';
import itemFactory from '../../utils/item-factory';
import {STATUS_DONE, STATUS_PENDING} from '../../utils/constants';

const initialState = [];

/**
 * ACTION CREATORS
 * ===================================
 */

export const createItem = createAction('@ITEMS/APPEND',title=>itemFactory(title));
export const deleteItem = createAction('@ITEMS/REMOVE');
export const toggleItemDoneStatus = createAction('@ITEMS/TOGGLE_DONE_STATUS');


/**
 * REDUCER
 * ==================================
 */
const reducer = handleActions(
  {

    [createItem]: (state, { payload }) => ([...state, payload]),

    [toggleItemDoneStatus]: (state, { payload:id }) => {
      const index = state.findIndex(item => item.id === id );
      const item = state[index];
      if (item) {
        const status = item.status === STATUS_DONE ? STATUS_PENDING : (STATUS_PENDING) ? STATUS_DONE : item.status;
        return [
          ...state.slice(0,index),
          {...item, status},
          ...state.slice(index+1),
        ];
      }

      throw new Error(`Item with id ${id} NOT FOUND`);

    },

    [deleteItem]: (state, { payload:id }) => {
      const index = state.findIndex(item => item.id === id );
      const item = state[index];
      if (item) {
        return [
          ...state.slice(0,index),
          ...state.slice(index+1),
        ];
      }

      throw new Error(`Item with id ${id} NOT FOUND`);
    },

  },
  initialState
);


/**
 * DEBUG OPTIONS
 * ====================================
 */
if (process.env.NODE_ENV !== 'production') {
  window.itemActions = {
    createItem,
    deleteItem,
    toggleItemDoneStatus
  };
}

export default reducer;

