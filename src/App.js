import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute, withRouter} from 'react-router';

import Header from './components/layouts/Header';
import Toolbar from './components/layouts/Toolbar';
import {Dashboard, Active, DetailPage, Total, Usim} from './components/pages';
import Auth from './components/commons/Auth';

class App extends React.Component {
  constructor(props) {
      super(props);

      // this.updateAuth = this.updateAuth.bind(this);
      this.state = {
          loggedIn: Auth.loggedIn()
      }

  };

  render() {
    let divStyle = {
        width: '99%',
        margin: 'auto'
    };

    // console.log(`Login.getAuth: ${Auth.loggedIn()}`)
    return (
        <div style={divStyle}>
          <Header loggedIn={Auth.loggedIn()} />
          <Toolbar />
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
    )
  }
}

function requireAuth(nextState, replace) {
  if (!Auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    }
  };

  handleSubmit(event) {
    event.preventDefault()

    let email = this.refs.email.value
    let pass = this.refs.pass.value

    Auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      let { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="test@test.com" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      </div>
    )
  }
}

Login = withRouter(Login);

class Logout extends React.Component {
    componentDidMount() {
      Auth.logout()
    };

    render() {
      return(
        <div>
          <p>You are now logged out</p>
        </div>
      )
    }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="main" component={Dashboard} onEnter={requireAuth}/>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="main/active" component={Active} onEnter={requireAuth} />
      <Route path="main/detail-page" component={DetailPage} />
      <Route path="main/total" component={Total} />
      <Route path="main/usim" component={Usim} />
    </Route>
  </Router>
  ,
  document.getElementById('app'));
