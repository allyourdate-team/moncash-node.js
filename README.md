[![moncash](https://sandbox.moncashbutton.digicelgroup.com/Moncash-middleware/resources/assets/images/MC_button.png)](https://sandbox.moncashbutton.digicelgroup.com/)

# Digicel Moncash API SDK for Node.js
_Inspired by [stripe](https://github.com/stripe/stripe-node) SDK for Node.js_

[![Build Status](https://travis-ci.com/allyourdate-team/moncash-node.js.svg?branch=main)](https://travis-ci.com/allyourdate-team/moncash-node.js) [![Coverage Status](https://coveralls.io/repos/github/allyourdate-team/moncash-node.js/badge.svg?branch=main)](https://coveralls.io/github/allyourdate-team/moncash-node.js?branch=main) 

Digicel MonCash - MonCash is a mobile wallet that facilitates reliable, safe and convenient financial transactions to reduce the distance between people regardless of their location in Haiti. While providing its services to its customer base of over 1.5 million people, MonCash maintains its goal of expanding its range of available services.

## Define: SDK
> SDK stands for “Software Development Kit”, which is a great way to think about it — a kit.
> Think about putting together a model car or plane. When constructing this  model, a whole kit of items is needed, including the kit pieces themselves, the tools needed to put them together, assembly instructions, and so forth.

## Features
- Create payment
- Capture payment
- ~~Transfert money~~

## Installation
Moncash requires [Node.js](https://nodejs.org/) v12+ to run.
_Install the the SDK and start using it._

```sh
npm install --save moncash
```

## Configuring the client
Digicel Moncash API [Dashboard](https://sandbox.moncashbutton.digicelgroup.com/Moncash-business/Login).
_Each business has it's own `clientId` `clientSecret` pairs._
```javascript
const Moncash = require('moncash');

const moncash = new Moncash({
    mode:'sandbox', // 'sandbox' | 'live'
    clientId:'<clientId>',
    clientSecret:'<clientSecret>'
});

/*---------------or----------------*/

const Moncash = require('moncash');

const moncash = new Moncash();

moncash.configure({
    mode:'<mode>',     // 'sandbox' | 'live'
    clientId:'<clientId>',
    clientSecret:'<clientSecret>'
});
```
## Create Payment
The only supported currency is 'HTG'.
_With the configue above._
```javascript
moncash.payment.create({
    "amount": '<integer>',  // Ex: 50
    "orderId": '<string>'   // Must be unique 
},(err,payment)=>{
    if (err) {
        console.log(err.type);      // see Error handler section
        return false;
    }
    const paymentURI = moncash.payment.redirectUri(payment);
    console.log(payment,paymentURI);

    /* output:
        {
          mode: '<mode>',     // 'sandbox' | 'live'
          path: '/Api/v1/CreatePayment',
          payment_token: {
            expired: '<date>',
            created: '<date>',
            token: '<token>'
          },
          timestamp: '<timestamp>',
          status: '<status>'
        } 
        
        https://'<mode|"">'.moncashbutton.digicelgroup.com/Moncash-middleware/Payment/Redirect?token='<token>'
    */
});
```
## Capture Payment
Two way to do so.
_By orderId or tansactionId._
```javascript
moncash.capture.getByOrderId('<orderId>',(err,capture)=>{
    if (err) {
        console.log(err.type);      // see Error handler section
        return false;
    }
    console.log(capture);
    /* output:
        {
          path: '/Api/v1/RetrieveOrderPayment',
          payment: {
            reference: '<orderId>',
            transaction_id: '<transactionId>',
            cost: '<integer>',
            message: '<string>',
            payer: '<payerAccount>'
          },
          timestamp: '<timestamp>',
          status: '<status>'
        }
    */
});

/*---------------or----------------*/

moncash.capture.getByTransactionId('<transactionId>',(err,capture)=>{
    if (err) {
        console.log(err.type);      // see Error handler section
        return false;
    }
    console.log(capture);
    /* output:
        {
          path: '/Api/v1/RetrieveTransactionPayment',
          payment: {
            reference: '<orderId>',
            transaction_id: '<transactionId>',
            cost: '<integer>',
            message: '<string>',
            payer: '<payerAccount>'
          },
          timestamp: '<timestamp>',
          status: '<status>'
        }
    */
});
```

## ~~Tranfert money~~
The only supported currency is 'HTG'.
_`In test for now.`_
```javascript
moncash.transfert.create({
    "receiver":'<receiverAccount">',
    "amount": '<integer>',  // Ex: 50
    "desc": '<string>'
},(err,transfert)=>{
    if (err) {
        console.log(err.type);
        return false;
    }
    console.log(tranfert);
});
```

## Error handling
List of errors in Moncash.errors.
```javascript
const errors = Moncash.errors;

switch (err.type) {
    case errors.NotFoundError:
        console.log(err.description);
        break;
    case errors.UnauthorizedError:
        console.log("Verify your '<clientId>':'<clientSecret>' pairs");
        break;
    default:
        console.log('An error occured')
        break;
}
```
## List of errors
- MoncashError
- APIError
- BadRequestError
- UnauthorizedError
- ForbiddenError
- NotFoundError
- ConflictError
- RequestTimeoutError
- TooManyRequestsError
- UnexpectedError


## Development
Run all tests.
```bash
$ npm install
$ npm test
```

Run a single test suite without a coverage report.

```bash
$ npx jest test/capture.test.js
```

If you want to run tests using your Moncash `clientId` `clientSecret` pairs.

```bash
$ export MONCASH_TEST_CLIENT_ID='<clientId>'
$ export MONCASH_TEST_CLIENT_SECRET='<clientSecret>'
$ npm test
```

## License
[GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.txt)
_Version 3, 29 June 2007_

## Useful links
- [NPM package link](https://www.npmjs.com/package/moncash)
- [Digicel Moncash API Dashboard](https://sandbox.moncashbutton.digicelgroup.com)
- [RestAPI_MonCash_doc.pdf](https://sandbox.moncashbutton.digicelgroup.com/Moncash-business/resources/doc/RestAPI_MonCash_doc.pdf)
- [Old Moncash SDK for Node.js](https://github.com/ecelestin/ecelestin-Moncash-sdk-nodejs)
