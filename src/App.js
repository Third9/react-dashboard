import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, createHashHistory, IndexRoute} from 'react-router';

import Header from './components/layouts/Header';
import Toolbar from './components/layouts/Toolbar';
import {Home, Active, DetailPage, Total, Usim} from './components/pages';

class App extends React.Component {
  render() {
    let divStyle = {
        width: '99%',
        margin: 'auto'
    };

    return (
      <div style={divStyle}>
        <Header />
        <Toolbar />
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
