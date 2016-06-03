import React from 'react';

import {DataSheet} from '../../commons/DataSheet/';
import {ImportFile} from '../../commons/FileFunction';

class DetailPage1 extends React.Component {
  constructor(props) {
      super(props);

      this.onLoadXLSX = this.onLoadXLSX.bind(this);
      this.insertData = this.insertData.bind(this);

      this.state = {
        columns: [
          { name: 'index', title: '#', width: 50, type:'number' },
          { name: 'firstName' },
          { name: 'lastName'  },
          { name: 'city' },
          { name: 'email' }
        ],
        sortInfo: [{name:'firstName', dir:'asc'}],
        dataSource: []
      }
  }

  onLoadXLSX(value) {
    this.setState({
      dataSource: eval(value)
    });

  }

  insertData() {
    let datas = [];
    for (let i=1; i<=10000; i++){
      datas.push({
        "index":i,
        "firstName":"test",
        "lastName":"Last"+i,
        "city":"City"+i,
        "email":"Email"+i
      })
    }
    return datas;
  }

  render() {
    return(
      <div>
        <h2>Detail</h2>
        {this.state.dataSource ? <DataSheet sortInfo={this.state.sortInfo}
                   columns={this.state.columns}
                   dataSource={this.state.dataSource}
                   detailView={false}
                  />
                : null}
        <ImportFile data={this.state.dataSource} onLoadXLSX={this.onLoadXLSX} />
      </div>
    )
  }
}

export default DetailPage1;
