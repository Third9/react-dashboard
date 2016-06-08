import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute, withRouter} from 'react-router';

import Header from './components/layouts/Header';
import {Dashboard, Total, Active, Inactive, Usim} from './components/pages';

import {Auth, Login, Logout, requireAuth} from './components/commons/Auth/';

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

class wrapperLogin extends React.Component {
  render() {
    return(
      <Login Auth={Auth} parent={this.props}/>
    )
  }
}
// wrapperLogin에서 Router 객체를 사용하기 위한 선언
wrapperLogin = withRouter(wrapperLogin);

class wrapperLogout extends React.Component {
  render() {
    return(
      <Logout Auth={Auth} parent={this.props}/>
    )
  }
}
// wrapperLogout에서 Router 객체를 사용하기 위한 선언
wrapperLogout = withRouter(wrapperLogout);


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireAuth} />
      <Route path="main" component={Dashboard} onEnter={requireAuth} />
      <Route path="login" component={wrapperLogin} />
      <Route path="logout" component={wrapperLogout} />
      <Route path="main/total" component={Total} onEnter={requireAuth} />
      <Route path="main/active" component={Active} onEnter={requireAuth} />
      <Route path="main/inactive" component={Inactive} onEnter={requireAuth} />
      <Route path="main/usim" component={Usim} onEnter={requireAuth} />
    </Route>
  </Router>
  ,
  document.getElementById('app'));
