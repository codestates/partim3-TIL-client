import { combineReducers } from 'redux';
import signup from './signup';
import handleUserInfo from './handleUserInfo';
import loginOut from './loginOut';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // reducere들 중에서 이 목록에 포함된 reducer만 저장합니다.
  whitelist: ['handleUserInfo', 'loginOut'],
  // blacklist -> 그것만 제외합니다(여기서는 적용하지 않았음)
};

const reducers = combineReducers({
  signup,
  handleUserInfo,
  loginOut,
});

export type RootState = ReturnType<typeof reducers>;

export default persistReducer(persistConfig, reducers);
