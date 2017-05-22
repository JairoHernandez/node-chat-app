const expect = require('expect');
const {isRealString} = require('./validation');

// import isRealString

describe('isRealSTring', () => { // no need to pass in done since this is a synchronous test
    it('should reject non-string values', () => {
        // should reject non-string values by passing a number
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        // should reject strings with only spaces should 
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string containing non-space characters', () => {
        // should allow string with non-space characters
        var res = isRealString('  jairo  ');
        expect(res).toBe(true);
    });
});