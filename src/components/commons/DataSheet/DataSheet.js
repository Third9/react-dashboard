import React from 'react';
import update from 'react-addons-update';
import _ from 'underscore';

import DataGrid from 'react-datagrid';
import sorty from 'sorty';

import SelectedDetails from './SelectedDetails';

class DataSheet extends React.Component {
  constructor(props) {
    super(props);

    this.sort = this.sort.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.handleColumns = this.handleColumns.bind(this);
    this.handleDataSource = this.handleDataSource.bind(this);

    this.state = {
      onDetailView: this.props.detailView,
      width: '100%',
      selectedId: null,
      showDetails: false,
      sortInfo: this.props.sortInfo,
      columns: this.handleColumns(),
      dataSource: this.handleDataSource()
    };
  }

  handleColumns(){
    let onCellFunc = this.props.onCellFunc;
    let columns = this.props.columns;

    if(onCellFunc) {
        columns.splice(0,0, {name: 'button', width: 50});
    }

    return columns;
  }

  handleDataSource(){
    let onCellFunc = this.props.onCellFunc;
    let dataSource = this.props.dataSource;

    if(onCellFunc) {
      dataSource = dataSource.map( function(v, i){
        return _.extend({"button": <CellFunc idx={i} extFunc={onCellFunc}/>}, v);
      });
    }

    return dataSource;
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        columns: nextProps.columns,
        dataSource: nextProps.dataSource
      });
  }

  sort(data) {
      return sorty(this.state.sortInfo, data);
  }

  handleSortChange(sortInfo) {
    this.state.sortInfo = sortInfo;
    let data = this.sort(this.state.dataSource);

    this.setState({});
  }

  handleColumnOrderChange(idx, dropIdx) {
    let col = this.state.columns[idx];
    this.state.columns.splice(idx, 1);
    this.state.columns.splice(dropIdx, 0, col);

    this.setState({});
  }

  handleFilter(column, value, allFilterValues) {
    this.state.dataSource = this.insertData();

    Object.keys(allFilterValues).forEach((name)=>{
      let columnFilter = (allFilterValues[name]+'').toUpperCase();

      if(columnFilter===''){
        return;
      }

      this.state.dataSource = this.state.dataSource.filter((item)=>{
        if((item[name]+'').toUpperCase().indexOf(columnFilter) === 0) {
          return true;
        }
      });
    });
    this.setState({});
  }

  onSelectionChange(newSelectedId, data) {
    if(this.state.onDetailView) {
      let newShowDetails = true;
      let newWidth = '60%';

      if(this.state.selectedId == newSelectedId) {
          newSelectedId = null;
          newShowDetails = false;
          newWidth = '100%';
      }

      this.setState({
        selectedId: newSelectedId,
        showDetails: newShowDetails,
        width: newWidth
      });
    }
  }

  render() {
		return (
        <div style={{display: '-webkit-box'}}>
          <DataGrid
      			idProperty='index'
      			dataSource={this.state.dataSource}
      			columns={this.state.columns}
      			style={{height: 500, width: this.state.width}}
            selected={this.state.selectedId}
            onSelectionChange={this.onSelectionChange}
            sortInfo={this.state.sortInfo}
            onSortChange={this.handleSortChange}
            onColumnOrderChange={this.handleColumnOrderChange}
            onFilter={this.handleFilter}
            liveFilter={true}
  		    />
        {this.state.showDetails ? <SelectedDetails idx={this.state.selectedId}/>
                                                  : null}
        </div>
    )
	}}

export default DataSheet;

class CellFunc extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.extFunc = this.props.extFunc.bind(this);
    }

    handleClick() {
      let idx = this.props.idx;
      this.extFunc(idx)
    }

    render() {
      return(
        <div>
          <button onClick={this.handleClick}>{this.props.idx}</button>
        </div>
      )
    }
}
