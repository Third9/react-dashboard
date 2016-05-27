import React from 'react';
import {Link} from 'react-router';

import {PageHeader, Button} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        pageTitle: "Dashboard"
      }
  }

  render() {
    let buttonStyle={
      marginLeft: '85%'
    }

    return (
      <div>
        <PageHeader>
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
      </div>
    )
  }
}

export default Header;
