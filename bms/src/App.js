import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './components/login.component';
import Main from './components/main.component';
import Routes from './components/route.component';
import Station from './components/station.component';
import Notice from './components/notice.component';
import reserve from './components/reserve.component';
import Member from './components/member.component';
import Notice_Read from './components/notice_read.component';
import Notice_WriteView from './components/notice_write.component';

function App() {
  let isAuthorized = window.sessionStorage.getItem('access-token');
  return (
    <Router>
      {!isAuthorized ? <Redirect to="/" /> : <Redirect to="/main" />}
      {/* 기본 app 베이스 디자인 */}
      <div className="App">
        <nav className="navcontainer">
          <div className="App-header">
            {/* 링크추가 */}
            <p className="App-headertext">목포대학교 스쿨버스 관리시스템</p>
          </div>
        </nav>

        {/* 경로 스위치 등록 */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/route" component={Routes} />
          <Route exact path="/station" component={Station} />
          <Route exact path="/notice" component={Notice} />
          <Route exact path="/notice_read/:id" component={Notice_Read} />
          <Route exact path="/notice_write" component={Notice_WriteView} />
          <Route exact path="/reserve" component={reserve} />
          <Route exact path="/members" component={Member} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {/* 카운터 함수 실행 */}
//         <Counter />

//       </header>
//     </div>
//   );
// }

// export default App;
