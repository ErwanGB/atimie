'use strict'
const ModuleData = require('./module-data');

/**
 * This is a Business Access Layer for etablissements (ets)
 */
class ModuleService {

    /**
     * Default contructor
     */
    constructor (db){
        this.mData = new ModuleData(db);
    }


    getEts (){
        return this.mData.getEts();
    }

    findEtsById (id){
        return this.mData.findEtsById(id);
    }

}

module.exports = ModuleService;