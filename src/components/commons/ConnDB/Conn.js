import PouchDB from 'pouchdb';

class Conn {
  constructor(bucket) {
    this.db = new PouchDB(bucket);

    this.showDocu = this.showDocu.bind(this);
    this.handleCreateUpdateDocu = this.handleCreateUpdateDocu.bind(this);
    this.handleDeleteDocu = this.handleDeleteDocu.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  remoteConn(url) {
    this.remoteCouch = url;
  }

  showDocu(fnc) {
    //  Show Document
    this.db.allDocs({include_docs: true, descending: true},
                    fnc);
  }

  handleCreateUpdateDocu(docu) {
    // Create/Update Document
    let _id = docu._id;

    this.db.put(docu, function callback(err, result){
      if(!err) {
        console.log(`Successfully created/updated a docu: id(${_id})`)
      } else {
        console.log(`Failed created/updated a docu(${_id}): ${err}`)
      }
    });
  }

  handleDeleteDocu(todo) {
    this.db.remove(todo, function callback(err, result){
      if(!err) {
        console.log('Successfully')
      }
    });
  }

  handleDestroy() {
    this.db.destroy(function callback(err, response){
      if(err) {
        return console.log(`Destroy error for ${err}`)
      } else {
        console.log('Success')
      }
    });
  }
}

export default Conn
