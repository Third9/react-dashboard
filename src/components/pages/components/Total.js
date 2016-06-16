import React from 'react';

import {PageHeader, Button} from 'react-bootstrap';

import {DataSheet} from '../../commons/DataSheet/';
import {ExportFile} from '../../commons/FileFunction';

class Total extends React.Component {
  constructor(props) {
      super(props);

      this.insertData = this.insertData.bind(this);
      this.handleCellFunc = this.handleCellFunc.bind(this);
      this.randData = this.randData.bind(this);

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
        dataSource: this.insertData()
      }
  }

  // 데이터 추가를 위한 용도. test
  insertData() {
    let datas = []
    for (let i=1; i<=10000; i++){
      datas.push({
        'index': i,
        'active': `active${i}`,
        'serial': `serial${i}`,
        'imei': `imei${i}`,
        'model': `model${i}`,
        'ip': `ip${i}`,
        'network': `network${i}`,
        'antenna': `antenna${i}`,
        'battery': `battery${i}`,
        'carrier': `carrier${i}`,
        'data_usage': `data_usage${i}`,
        'limit_type': `limit_type${i}`,
        'qos': `qos${i}`,
        'tel_no': `tel_no${i}`,
        'time_stamp': `time_stamp${i}`,
        'periodic_time': `periodic_time${i}`,
        'max_user': `max_user${i}`,
        'data_limit': `data_limit${i}`,
        'network_access': `network_access${i}`,
        'rental': `rental${i}`,
        'date_usage': this.randData()
      })
    }

    return datas
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

  randData() {
    // 일별 사용률의 데이터를 랜덤하게 만들어 주기 위한 테스트용 method
    let dates = [];
    let values = [];
    for (let i=1; i<=1000; i++){
      dates.push(i)
      values.push(Math.floor(Math.random()*100))
    }
    return {date: dates, val: values};
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
          <h1>
            Total
            <ExportFile style={buttonStyle}
                        data={this.state.dataSource}/>
          </h1>
        </div>
        <DataSheet sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={true}
        />
      </div>
    )
  }
}

export default Total;
