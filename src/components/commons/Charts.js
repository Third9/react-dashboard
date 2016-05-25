import React from 'react';

import Chart, {Line} from 'react-chartjs';
import {Label, ProgressBar} from 'react-bootstrap';

import InfoTile from '../external_modules/react-adminLTE/widgets/js/components/widgets/info-tile/info-tile';
import InfoProgressBar from '../external_modules/react-adminLTE/widgets/js/components/widgets/info-tile/progress-bar';


export class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.dataLoad = this.dataLoad.bind(this);

    this.state = {
      chartOptions: [
        {
          //Boolean - Show a backdrop to the scale label
          scaleShowLabelBackdrop : true,
          //String - The colour of the label backdrop
          scaleBackdropColor : "rgba(255,255,255,0.75)",
          // Boolean - Whether the scale should begin at zero
          scaleBeginAtZero : true,
          //Number - The backdrop padding above & below the label in pixels
          scaleBackdropPaddingY : 2,
          //Number - The backdrop padding to the side of the label in pixels
          scaleBackdropPaddingX : 2,
          //Boolean - Show line for each value in the scale
          scaleShowLine : true,
          //Boolean - Stroke a line around each segment in the chart
          segmentShowStroke : true,
          //String - The colour of the stroke on each segement.
          segmentStrokeColor : "#fff",
          //Number - The width of the stroke value in pixels
          segmentStrokeWidth : 2,
          //Number - Amount of animation steps
          animationSteps : 100,
          //String - Animation easing effect.
          animationEasing : "easeOutBounce",
          //Boolean - Whether to animate the rotation of the chart
          animateRotate : true,
          //Boolean - Whether to animate scaling the chart from the centre
          animateScale : false,
          //String - A legend template
          legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }
      ]
    };
  }

  dataLoad() {
    let loadDatas = this.props.data;
    let ChartData = {};
    let dataSets = [];

    for (let loadData of loadDatas.groups) {
      console.log(loadData)
      let colour = loadData.colour.join()

      dataSets.push({
        label: loadData.label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba("+colour+",0.4)",
        borderColor: "rgba("+colour+",1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba("+colour+",1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba("+colour+",1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: loadData.datas
      })
    }

    ChartData.labels = loadDatas.fields;
    ChartData.datasets = dataSets;

    return ChartData;
  }

  render() {
    return(
      <div>
        <Line data={this.dataLoad()}
              options={this.state.chartOptions}
              width="600"
              height="250"/>
      </div>
    )
  }
}

export class InfoBarChart extends React.Component {
  render() {
    return(
      <div>
        <InfoTile
            key = {"rowTwo"}
            width = {12}
            content=''
            icon = {this.props.icon}
            stats = {this.props.stats}
            subject = {this.props.subject}
            theme = {this.props.theme} >
            <InfoProgressBar percent={this.props.progressPercent}
                             description={this.props.progressDescription}
                             color={this.props.progressColor} />
        </InfoTile>
      </div>
    )
  }
}

export class ProgressChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pStyle = {
      margin: '0 0 5px 0'
    }
    let progressStyle = {
      marginBottom: '5px'
    }

    return (
      <div className="col-lg-12 col-md-12">
        <p style={pStyle}>{this.props.title}</p>
        <ProgressBar style={progressStyle}
                     now={this.props.ratio}
                     label={`${this.props.ratio}%`}
                     bsStyle={this.props.bgStyle} />
      </div>
    )
  }
}
