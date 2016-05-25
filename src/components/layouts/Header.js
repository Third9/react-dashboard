import React from 'react';
import {Link} from 'react-router';

import {PageHeader} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    let PageTitle = "Dashboard";

    return (
      <div>
        <PageHeader>
          <Link to='/home'>
            {PageTitle}
          </Link>
        </PageHeader>
      </div>
    )
  }
}

export default Header;
