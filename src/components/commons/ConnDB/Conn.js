import PouchDB from 'pouchdb';

class Conn {
  constructor(bucket) {
    this.db = new PouchDB(bucket);

    this.showDocu = this.showDocu.bind(this);
    this.handleCreateUpdateDocu = this.handleCreateUpdateDocu.bind(this);
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
}

export default Conn
