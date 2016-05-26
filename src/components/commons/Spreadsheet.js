import React from 'react';
import update from 'react-addons-update';

import DataGrid from 'react-datagrid';
import sorty from 'sorty';

import {ExportFile} from './FileFunction';

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);

    this.insertData = this.insertData.bind(this);
    this.sort = this.sort.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      _datas: this.insertData(),
      sortInfo: [{name:'firstName', dir:'asc'}],
      columns: [
        { name: 'index', title: '#', width: 50, type:'number' },
        { name: 'firstName' },
        { name: 'lastName'  },
        { name: 'city' },
        { name: 'email' }
      ]
    }
  }

  // 데이터 추가를 위한 용도. test
  insertData() {
    let datas = []
    for (let i=1; i<=10000; i++){
      datas.push({
        "index":i,
        "firstName":"First"+i,
        "lastName":"Last"+i,
        "city":"City"+i,
        "email":"Email"+i
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

  sort(data) {
      return sorty(this.state.sortInfo, data)
  }

  handleSortChange(sortInfo) {
    this.state.sortInfo = sortInfo;
    let data = this.sort(this.state._datas)

    this.setState({})
  }

  handleColumnOrderChange(idx, dropIdx) {
    let col = this.state.columns[idx];
    this.state.columns.splice(idx, 1)
    this.state.columns.splice(dropIdx, 0, col)

    this.setState({})
  }

  handleFilter(column, value, allFilterValues) {
    this.state._datas = this.insertData();

    Object.keys(allFilterValues).forEach((name)=>{
      let columnFilter = (allFilterValues[name]+'').toUpperCase();

      if(columnFilter==''){
        return
      }

      this.state._datas = this.state._datas.filter((item)=>{
        if((item[name]+'').toUpperCase().indexOf(columnFilter) === 0) {
          return true
        }
      })
    })
    this.setState({})
  }

  render() {
		return (
      <div>
        <link rel="stylesheet" type="text/css" href="src/stylesheets/css/Spreadsheet.css" />
        <ExportFile data={this.state._datas}/>
        <DataGrid
    			idProperty='id'
    			dataSource={this.state._datas}
    			columns={this.state.columns}
    			style={{height: 500}}
          sortInfo={this.state.sortInfo}
          onSortChange={this.handleSortChange}
          onColumnOrderChange={this.handleColumnOrderChange}
          onFilter={this.handleFilter}
          liveFilter={true}
		    />
      </div>
    )
	}}

export default Spreadsheet;
