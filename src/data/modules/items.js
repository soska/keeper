import { createAction, handleActions } from 'redux-actions';
import itemFactory from '../../utils/item-factory';
import {STATUS_DONE, STATUS_PENDING} from '../../utils/constants';

import {TodosAPI} from '../api';

const API = new TodosAPI();

const initialState = [];

/**
 * ACTION CREATORS
 * ===================================
 */

export const setItems = createAction('@ITEMS/SET');
// export const toggleItemDoneStatus = createAction('@ITEMS/TOGGLE_DONE_STATUS');


export const createItem = (title, list=null) => dispatch => new Promise((resolve, reject)=>{
  const newItem = itemFactory(title, list);
  API.update(newItem).then(item=>{
    resolve(item);
  });
});

export const toggleItemDoneStatus = (item, list=null) => dispatch => new Promise((resolve, reject)=>{
  const status = item.status === STATUS_DONE ? STATUS_PENDING : (STATUS_PENDING) ? STATUS_DONE : item.status;
  const updatedItem = {...item,status};
  API.update(updatedItem).then(item=>{
    resolve(item);
  });
});

export const deleteItem = (item) => dispatch => new Promise((resolve, reject)=>{
  API.remove(item).then(item=>{
    resolve(item);
  },reject);
});

export const getItems = (list) => dispatch => new Promise((resolve, reject)=>{
  API.fetchAll({selector:{list}}).then(items=>{
    dispatch(setItems(items.docs));
  });
});


/**
 * REDUCER
 * ==================================
 */
const reducer = handleActions(
  {
    [setItems]: (_, { payload:items }) => ([...items]),
  },
  initialState
);


/**
 * DEBUG OPTIONS
 * ====================================
 */
if (process.env.NODE_ENV !== 'production') {
  window.itemActions = {
    getItems,
    createItem,
    deleteItem,
    toggleItemDoneStatus
  };
}

export default reducer;

