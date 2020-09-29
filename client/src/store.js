import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas'

export const history = createBrowserHistory();

const createSagaMiddleware = createSagaMiddleware();

// 초기 상태값을 빈 값으로 두기
const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : devtools || compose;

// store 생성
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
)
// sagaMiddleware 작동
sagaMiddleware.run(rootSage)

export default store;