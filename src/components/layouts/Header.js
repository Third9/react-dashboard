import React from 'react';
import {Link} from 'react-router';

import {PageHeader, Button} from 'react-bootstrap';

import Toolbar from './Toolbar';

class Header extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        pageTitle: "Dashboard"
      }
  }

  render() {
    let headerStyle = {
      height: '50px'
    }

    let buttonStyle = {
      marginLeft: '85%'
    }

    return (
      <div>
        <PageHeader style={headerStyle}>
          <Link to='/main'>
            {this.state.pageTitle}
          </Link>
          {this.props.loggedIn ? (
              <Button style={buttonStyle}
                      href='#/logout'
                      bsStyle="primary">
                logout
              </Button>
            ) : (
              <Button style={buttonStyle}
                      href='#/login'
                      bsStyle="primary">
                login
              </Button>
            )
          }
        </PageHeader>
        {this.props.loggedIn ? (
            <Toolbar />
        ): null}
      </div>
    )
  }
}

export default Header;
