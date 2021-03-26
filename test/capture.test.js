'use strict';
const moncash = require('./conf');

describe('check capture',()=>{
    test('getByOrderId', done => {
        moncash.capture.getByOrderId("1559796839",(err,resp)=>{
            expect(err).toBe(null);
            done();
        });
    });

    test('getByTransactionId', done => {
        moncash.capture.getByTransactionId("12874820",(err,resp)=>{
            expect(err).toBe(null);
            done();
        });
    });
});
