import React from 'react';
import {withRouter} from 'react-router';

import {Panel, FormControl, Button} from 'react-bootstrap';

import {Auth} from './';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
    this.changeLoginID = this.changeLoginID.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.auth = this.props.Auth;
    this.parent = this.props.parent;

    this.state = {
      loggedIn: this.auth.loggedIn(),
      error: false,
      loginID: 'test@test.com',
      password: ''
    };

      console.log(`loggedIn: ${this.state.loggedIn}`)
  };

  componentWillMount() {
      this.auth.onChange = this.updateAuth
      this.auth.login()
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

  changeLoginID(evt) {
    this.setState({
      loginID: evt.target.value,
      loginError: ''
    });
  }

  changePassword(evt) {
    this.setState({
      password: evt.target.value,
      loginError: ''
    });
  }

  handleSubmit(evt) {
    evt.preventDefault()

    let email = this.state.loginID
    let pass = this.state.password

    this.auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        alert('Login false')
        return
      }


      let { location } = this.parent

      if (location.state && location.state.nextPathname) {
        this.parent.router.replace(location.state.nextPathname)
      } else {
        this.parent.router.replace('/')
      }
    })
  }

  render() {
    return(
      <div>
          <div className="col-md-4 col-md-offset-4">
            <div className="text-center">
              <h1 className="login-brand-text">RMS2 Login</h1>
            </div>
            <Panel header={<h3>Please Log In</h3>} className="login-panel">
              <form role='form' onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="form-group">
                    <FormControl onChange={this.changeLoginID} className="form-control" placeholder="Username"
                    ref="loginID" type="email" autofocus="" name="name" defaultValue={this.state.loginID} />
                  </div>

                  <div className="form-group">
                    <FormControl onChange={this.changePassword} placeholder="Password"
                    ref="password" type="password" name="password" />
                  </div>
                  <FormControl type="checkbox" label="Remember Me" />
                  <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
                </fieldset>
              </form>
            </Panel>
          </div>
      </div>
    )
  }
}

class Logout extends React.Component {
  constructor(props) {
      super(props);

      this.auth = this.props.Auth;
      this.parent = this.props.parent;
  }

  componentDidMount() {
    this.auth.logout()
    this.parent.router.replace('/')
  };

  render() {
    return (
      <div>
        <p>You are now logged out</p>
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

module.exports = {
    Login,
    requireAuth,
    Logout
}
