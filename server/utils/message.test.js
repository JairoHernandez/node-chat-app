var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => { // no need to pass in done since this is a synchronous test
    it('should generate the correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        //console.log(message);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });

});

describe('generateLocationMessage', () => {
    // no need to pass in done since this is a synchronous 
    it('should generate correct location object', () => {
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
