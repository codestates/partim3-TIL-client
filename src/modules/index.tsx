import { combineReducers } from 'redux';
import signup from './signup';
import handleUserInfo from './handleUserInfo';
import loginOut from './loginOut';

const reducers = combineReducers({
  signup,
  handleUserInfo,
  loginOut,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
