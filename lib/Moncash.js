'use strict';

const Configuration = require('./Configuration');
const Errors		= require('./utils/Errors');
const Request 		= require('./Request');

const Payment		= require('./resources/Payment');
const Capture		= require('./resources/Capture');
const Transfert		= require('./resources/Transfert');

class Moncash {
    constructor(config) {
		if (arguments[0]) {
			this.configure(config);
		}
    }
	
	errors = Errors.MoncashError.types;

	configure(config){
		this.config = new Configuration(config);

		this._request = new Request(this.config,{
			'Content-Type': 'application/json',
			'User-Agent':this.config.userAgent
		});

		this.version = this.config.sdkVersion;

		this.payment 	= new Payment(this.config,this._request);
		this.capture 	= new Capture(this.config,this._request);
		this.transfert 	= new Transfert(this.config,this._request);

		return this;
	}
}

module.exports = Moncash;
