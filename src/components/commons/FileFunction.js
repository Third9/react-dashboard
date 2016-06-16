import React, {PropTypes} from 'react';
import fs from 'fs';

// import json2xls from 'json2xls'; // 해당 모듈은 xlsx로만 출력
import json2csv from 'json2csv';
import XLSX from 'xlsx';
import {Button, Modal, FormControl} from 'react-bootstrap';

export class ExportFile extends React.Component {
  constructor(props) {
    super(props);

    this.onShowModal = this.onShowModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.exportXLS = this.exportXLS.bind(this);
    this.onChangeFileName = this.onChangeFileName.bind(this);

    this.state = {
      showModal: false,
      fileName: ''
    };
  }

  onShowModal() {
    this.setState({
      showModal: true
    });
  }

  onCloseModal() {
      this.setState({
        showModal: false
      });
  }

  onChangeFileName(evt) {
    let nextState = {};
    nextState[evt.target.name] = evt.target.value;
    this.setState(nextState);
  }

  exportXLS() {
    let gridDatas = this.props.data;
    let fields = [];
    for (let key in gridDatas[0]) {
      fields.push(key);
    }

    console.log(gridDatas);

    json2csv({data:gridDatas, fields:fields}, (err, csv)=>{
      if (err){
        alert(`Error: ${err}`)
        console.log(err);
      }else {
          fs.writeFile(`${this.state.fileName}.csv`, csv, (err)=>{
            if(err) {
              alert(`Error: ${err}`)
              console.log(err);
            }else{
                alert("파일 생성 완료");
            }
          });
      }
    });
  }

  render() {

    return (
      <div style={this.props.style}>
        <Button bsStyle={'primary'}
                onClick={this.onShowModal}
        >
        Export
        </Button>

        <Modal show={this.state.showModal} onHide={this.onCloseModal} >
          <Modal.Header closeButton>
            <Modal.Title>저장 경로 선택</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl type="text"
                         name="fileName"
                         placeholder="filename"
                         value={this.state.fileName}
                         onChange={this.onChangeFileName}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.exportXLS}>Save</Button>
            <Button onClick={this.onCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export class ImportFile extends React.Component {
  constructor(props) {
    super(props);

    this.loadDatas = this.loadDatas.bind(this);
    this._toJSON = this._toJSON.bind(this);

    this.state = {
      loadData: null
    }
  }

  loadDatas(evt) {
    let file = evt.target.files;
    let i, f;

    for (i = 0, f = file[i]; i != file.length; ++i) {
      let reader = new FileReader();
      let name = f.name;

      reader.readAsBinaryString(f);

      reader.onload = ((evt)=>{
        let datas = evt.target.result;
        let workbook = XLSX.read(datas, {type: 'binary'});

        this._toJSON(workbook);
        /* DO SOMETHING WITH workbook HERE */
        // console.log(workbook)
        /*
        정상적인 엑셀 파일의 경우 workbook으로 데이터 전달이 됨.
        사용할 내용들은 시트네임, 시트내용들
        SheetNames : 시트명
        Sheets: 시트의 내용들
        */
        // let sheetNameList = workbook.SheetNames;
        // sheetNameList.forEach((sheetName)=>{
      	// 	jsonData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      	// 	if(jsonData.length > 0){
      	// 		console.log(jsonData);
        //     // this.setState({
        //     //   loadData: jsonData
        //     // });
        //     // console.log(`loadData : ${this.state.loadData}`)
        //     // this.props.onLoadXLSX(this.state.loadData)
        //     // this.props.onLoadXLSX(roa)
        //     // return roa
      	// 	}
        //   // this.onLoadXLSX(roa);
      	// });
      });

    }
  }

  _toJSON(workbook) {
    let sheetNameList = workbook.SheetNames;
    let jsonData = null;
    let output = '';

    sheetNameList.forEach((sheetName)=>{
      jsonData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if(jsonData.length > 0){
        // console.log(`jsonData: ${jsonData}`);

        output = JSON.stringify(jsonData, 2, 2)
        // console.log(`output: ${output}`);

        this.props.onLoadXLSX(output);
        // this.setState({
        //   loadData: jsonData
        // });
        // console.log(`loadData : ${this.state.loadData}`)
        // this.props.onLoadXLSX(this.state.loadData)
        // this.props.onLoadXLSX(roa)
        // return roa
      }
      // this.onLoadXLSX(roa);
    });
  }

  render() {
    return(
      <div style={this.props.style}>
        <input type='file' onChange={this.loadDatas} />
      </div>
    )
  }
}
