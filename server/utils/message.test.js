var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => { // no need to pass in done since this is a synchronous test
    it('should generate the correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from, text});
    });

});