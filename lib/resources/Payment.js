'use strict';

class Payment {
    constructor(config,request){
        this.config  = config;
        this.request = request;
    }

    create(data, cb) {
        this.request.post(this.config.creator_uri,data,{'Content-Type': 'application/json'})
        .then((payment)=>{
            cb(null,payment);
        })
        .catch((err)=>{
            cb(err,null);
        }); 
    }

    redirectUri(payment){
        let params = new URLSearchParams();
        params.append('token',payment.payment_token.token);
        return this.config.redirect_uri+'/Payment/Redirect?'+params;
    }
}

module.exports = Payment;