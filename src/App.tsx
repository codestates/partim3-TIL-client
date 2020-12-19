import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainContainer from './container/MainContainer';

import Mypage from './componentsNew/pages/Mypage';
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
          {/* mypage일때 에러페이지로 랜딩 */}
          {/* <Route exact path="/mypage" component={MypageSettingContainer} /> */}
          <Route path="/mypage/profile" component={MypageSettingContainer} />
          <Route path="/mypage/tags" component={MypageTagsContainer} />
          <Route exact path="/mypage/calendar/:calName" component={MypageCalendarContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/calendar/day" component={CalendarDayContainer} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

//URL Params
//https://velog.io/@bigbrothershin/%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%EC%99%80-%EC%BF%BC%EB%A6%AC

export default App;
