import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
import MainContainer from './components/templetes/MainContainer';

import Mypage from './components/templetes/Mypage';
import Signup from './components/templetes/Signup';
import Login from './components/templetes/Login';
import CalendarDay from './components/templetes/CalendarDay';
import 'bootstrap/dist/css/bootstrap.min.css';
//css를 불러와야 bootstrap이 적용됨.

//라우팅은 랜더링에 상관없이 APP에서 해주어하는 건가?
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/login" component={Login} />
          <Route path="/calendar/day" component={CalendarDay} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
