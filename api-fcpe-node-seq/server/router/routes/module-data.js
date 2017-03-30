'use strict'


/**
 * This is Data Access Layer for contacts
 */
class ModuleData {

    constructor(db){
        this.db = db
    }

    getEts (){
        return this.db.ets.findAll().then(ets => {
          console.log(ets)
          return ets;
        })
    }


    findEtsById (id){
        return _(this._contacts).find( (contact) =>{
            return contact.id == id;
        });
    }
}

module.exports = ModuleData;