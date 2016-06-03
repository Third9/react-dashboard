import React from 'react';

import {DataSheet} from '../../commons/DataSheet/';
import {ExportFile} from '../../commons/FileFunction';

class Active extends React.Component {
  constructor(props) {
      super(props);

      this.insertData = this.insertData.bind(this);
      this.handleCellFunc = this.handleCellFunc.bind(this);

      this.state = {
        columns: [
          { name: 'index', title: '#', width: 50, type:'number' },
          { name: 'firstName' },
          { name: 'lastName'  },
          { name: 'city' },
          { name: 'email' }
        ],
        sortInfo: [{name:'firstName', dir:'asc'}],
        dataSource: this.insertData()
      }
  }

  // 데이터 추가를 위한 용도. test
  insertData() {
    let datas = []
    for (let i=1; i<=10000; i++){
      datas.push({
        "index":i,
        "firstName":`First${i}`,
        "lastName":`Last${i}`,
        "city":`City${i}`,
        "email":`Email${i}`
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

  handleCellFunc(val) {
      alert(val)
  }

  render() {
    return(
      <div>
        <h2>Active</h2>
        <DataSheet onCellFunc={this.handleCellFunc}
                   sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={true}
        />
        <ExportFile data={this.state.dataSource}/>
      </div>
    )
  }
}

export default Active;
