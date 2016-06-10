import React from 'react';

import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';

import StatTile from '../external_modules/react-adminLTE/widgets/js/components/widgets/stat-tile';

class Toolbar extends React.Component {
  render() {
    let toolButtonStyle = {
        borderStyle: 'inset',
        borderWidth: '10px',
        borderRadius: '10px'
    }

    return (
      <div className="row">
            <StatTile key={"rowThree1"}
                      width = {3}
                      icon = {'fa-shopping-cart'}
                      link = {'#/main/total'}
                      stats = {'150'}
                      subject = {'Total'}
                      theme = {'bg-aqua'}
                      />
            <StatTile key={"rowThree2"}
                      width = {3}
                      icon = {'ion-stats-bars'}
                      link = {'#/main/active'}
                      stats = {'23'}
                      subject = {'Active'}
                      theme = {'bg-green'} />
            <StatTile key={"rowThree3"}
                      width = {3}
                      icon = {'ion-person-add'}
                      link = {'#/main/inactive'}
                      stats = {'584'}
                      subject = {'Inactive'}
                      theme = {'bg-yellow'} />
            <StatTile key={"rowThree4"}
                      width = {3}
                      icon = {'ion-pie-graph'}
                      link = {'#/main/usim'}
                      stats = {'888728'}
                      subject = {'Usim'}
                      theme = {'bg-red'} />
        </div>
    )
  }
}

export default Toolbar;
