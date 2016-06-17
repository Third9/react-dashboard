import React from 'react';
import update from 'react-addons-update';

import {DataSheet} from '../../commons/DataSheet/';
import {ImportFile, ExportFile} from '../../commons/FileFunction';

class Usim extends React.Component {
  constructor(props) {
      super(props);

      this.onLoadXLSX = this.onLoadXLSX.bind(this);
      this.insertData = this.insertData.bind(this);

      this.state = {
        columns: [
          { name: 'index', title: 'NO', width: 50, type:'number' },
          { name: 'iccid', title: 'ICCID' },
          { name: 'serial', title: 'Serial'  },
          { name: 'name', title: 'Name' },
          { name: 'post_pre', title: 'Post/Pre' },
          { name: 'dataused', title: 'Data Used' }
        ],
        sortInfo: [],
        dataSource: this.insertData()
      }
  }

  onLoadXLSX(value) {
    let newState = update(this.state, {
      dataSource: {
        $push: eval(value)
      }
    });

    this.setState(newState);
  }

  insertData() {
    let datas = [];
    for (let i=1; i<=50; i++){
      datas.push({
        "index":i,
        "iccid":`iccid${i}`,
        "serial":`Last${i}`,
        "name":`City${i}`,
        "post_pre":`Email${i}`,
        "dataused":`dataused${i}`
      })
    }
    return datas;
  }

  render() {
    let buttonStyle = {
      float: 'right'
    }

    return(
      <div>
        <h1 style={{marginTop:0}}>
          Usim
          <ExportFile style={buttonStyle}
                      data={this.state.dataSource}/>
        </h1>
        {this.state.dataSource ? <DataSheet sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={false}
                   bottomSize={340}
                  />
                : null}
        <ImportFile data={this.state.dataSource} onLoadXLSX={this.onLoadXLSX} />
      </div>
    )
  }
}

export default Usim;
