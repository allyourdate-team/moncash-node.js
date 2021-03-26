'use strict';

const moncash = require('./conf');

describe('check transfert',()=>{
    test('create', done => {
        moncash.transfert.create({
            "receiver":"50900000000",
            "amount": 50,
            "desc": "test"
        },(err,resp)=>{
            expect(err.type).toBeDefined();
            done();
        });
    });
});