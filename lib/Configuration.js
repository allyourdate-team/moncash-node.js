'use strict';

const sdkVersion    = require('../package').version;
const userAgent     = 'Moncash-SDK ' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + '; OpenSSL ' + process.versions.openssl + ')';

const { MoncashError }   = require('./utils/Errors');

class Configuration {
    constructor(clientId,clientSecret,options){

        if (typeof clientId === 'object') {
            this.options = clientId;
        }
        else if (typeof clientSecret === 'object') {
            this.options = {
                clientId,
                ...clientSecret
            };
        }
        else if (typeof options === 'object') {
            this.options = {
                clientId,
                clientSecret,
                ...options
            };
        }
        else{
            this.options = {
                clientId,
                clientSecret
            };
        }

        this.options = {
            version: this._defaultOptions.apiVersion.v1,
            mode: this._defaultOptions.sandbox,
            ...this.options
        };

        return this.configure(this.options);
    }

    _defaultOptions = {
        v1:{
            live:{
                redirect_uri:       "https://moncashbutton.digicelgroup.com/Moncash-middleware",
                endpoint:           "https://moncashbutton.digicelgroup.com/Api",
                oauth_token_uri:    "/oauth/token",
                creator_uri:        "/v1/CreatePayment",
                transaction_uri:    "/v1/RetrieveTransactionPayment",
                order_uri:          "/v1/RetrieveOrderPayment",
                transfert_uri:      "/v1/Transfert",
            },
            sandbox:{
                redirect_uri:       "https://sandbox.moncashbutton.digicelgroup.com/Moncash-middleware",
                endpoint:           "https://sandbox.moncashbutton.digicelgroup.com/Api",
                oauth_token_uri:    "/oauth/token",
                creator_uri:        "/v1/CreatePayment",
                transaction_uri:    "/v1/RetrieveTransactionPayment",
                order_uri:          "/v1/RetrieveOrderPayment",
                transfert_uri:      "/v1/Transfert",
            },
            mode:{
                sandbox:    "sandbox",
                live:       "live"
            },
        },
        apiVersion: {
            v1:     "v1"
        },
        sdkVersion,
        userAgent
    };

    configure(options){
        if (typeof options === 'object') {
            this.options = {
                ...this.options,
                ...options
            };
        } 
        
        try {
            this.validate();
        } 
        catch (error) {
            throw error;
        }

        this.options  = {
            ...this.options,
            ...this._defaultOptions[this.options.version][this.options.mode],
            userAgent: this._defaultOptions.userAgent,
            sdkVersion: this._defaultOptions.sdkVersion
        };

        return this.options;
    };

    validate(options){
        const opts = this.options;

        if (typeof options === 'object') {
            opts = options;
        }

        if (!opts.clientId || !opts.clientSecret) {
            throw new MoncashError('clientId and clientSecret are required.');
        }

        if (opts.version && !this._defaultOptions.apiVersion[opts.version]) {
            throw new MoncashError('specified version not supported');
        }

        if (opts.mode && !this._defaultOptions[opts.version].mode[opts.mode]) {
            throw new MoncashError('specified mode not supported');
        }

        return true;
    }
}

module.exports = Configuration;