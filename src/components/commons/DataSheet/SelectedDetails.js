import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';
import {LineChart} from '../Charts'

class SelectedDetails extends React.Component {
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
    }
  }

  render() {
    let styleCol = {
      border: "1px solid"
    }
    return(
      <div>
        <h2>Details{this.props.idx}</h2>
        <Grid>
          <Row className="show-grid" style={{}}>
            <Col sm={3} md={3} style={styleCol} >1</Col>
            <Col sm={3} md={3} style={styleCol} >2</Col>
          </Row>
          <Row className="show-grid" style={{}}>
            <Col sm={3} md={3} style={styleCol} >1</Col>
            <Col sm={3} md={3} style={styleCol} >2</Col>
          </Row>
          <Row className="show-grid" style={{}}>
            <Col sm={3} md={3} style={styleCol} >1</Col>
            <Col sm={3} md={3} style={styleCol} >2</Col>
          </Row>
          <Row className="show-grid" style={{}}>
            <Col sm={3} md={3} style={styleCol} >1</Col>
            <Col sm={3} md={3} style={styleCol} >2</Col>
          </Row>
          <Row className="show-grid" style={{}}>
            <Col sm={3} md={3} style={styleCol} >1</Col>
            <Col sm={3} md={3} style={styleCol} >2</Col>
          </Row>
        </Grid>
        <div className="col-xs-10 col-md-7">
          <LineChart  data={this.state.lineData} />
        </div>
      </div>
    )
  }
}

export default SelectedDetails
