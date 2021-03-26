'use strict';

const axios     = require('axios');
const Errors	= require('./utils/Errors');

class Request{
    constructor(config,headers){
        this.config  = config;
        this.headers = headers;

        this.instance = axios.create({
            baseURL:this.config.endpoint,
            headers: this.headers
        });
    }

    authenticate(clientId,clientSecret){

        return new Promise((res,rej)=>{
            if (clientId) {
                this.config.clientId = clientId;
            }
    
            if (clientSecret) {
                this.config.clientSecret = clientSecret;
            }
    
            
            let data = new URLSearchParams();

            data.append('scope','read,write');
            data.append('grant_type','client_credentials');

            this.instance.post('/oauth/token',data,
            {
                headers:{
                    ...this.headers,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth:{
                    username:this.config.clientId,
                    password:this.config.clientSecret
                }
            })
            .then((resp)=>{
                this.headers = {
                    ...this.headers,
                    Authorization:'Bearer ' + resp.data.access_token
                };
    
                this.token_expires_at = parseInt(new Date().getTime() / 1000) + parseInt(resp.data.expires_in) - 6;

                res(resp.data);
            })
            .catch((err)=>{
                rej(err);
            });

        });
        
    }

    async post(path,data,headers){
        try {
            if (!this.headers.Authorization || this.token_expires_at < parseInt(new Date().getTime() / 1000) || !this.headers.Authorization.search('Bearer')) {
                await this.authenticate();
            }
            
            const resp = await this.instance.post(path,data,{
                headers:{
                    ...this.headers,
                    ...headers
                }
            });

            return resp.data;
        } 
        catch (error) {
            if (!error.response) {
                throw new Errors.MoncashError(error.message);
            }
            throw Errors.MoncashError.generate(error.response.status);
        }
    }

    // async get(path,params,headers){
    //     try {
    //         if (!this.headers.Authorization || this.token_expires_at < parseInt(new Date().getTime() / 1000) || !this.headers.Authorization.search('Bearer')) {
    //             await this.authenticate();
    //         }
    
    //         return this.instance.get(path,{params},{
    //             headers:{
    //                 ...this.headers,
    //                 ...headers
    //             }
    //         });
    //     } 
    //     catch (error) {
    //         return error;
    //     }
    // }
}

module.exports = Request;