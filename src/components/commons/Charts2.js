import React from 'react';

import Chart from 'chart.js';

class Charts2 extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    var ctx = document.getElementById("myChart");
    var data = this.props.data;
    // var data = {
    //    labels: ["January", "February", "March", "April", "May", "June", "July"],
    //    datasets: [
    //        {
    //            label: "My First dataset",
    //            fillColor: "rgba(220,220,220,0.2)",
    //            strokeColor: "rgba(220,220,220,1)",
    //            pointColor: "rgba(220,220,220,1)",
    //            pointStrokeColor: "#fff",
    //            pointHighlightFill: "#fff",
    //            pointHighlightStroke: "rgba(220,220,220,1)",
    //            data: [65, 59, 80, 81, 56, 55, 40]
    //        },
    //        {
    //            label: "My Second dataset",
    //            fillColor: "rgba(151,187,205,0.2)",
    //            strokeColor: "rgba(151,187,205,1)",
    //            pointColor: "rgba(151,187,205,1)",
    //            pointStrokeColor: "#fff",
    //            pointHighlightFill: "#fff",
    //            pointHighlightStroke: "rgba(151,187,205,1)",
    //            data: [28, 48, 40, 19, 86, 27, 90]
    //        }
    //    ]
    // };

    new Chart(ctx, {type:'line', data:data}    );

  }
  render() {

    return(
      <div class="chartWrapper" style={{position: "relative"}}>
        <div class="chartAreaWrapper" style={{
          width: "600px",
          overflowX: "scroll"
        }}>
          <div style={{width:"3000px"}}>
            <canvas id="myChart" height="300" width="3000"></canvas>
          </div>
        </div>
        <canvas id="myChartAxis" height="300" width="0"></canvas>
      </div>
    )
  }
}

export default Charts2
