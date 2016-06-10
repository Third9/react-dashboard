import React from 'react';

import {PageHeader, Button} from 'react-bootstrap';

import {DataSheet} from '../../commons/DataSheet/';
import {ExportFile} from '../../commons/FileFunction';

class Total extends React.Component {
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
        sortInfo: [],
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
        <DataSheet onCellFunc={this.handleCellFunc}
                   sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={true}
        />
      </div>
    )
  }
}

export default Total;
