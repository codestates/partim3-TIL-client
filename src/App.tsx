import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainContainer from './container/MainContainer';

import MypageSettingContainer from './container/MypageSettingContainer';
import MypageTagsContainer from './container/MypageTagsContainer';
import MypageCalendarContainer from './container/MypageCalendarContainer';

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
          <Route exact path="/mypage" component={MypageSettingContainer} />
          <Route path="/mypage/tags" component={MypageTagsContainer} />
          <Route path="/mypage/calendar" component={MypageCalendarContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/calendar/day" component={CalendarDayContainer} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
