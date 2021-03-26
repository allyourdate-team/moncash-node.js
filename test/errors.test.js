'use strict';

const errors = require('../lib/utils/Errors');

describe('check Errors',()=>{
    test('401',()=>{
        return expect(errors.MoncashError.generate(401).type).toBe(errors.MoncashError.types.UnauthorizedError);
    });

    test('429',()=>{
        return expect(errors.MoncashError.generate(429).type).toBe(errors.MoncashError.types.TooManyRequestsError);
    });

    test('404',()=>{
        return expect(errors.MoncashError.generate(404).type).toBe(errors.MoncashError.types.NotFoundError);
    });

    test('408',()=>{
        return expect(errors.MoncashError.generate(408).type).toBe(errors.MoncashError.types.RequestTimeoutError);
    });

    test('400',()=>{
        return expect(errors.MoncashError.generate(400).type).toBe(errors.MoncashError.types.BadRequestError);
    });

    test('403',()=>{
        return expect(errors.MoncashError.generate(403).type).toBe(errors.MoncashError.types.ForbiddenError);
    });

    test('409',()=>{
        return expect(errors.MoncashError.generate(409).type).toBe(errors.MoncashError.types.ConflictError);
    });

    test('500',()=>{
        return expect(errors.MoncashError.generate(500).type).toBe(errors.MoncashError.types.APIError);
    });

    test('502',()=>{
        return expect(errors.MoncashError.generate(502).type).toBe(errors.MoncashError.types.UnexpectedError);
    });
    
});