import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const db = new PouchDB('todos');

window.DB = db;


export class TodosAPI{

  constructor(){
    this.db = new PouchDB('todos');
  }

  update(todo){
    return this.db.put(todo);
  }

  remove(item){
    return this.db.remove(item);
  }

  fetchOne(id){
    return this.db.get(id);
  }

  fetchAll(selector=null){
    if (selector === null) {
      return this.db.allDocs();
    } else {
      return this.db.find(selector);
    }
  }


}