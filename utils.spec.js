const { describe } = require("mocha");
const should = require('should'); // asset와 같이 결과 값을 체크하기 위한 라이브러리
const utils = require('./utils')

describe('Utils - capitalizer는 ', function() {
    it ('문자열을 대문자로 전환함', function() {
        const testStr = 'hello';
        const expectedStr = 'HELLO';

        // assert.equal(expectedStr, utils.capitalizer(testStr));
        utils.capitalizer(testStr).should.be.equal(expectedStr);
    })
});