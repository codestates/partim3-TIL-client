import { combineReducers } from 'redux';
import signup from './signup';

const reducers = combineReducers({
  signup,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
