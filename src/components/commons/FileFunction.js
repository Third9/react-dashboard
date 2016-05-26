import React, {PropTypes} from 'react';
import fs from 'fs';

// import json2xls from 'json2xls'; // 해당 모듈은 xlsx로만 출력
import json2csv from 'json2csv';
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
    }
  }

  onShowModal() {
    this.setState({
      showModal: true
    })
  };

  onCloseModal() {
      this.setState({
        showModal: false
      })
  };

  onChangeFileName(evt) {
    let nextState = {};
    nextState[evt.target.name] = evt.target.value;
    this.setState(nextState);
  };

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
  };

  render() {

    return (
      <div>
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
