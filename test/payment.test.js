'use strict';

const moncash = require('./conf');

describe('check payment',()=>{
    test('create', done => {
        moncash.payment.create({
            "amount": 50,
            "orderId": "1234423"
        },(err,resp)=>{
            expect(err).toBe(null);;
            done();
        });
    });

    test('redirectUri',()=> {
        return expect(moncash.payment.redirectUri({
            mode: '<mode>',
            path: '/Api/v1/CreatePayment',
            payment_token: {
              expired: '<date>',
              created: '<date>',
              token: '<token>'
            },
            timestamp: '<timestamp>',
            status: '<status>'
          })).toBeDefined();
    });
});