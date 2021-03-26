'use strict';

class Transfert {
    constructor(config,request){
        this.config  = config;
        this.request = request;
    }

    create(data, cb) {
        this.request.post(this.config.transfert_uri,data,{'Content-Type': 'application/json'})
        .then((transfert)=>{
            cb(null,transfert);
        })
        .catch((err)=>{
            cb(err,null);
        });
    }
}

module.exports = Transfert;