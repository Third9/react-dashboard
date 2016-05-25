import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, createHashHistory, IndexRoute} from 'react-router';

import {Home, Active, DetailPage, Total, Usim} from './components/pages';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="active">Active</Link></li>
          <li><Link to="detail-page">DetailPage</Link></li>
          <li><Link to="total">Total</Link></li>
          <li><Link to="usim">Usim</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={createHashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="active" component={Active} />
      <Route path="detail-page" component={DetailPage} />
      <Route path="total" component={Total} />
      <Route path="usim" component={Usim} />
    </Route>
  </Router>
  ,
  document.getElementById('app'));
