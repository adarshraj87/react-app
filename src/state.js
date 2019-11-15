import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from 'utils';
import throttle from 'lodash.throttle';

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
}
const persistedState = loadState() || {};
// console.log(persistedState);
const store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(...middlewares))
)

store.subscribe(throttle(() => {
    saveState({ ...store.getState() });
}, 3000));
export default store;
