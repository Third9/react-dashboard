import React from 'react';

import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';

import StatTile from '../external_modules/react-adminLTE/widgets/js/components/widgets/stat-tile';

class Toolbar extends React.Component {
  render() {

    return (
      <div className="row">
            <StatTile key={"rowThree1"}
                      width = {3}
                      icon = {'fa-shopping-cart'}
                      link = {'#active'}
                      stats = {'150'}
                      subject = {'Active'}
                      theme = {'bg-aqua'} />
            <StatTile key={"rowThree2"}
                      width = {3}
                      icon = {'ion-stats-bars'}
                      link = {'#detail-page'}
                      stats = {'23'}
                      subject = {'DetailPage'}
                      theme = {'bg-green'} />
            <StatTile key={"rowThree3"}
                      width = {3}
                      icon = {'ion-person-add'}
                      link = {'#total'}
                      stats = {'584'}
                      subject = {'Total'}
                      theme = {'bg-yellow'} />
            <StatTile key={"rowThree4"}
                      width = {3}
                      icon = {'ion-pie-graph'}
                      link = {'#usim'}
                      stats = {'888728'}
                      subject = {'Usim'}
                      theme = {'bg-red'} />
        </div>
    )
  }
}

export default Toolbar;
