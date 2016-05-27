import React from 'react';

import {withRouter} from 'react-router';

import Auth from '../../commons/Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAuth = this.getAuth.bind(this);
    this.updateAuth = this.updateAuth.bind(this);

    this.state = {
      loggedIn: Auth.loggedIn()
    };

      console.log(`loggedIn: ${this.state.loggedIn}`)
  };

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  };

  getAuth() {
    return this.state.loggedIn;
  }

  componentWillMount() {
    Auth.onChange = this.updateAuth
    Auth.login()
  };



  handleSubmit(evt) {
    evt.preventDefault()

    let email = this.refs.email.value
    let pass = this.refs.pass.value

    Auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ loggedIn: true })

      let { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
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

export class Logout extends React.Component {
  componentDidMount() {
    Auth.logout()
  };

  render() {
    return (
      <div>
        <p>You are now logged out</p>
      </div>
    )
  }
}

// function requireAuth(nextState, replace) {
//   if (!Auth.loggedIn()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

Login = withRouter(Login)

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
    requireAuth
}
