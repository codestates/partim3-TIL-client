import { combineReducers } from 'redux';
import signup from './signup';
import handleUserInfo from './handleUserInfo';

const reducers = combineReducers({
  signup,
  handleUserInfo,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
