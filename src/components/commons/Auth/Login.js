import React from 'react';

import {withRouter} from 'react-router';

import {Auth} from './';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.requireAuth = this.requireAuth.bind(this);
    this.auth = this.props.Auth;
    this.parent = this.props.parent;

    this.state = {
      loggedIn: this.auth.loggedIn(),
      error: false
    };

      console.log(`loggedIn: ${this.state.loggedIn}`)
  };

  handleSubmit(evt) {
    evt.preventDefault()

    let email = this.refs.email.value
    let pass = this.refs.pass.value

    this.auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ loggedIn: true })

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
