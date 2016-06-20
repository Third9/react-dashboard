import React from 'react';
import update from 'react-addons-update';
import _ from 'underscore';

import DataGrid from 'react-datagrid';

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
    this.handleResize = this.handleResize.bind(this);

    this.state = {
      onDetailView: this.props.detailView,
      width: '100%',
      height: (window.innerHeight-this.props.bottomSize),
      selectedId: null,
      showDetails: false,
      sortInfo: this.props.sortInfo,
      columns: this.handleColumns(),
      dataSource: this.handleDataSource(),
      originData: null
    };
  }

  handleResize() {
    console.log(`handleInnerSize: ${window.innerWidth} x ${window.innerHeight}`)
    console.log(`handleResize: ${this.state.width} x ${this.state.height}`)
    this.setState({
      height: (window.innerHeight-this.props.bottomSize)
    })
  }

  componentWillMount(){
    this.handleResize();
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this.setState({
      originData: this.state.dataSource
    })
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.handleResize);
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
      let sortInfo = this.state.sortInfo
      if(sortInfo.length==0){
        // sorting 하지 않는 경우에는 원본 데이터로 전환시켜줌
        return this.state.originData;
      }
      else if(sortInfo[0].dir==1){
        return _.sortBy(data, sortInfo[0].name);
      }else {
        return _.sortBy(data, sortInfo[0].name).reverse();
      }
  }

  handleSortChange(sortInfo) {
    this.state.sortInfo = sortInfo;
    let data = this.sort(this.state.dataSource);

    this.setState({
      dataSource: data
    });
  }

  handleColumnOrderChange(idx, dropIdx) {
    let col = this.state.columns[idx];
    this.state.columns.splice(idx, 1);
    this.state.columns.splice(dropIdx, 0, col);

    this.setState({});
  }

  handleFilter(column, value, allFilterValues) {
    let dataSource = this.props.dataSource;

    Object.keys(allFilterValues).forEach((name)=>{
      let columnFilter = (allFilterValues[name]+'').toUpperCase();

      if(columnFilter===''){
        return;
      }

      dataSource = dataSource.filter((item)=>{
        if((item[name]+'').toUpperCase().indexOf(columnFilter) === 0) {
          return true;
        }
      });
    });
    this.setState({
      dataSource: dataSource,
      originData: dataSource
    });
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
        <div style={{display: '-webkit-box',
                     borderBottomStyle: 'groove',
                     borderTopStyle: 'groove',
                     height:this.state.height
                   }}>
          <DataGrid
      			idProperty='index'
      			dataSource={this.state.dataSource}
      			columns={this.state.columns}
      			style={{width: this.state.width}}
            selected={this.state.selectedId}
            onSelectionChange={this.onSelectionChange}
            sortInfo={this.state.sortInfo}
            onSortChange={this.handleSortChange}
            onColumnOrderChange={this.handleColumnOrderChange}
            onFilter={this.handleFilter}
            liveFilter={true}
  		    />
        {this.state.showDetails ? <SelectedDetails idx={this.state.selectedId}
                                                   detailData={this.state.dataSource[this.state.selectedId-1]}
                                  />
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
