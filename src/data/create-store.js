import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMiddleWare = compose(
  applyMiddleware(thunk)
)(createStore);


const store = createStoreWithMiddleWare(
  reducers
);


if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
