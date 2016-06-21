import React from 'react';

import _ from 'underscore';

import {DataSheet} from '../../commons/DataSheet/';
import {ExportFile} from '../../commons/FileFunction';

class Active extends React.Component {
  constructor(props) {
      super(props);

      this.insertData = this.insertData.bind(this);
      this.handleCellFunc = this.handleCellFunc.bind(this);
      this.updateState = this.updateState.bind(this);
      this.Conn = this.props.conn;

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

  updateState(err, doc) {
    console.log('updateState')
    this.setState({
      dataSource: _.map(doc.rows, function(row) {return row.doc; })
    });
  }

  componentDidMount() {
    this.Conn.showDocu(this.updateState)
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
            Active
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

export default Active;
