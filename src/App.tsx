import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainContainer from './components/templetes/MainContainer';

import Mypage from './components/pages/Mypage';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import CalendarDay from './components/pages/CalendarDay';
import Date from './components/pages/Date';
import 'bootstrap/dist/css/bootstrap.min.css';
//css를 불러와야 bootstrap이 적용됨.

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/mypage" component={MypageContainer} />
            <Route path="/login" component={LoginContainer} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/login" component={Login} />
          <Route path="/calendar/day" component={CalendarDay} />
          <Route path="/calendar/d" component={Date} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
