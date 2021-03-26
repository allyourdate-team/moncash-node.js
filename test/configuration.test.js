'use strict';

const Configuration = require('../lib/Configuration');

describe('Configuration',()=>{
    test('sandbox',()=>{
        return expect(new Configuration('test','test',{mode:'sandbox'})).toBeDefined();
    });

    test('sandbox',()=>{
        return expect(new Configuration('test','test')).toBeDefined();
    });

    test('live',()=>{
        return expect(new Configuration('test','test',{mode:'live'})).toBeDefined();
    });

    test('live fail',(done)=>{
        try {
            new Configuration({mode:'live'});
        } catch (error) {
            expect(error).toBeDefined();
        }
        done();
    });
});