import React from 'react';

import _ from 'underscore';

import {PageHeader, Button} from 'react-bootstrap';

import {DataSheet} from '../../commons/DataSheet/';
import {ExportFile} from '../../commons/FileFunction';

class Total extends React.Component {
  constructor(props) {
      super(props);

      this.insertData = this.insertData.bind(this);
      this.handleCellFunc = this.handleCellFunc.bind(this);
      this.updateState = this.updateState.bind(this);
      this.Conn = this.props.conn;

      // test를 위한 임시값 생성 func
      this.randData = this.randData.bind(this);
      this.randActive = this.randActive.bind(this);

      this.state = {
        columns: [
          { name: 'index', title: 'NO', width: 100, type:'number' },
          { name: 'active', title: 'Active'},
          { name: 'serial', title: 'Serial'},
          { name: 'imei', title: 'IMEI'},
          { name: 'model', title: 'Model'},
          { name: 'ip', title: 'IP'},
          { name: 'network', title: 'Network'},
          { name: 'antenna', title: 'Antenna'},
          { name: 'battery', title: 'Battery'},
          { name: 'carrier', title: 'Carrier'},
          { name: 'data_usage', title: 'Data Usage'},
          { name: 'limit_type', title: 'Limit Type'},
          { name: 'qos', title: 'QoS'},
          { name: 'tel_no', title: 'Tel No'},
          { name: 'time_stamp', title: 'Time Stamp'},
        ],
        sortInfo: [],
        dataSource: []
      }
  }

  // 데이터 추가를 위한 용도. test
  insertData() {
    for (let i=1; i<=500; i++){
      let docu = {
        _id: new Date().toISOString(),
        index: i,
        active: this.randActive(),
        serial: `serial${i}`,
        imei: `imei${i}`,
        model: `model${i}`,
        ip: `ip${i}`,
        network: `network${i}`,
        antenna: `antenna${i}`,
        battery: `battery${i}`,
        carrier: `carrier${i}`,
        data_usage: `data_usage${i}`,
        limit_type: `limit_type${i}`,
        qos: `qos${i}`,
        tel_no: `tel_no${i}`,
        time_stamp: `time_stamp${i}`,
        periodic_time: `periodic_time${i}`,
        max_user: `max_user${i}`,
        data_limit: `data_limit${i}`,
        network_access: `network_access${i}`,
        rental: `rental${i}`,
        date_usage: this.randData()
      }

      console.log(`insertData : ${docu.index}`)
      setTimeout(this.Conn.handleCreateUpdateDocu(docu), 1000*2)

    }

    // return datas
    // let newData = update(this.state, {
    //   _datas: {
    //     $push: [{
    //             "index":idx,
    //             "firstName":"First"+idx,
    //             "lastName":"Last"+idx,
    //             "city":"City"+idx,
    //             "email":"Email"+idx
    //     }]
    //   }
    // });
    //  this.setState(newData);
  }

  componentWillMount() {
    // this.Conn.handleDestroy();
    // this.insertData();
  }

  updateState(err, doc) {
    console.log('updateState')
    this.setState({
      dataSource: _.map(doc.rows, function(row) {return row.doc; })
    });
  }

  componentDidMount() {
    // this.insertData();
    this.Conn.showDocu(this.updateState)
  }

  randActive() {
    let stat = 'active'
    if ((Math.floor(Math.random()*10)%2) == 0) {
      stat = 'active'
    } else {
      stat = 'inactive'
    }
    return stat;
  }

  randData() {
    // 일별 사용률의 데이터를 랜덤하게 만들어 주기 위한 테스트용 method
    let dates = [];
    let values = [];
    for (let i=1; i<=10; i++){
      dates.push(i)
      values.push(Math.floor(Math.random()*100))
    }

    return {
      labels: dates,
      datasets: [
          {
            label: "mobileEco",
            data: values,
            colour:[75,75,192]
          }
      ]
    };
  }

  handleCellFunc(val) {
      alert(val)
  }

  render() {
    let buttonStyle = {
      float: 'right'
    }

    return(
      <div>
        <div>
          <h1 style={{marginTop:0}}>
            Total
            <ExportFile style={buttonStyle}
                        data={this.state.dataSource}/>
          </h1>
        </div>
        <DataSheet sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={true}
                   bottomSize={310}
        />
      </div>
    )
  }
}

export default Total;
