import React from 'react';

import ScrollArea from 'react-scrollbar';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'react-bootstrap';
import {LineChart} from '../Charts'

class SelectedDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.idx,
      lineData: this.props.detailData.date_usage
                  ? this.props.detailData.date_usage
                  : {
                      labels: [1,2,3,4,5,6,7,8,9,10],
                      datasets: [
                          {
                            label: "mobileEco",
                            data: [],
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
        lineData: nextProps.detailData.date_usage
                    ? nextProps.detailData.date_usage
                    : {
                        labels: [1,2,3,4,5,6,7,8,9,10],
                        datasets: [
                            {
                              label: "mobileEco",
                              data: [],
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
    let styleGrid = {
      paddingLeft:"3%",
      paddingRight:"3%"
    };

    let styleTitle = {
      marginTop: "0%",
      marginLeft: "2%"
    };

    let styleGraph = {
      width: "100%",
      marginLeft:"6%",
      marginRight:"auto"
    };

    let styleCol = {
      height: "25px",
      border: "1px solid"
    };

    let styleTextArea = {
      width: "100%"
    };

    let styleToolbar = {
      marginLeft: "4%",
      marginBottom: "1%"
    };

    let data = this.props.detailData;
    let dynWidth = ()=>{
      // 데이터양에 따라서 유동적인 width 표현의 위한 코드
      let minWidth = 730; // Chart min size(px)
      // 40000px 이상의 크기가 되면 화면출력이 정상적으로 안됨
      let maxWidth = 30000; // Chart max size(px)
      let cntLabel = this.state.lineData.labels.length;

      if ((cntLabel*15) <= minWidth) {
        return minWidth
      } else if ((cntLabel*15) > maxWidth) {
        return maxWidth + minWidth
      } else {
        return (cntLabel*15)+minWidth
      }
    };

    return(
      <div>
        <h2 style={styleTitle}>Details{this.state.index}</h2>
        <div className="row">
          <Grid style={styleGrid}>
            <Row className="show-grid" >
              <Col sm={4} md={4}  style={styleCol} >{data.network}</Col>
              <Col sm={4} md={4}  style={styleCol} >{data.periodic_time}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={4} md={4} style={styleCol} >{data.max_user}</Col>
              <Col sm={4} md={4} style={styleCol} >{data.data_limit}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={4} md={4} style={styleCol} >{data.network_access}</Col>
              <Col sm={4} md={4} style={styleCol} >URL Re-Direction</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={4} md={4} style={styleCol} >{data.rental}</Col>
              <Col sm={4} md={4} style={styleCol} >{data.data_usage}</Col>
            </Row>
            <Row className="show-grid" >
              <Col sm={4} md={4} style={styleCol} >Ad Redir</Col>
              <Col sm={4} md={4} style={styleCol} >Network Band</Col>
            </Row>
          </Grid>
        </div>
        <div className="row">
          <Grid style={styleGrid}>
            <Row className="show-grid" >
              <Col sm={8} md={8} >
                <div class="chartWrapper" style={{position: "relative"}}>
                  <div class="chartAreaWrapper" style={{
                    width: "730px",
                    minWidth: "730px",
                    overflowX: "scroll"
                  }}>
                    <div style={{width:dynWidth()-730, minWidth: "730px"}}>
                      <LineChart  data={this.state.lineData}
                                  width={dynWidth()}
                                  height={300}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="row">
          <Grid style={styleGrid}>
            <Row className="show-grid" >
              <Col sm={8} md={8} >
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
          <Grid style={styleGrid}>
            <Row className="show-grid" >
              <Col sm={8} md={8} >
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
