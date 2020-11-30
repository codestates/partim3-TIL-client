import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainContainer from './container/MainContainer';
import MypageSettingContainer from './container/MypageSettingContainer';
import SignupContainer from './container/SignupContainer';
import LoginContainer from './container/LoginContainer';
import CalendarDayContainer from './container/CalendarDayContainer';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//css를 불러와야 bootstrap이 적용됨.

//라우팅은 랜더링에 상관없이 APP에서 해주어하는 건가?
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route path="/mypage" component={MypageSettingContainer} />
          {/* mypage 종류가 3개로 나뉠 것이므로 이에 맞게 라우팅 수정 필요 */}
          <Route path="/login" component={LoginContainer} />
          <Route path="/calendar/day" component={CalendarDayContainer} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
