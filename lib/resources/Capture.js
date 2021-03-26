'use strict';

class Capture {
    constructor(config,request){
        this.config  = config;
        this.request = request;
    }

    getByTransactionId(id, cb) {
        this.request.post(this.config.transaction_uri,{transactionId:id},{'Content-Type': 'application/json'})
        .then((capture)=>{
            cb(null,capture);
        })
        .catch((err)=>{
            cb(err,null);
        });
    }
    
    getByOrderId(id, cb) {
        this.request.post(this.config.order_uri,{orderId:id},{'Content-Type': 'application/json'})
        .then((capture)=>{
            cb(null,capture);
        })
        .catch((err)=>{
            cb(err,null);
        });  
    }
}

module.exports = Capture;