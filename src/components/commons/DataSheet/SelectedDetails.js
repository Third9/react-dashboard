import React from 'react';

import ScrollArea from 'react-scrollbar';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'react-bootstrap';
import {LineChart} from '../Charts'
import Charts2 from '../Charts2'

class SelectedDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.idx,
      lineData: {
        labels: this.props.detailData.date_usage.date,
        datasets: [
            {
              label: "mobileEco",
              data: this.props.detailData.date_usage.val,
              colour:[75,75,192]
            }
        ]
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.Props) != JSON.stringify(nextProps)) {
      this.setState({
        index: nextProps.idx,
        lineData: {
          labels: nextProps.detailData.date_usage.date,
          datasets: [
              {
                label: "mobileEco2",
                data: nextProps.detailData.date_usage.val,
                colour:[75,75,192]
              }
          ]
        }
      })

      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
      console.log("test1")
  }

  render() {
    let styleTitle = {
      marginLeft: "3%"
    }

    let styleGraph = {
      width: "100%",
      marginLeft:"6%",
      marginRight:"auto"
    }

    let styleLineChart = {
      // width: "600px",
      // overflowX: "scroll"
    }

    let styleCol = {
      border: "1px solid"
    }

    let styleTextArea = {
      width: "100%"
      // marginLeft:"4%"
    }

    let styleToolbar = {
      marginLeft: "4%",
      marginBottom: "1%"
    }

    let data = this.props.detailData;
    return(
      <div>
        <h2 style={styleTitle}>Details{this.state.index}</h2>
        <div className="row">
          <Grid>
            <Row className="show-grid" >
              <Col sm={3} md={3} smOffset={1} mdOffset={1} style={styleCol} >{data.network}</Col>
              <Col sm={3} md={3}  style={styleCol} >{data.periodic_time}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={3} md={3} smOffset={1} mdOffset={1} style={styleCol} >{data.max_user}</Col>
              <Col sm={3} md={3} style={styleCol} >{data.data_limit}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={3} md={3} smOffset={1} mdOffset={1} style={styleCol} >{data.network_access}</Col>
              <Col sm={3} md={3} style={styleCol} >URL Re-Direction</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={3} md={3} smOffset={1} mdOffset={1} style={styleCol} >{data.rental}</Col>
              <Col sm={3} md={3} style={styleCol} >{data.data_usage}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={3} md={3} smOffset={1} mdOffset={1} style={styleCol} >Ad Redir</Col>
              <Col sm={3} md={3} style={styleCol} >Network Band</Col>
            </Row>
          </Grid>
        </div>
        <div className="row">
          <Grid style={{paddingLeft:"3%", paddingRight:"3%"}}>
            <Row className="show-grid" >
              <Col sm={8} md={8} style={styleCol} >
                <LineChart  data={this.state.lineData}
                            width={3600}
                            height={300}
                />
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="row">
          <Grid style={{paddingLeft:"3%", paddingRight:"3%"}}>
            <Row className="show-grid" >
              <Col sm={8} md={8} style={styleCol} >
                <FormGroup controlId="formControlsTextarea"
                           style={styleTextArea}
                >
                  <ControlLabel>Note</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Note" />
                </FormGroup>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="row">
          <Grid style={{paddingLeft:"3%", paddingRight:"3%"}}>
            <Row className="show-grid" >
              <Col sm={8} md={8} style={styleCol} >
                <ButtonToolbar>
                  <Button>Button1</Button>
                  <Button>Button2</Button>
                  <Button>Button3</Button>
                  <Button>Button4</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default SelectedDetails
