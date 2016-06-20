import React from 'react';

import ScrollArea from 'react-scrollbar';
import {LineChart, InfoBarChart, ProgressChart} from '../../commons/Charts';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.Conn = this.props.route.fnc.Conn;

    this.state = {
      infoDatas: [
        {
          subject: 'Label1',
          stats: "41,410",
          progressPercent:70,
          progressDescription:'70% Increase in 30 Days',
          progressColor:'white'
        },
        {
          subject: 'Label2',
          stats: "123,234",
          progressPercent:23,
          progressDescription:'23% Increase in 30 Days',
          progressColor:'white'
        },
        {
          subject: 'Label3',
          stats: "41,410",
          progressPercent:20,
          progressDescription:'20% Increase in 30 Days',
          progressColor:'white'
        },
        {
          subject: 'Label4',
          stats: "41,410",
          progressPercent:50,
          progressDescription:'50% Increase in 30 Days',
          progressColor:'white'
        },
        {
          subject: 'Label5',
          stats: "41,410",
          progressPercent:90,
          progressDescription:'90% Increase in 30 Days',
          progressColor:'white'
        },{
          subject: 'Label6',
          stats: "41,410",
          progressPercent:55,
          progressDescription:'55% Increase in 30 Days',
          progressColor:'white'
        }
      ],
      progressCharts: [
        {
          title: 'label1',
          ratio: 60,
          bgStyle: 'success'
        },
        {
          title: 'label2',
          ratio: 23,
          bgStyle: 'info'
        },
        {
          title: 'label3',
          ratio: 34,
          bgStyle: 'warning'
        },
        {
          title: 'label4',
          ratio: 64,
          bgStyle: 'danger'
        },
        {
          title: 'label5',
          ratio: 68,
          bgStyle: 'warning'
        },
        {
          title: 'label6',
          ratio: 12,
          bgStyle: 'success'
        }
      ],
      lineData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
              label: "data1",
              data: [65, 59, 80, 81, 56, 55, 40],
              colour:[75,192,192]
            },
            {
              label: "data2",
              data: [50, 84, 25, 45, 73, 91, 50],
              colour:[255,192,192]
            },
            {
              label: "data3",
              data: [20, 65, 45, 19, 41, 26, 40],
              colour:[75,75,192]
            }
        ]
      }
    };
  }

  handleScroll(scrollData){
      console.log(scrollData);
  }

  render() {
    let now = 60;
    let colorList = ['bg-aqua', 'bg-green', 'bg-yellow', 'bg-red'];

    return (
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <LineChart  data={this.state.lineData}
                        width={600}
                        height={300}
            />
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="row">
              <ScrollArea speed={0.8}
                          className="area"
                          contentClassName="content"
                          smoothScrolling= {true}
                          minScrollSize={40}
                          onScroll={this.handleScroll}
                          style={{height:250, marginBottom:'15px'}}
              >
              {
                this.state.progressCharts.map((progressChart, idx)=>{

                  return (<ProgressChart title={progressChart.title}
                                 ratio={progressChart.ratio}
                                 bgStyle={progressChart.bgStyle}/>)
                })
              }
              </ScrollArea>
            </div>
            <div className="row">
              <ScrollArea speed={0.8}
                          className="area"
                          contentClassName="content"
                          smoothScrolling= {true}
                          minScrollSize={40}
                          onScroll={this.handleScroll}
                          style={{height:400}}
              >
                {
                  this.state.infoDatas.map((infoData, idx)=>{
                    let bgColor = colorList[idx%4];

                    return (<InfoBarChart theme={bgColor}
                                  icon={'fa-mobile'}
                                  subject={infoData.subject}
                                  stats={infoData.stats}
                                  progressPercent={infoData.progressPercent}
                                  progressDescription={infoData.progressDescription}
                                  progressColor={infoData.progressColor}/>)
                  })
                }
              </ScrollArea>
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;
