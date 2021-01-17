import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// eslint-disable-next-line no-param-reassign, no-underscore-dangle
const reduxDevtools = typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), reduxDevtools),
);

export default store;
