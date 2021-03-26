'use strict';

const Moncash = require('../index');

const moncash = new Moncash();


const clientId      =   process.env.MONCASH_TEST_CLIENT_ID?process.env.MONCASH_TEST_CLIENT_ID:'c1bf0a27d6bbb217a599c9e25480c11d';
const clientSecret  =   process.env.MONCASH_TEST_CLIENT_SECRET?process.env.MONCASH_TEST_CLIENT_SECRET:'oHrr4tbnB1PH0uz6VQNUvVVDNVNvk0WiIXZWBAed4-CBCwilT8yUdS87AZoPrtqN';

moncash.configure({
    mode:'sandbox',
    clientId,
    clientSecret
});

module.exports=moncash;
