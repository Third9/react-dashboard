import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute, withRouter} from 'react-router';

import Header from './components/layouts/Header';
import {Dashboard, Total, Active, Inactive, Usim} from './components/pages';
import {Auth, Login, Logout, requireAuth} from './components/commons/Auth/';
import Conn from './components/commons/ConnDB/Conn';

// pouchDB
let conn = new Conn('temp');

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          loggedIn: Auth.loggedIn()
      }

  };

  render() {
    let divStyle = {
        width: '99%',
        margin: 'auto'
    };

    return (
        <div style={divStyle}>
          <Header loggedIn={Auth.loggedIn()} />
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
    )
  }
}

class WrapperLogin extends React.Component {
  render() {
    return(
      <Login Auth={Auth} parent={this.props}/>
    )
  }
}
// wrapperLogin에서 Router 객체를 사용하기 위한 선언
WrapperLogin = withRouter(WrapperLogin);

class WrapperLogout extends React.Component {
  render() {
    return(
      <Logout Auth={Auth} parent={this.props}/>
    )
  }
}
// wrapperLogout에서 Router 객체를 사용하기 위한 선언
WrapperLogout = withRouter(WrapperLogout);

class WrapperDashboard extends React.Component {
  render() {
    return(
      <Dashboard conn={conn} />
    )
  }
}

class WrapperTotal extends React.Component {
  render() {
    return(
      <Total conn={conn} />
    )
  }
}

class WrapperActive extends React.Component {
  render() {
    return(
      <Active conn={conn} />
    )
  }
}

class WrapperInactive extends React.Component {
  render() {
    return(
      <Inactive conn={conn} />
    )
  }
}

class WrapperUsim extends React.Component {
  render() {
    return(
      <Usim conn={conn} />
    )
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WrapperDashboard} onEnter={requireAuth} />
      <Route path="main" component={WrapperDashboard} onEnter={requireAuth} />
      <Route path="login" component={WrapperLogin} />
      <Route path="logout" component={WrapperLogout} />
      <Route path="main/total" component={WrapperTotal} onEnter={requireAuth} />
      <Route path="main/active" component={WrapperActive} onEnter={requireAuth} />
      <Route path="main/inactive" component={WrapperInactive} onEnter={requireAuth} />
      <Route path="main/usim" component={WrapperUsim} onEnter={requireAuth} />
    </Route>
  </Router>
  ,
  document.getElementById('app'));
