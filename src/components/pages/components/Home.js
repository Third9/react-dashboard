import React from 'react';

// import Chart, {Line} from 'react-chartjs';
import {LineChart, InfoBarChart, ProgressChart} from '../../commons/Charts';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineData: {
        fields: ["January", "February", "March", "April", "May", "June", "July"],
        groups: [
            {
              label: "data1",
              datas: [65, 59, 80, 81, 56, 55, 40],
              colour:[75,192,192]
            },
            {
              label: "data2",
              datas: [50, 84, 25, 45, 73, 91, 50],
              colour:[255,192,192]
            },
            {
              label: "data3",
              datas: [20, 65, 45, 19, 41, 26, 40],
              colour:[75,75,192]
            }
        ]
      }
    };
  }

  render() {
    let now = 60;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <LineChart  data={this.state.lineData} />
        </div>
        <div className="col-xs-6 col-md-4">
          <div className="row">
            <ProgressChart title={'label1'}
                           ratio={60}
                           bgStyle={'success'}/>
            <ProgressChart title={'label2'}
                           ratio={20}
                           bgStyle={'info'}/>
            <ProgressChart title={'label3'}
                           ratio={54}
                           bgStyle={'warning'}/>
            <ProgressChart title={'label4'}
                           ratio={23}
                           bgStyle={'danger'}/>
          </div>
          <div className="row">
            <InfoBarChart theme={'bg-aqua'}
                          icon={'fa-bookmark-o'}
                          subject={'Bookmarks'}
                          stats={'41,410'}
                          content={'test'}
                          progressPercent={70}
                          progressDescription={'70% Increase in 30 Days'}
                          progressColor={'white'}/>
            <InfoBarChart theme={'bg-green'}
                          icon={'fa-thumbs-o-up'}
                          subject={'Likes'}
                          stats={'41,410'}
                          content={''}
                          progressPercent={50}
                          progressDescription={'50% Increase in 30 Days'}
                          progressColor={'white'}/>
            <InfoBarChart theme={'bg-yellow'}
                          icon={'fa-calendar'}
                          subject={'Events'}
                          stats={'41,410'}
                          content={''}
                          progressPercent={70}
                          progressDescription={'70% Increase in 30 Days'}
                          progressColor={'white'}/>
            <InfoBarChart theme={'bg-red'}
                          icon={'fa-comments-o'}
                          subject={'comments'}
                          stats={'41,410'}
                          content={''}
                          progressPercent={70}
                          progressDescription={'70% Increase in 30 Days'}
                          progressColor={'white'}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
