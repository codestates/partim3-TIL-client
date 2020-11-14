import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainContainer from './components/templetes/MainContainer';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
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
          <Route path="/login" component={Login} />
          <Route exact path="/" component={MainContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
