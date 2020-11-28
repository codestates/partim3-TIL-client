import { combineReducers } from 'redux';
import signup from './signup';
import handleUserInfo from './handleUserInfo';
import loginOut from './loginOut';

import sideBarM from './sideBarM';

import handleToday from './handleToday';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import calendarDay from './calendarM';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // reducere들 중에서 이 목록에 포함된 reducer만 저장합니다.
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.

  whitelist: ['handleUserInfo', 'loginOut', 'calendarDay', 'handleToday', 'sideBarM'],

  // blacklist -> 그것만 제외합니다(여기서는 적용하지 않았음)
};

const reducers = combineReducers({
  signup,
  handleUserInfo,
  loginOut,
  calendarDay,
  sideBarM,
  handleToday,
});

export type RootState = ReturnType<typeof reducers>;

export default persistReducer(persistConfig, reducers);
