import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import MainContainer from './page/MainContainer'
import SignupContainer from './page/SignupContainer'

function App() {

  return (
    <div className="App">
     <Router>
     <Switch>
            {/* <Route path="/mypage" component={MypageContainer} />
            <Route path="/login" component={LoginContainer} /> */}
            <Route path="/signup" component={SignupContainer} />
            <Route exact path="/" component={MainContainer} />
          </Switch> 
     </Router>
    </div>
  );

}

export default App;
