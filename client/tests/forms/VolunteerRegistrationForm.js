const request = require('sync-request');
const assert = require('assert');

module.exports = {
    'Volunteer Registration Form Tests': function(browser) {
        const SlackButtonDOMQuery = 'button.makeStyles-SlackButton-1';
        const ModalDOMQuery = 'div.MuiModal-root[role="presentation"]';
        const COCButtonQuery = '.AcceptCOC input[type="radio"]';
        
        // assert that back and front end running (ports 3000, 5000)
        let response = request('GET', 'http://localhost:3000');
        console.log('Checking if client is running...');
        assert.equal(response.statusCode, 200);

        response = request('GET', 'http://localhost:5000');
        console.log('Checking if server is running...');
        assert.equal(response.statusCode, 200);

        browser
            .url('http://localhost:3000/')
            .waitForElementVisible('#root', 5000)
            .assert.elementPresent(SlackButtonDOMQuery)
            .click(SlackButtonDOMQuery)
            .waitForElementVisible(ModalDOMQuery)
            .setValue('input#email', 'voma.code.for.chicago@gmail.com')
            .click(ModalDOMQuery + ' button:nth-of-type(2)')
            .assert.elementPresent('input#pronouns')
            .setValue('input#pronouns', 'test/test/test')
            .click('#root form button')
            .assert.elementPresent('input[type="radio"]')
            .click('input[type="radio"]')
            .click('form button:nth-of-type(2)')
            .assert.elementPresent(COCButtonQuery)
            .click(COCButtonQuery)
            .click('form button:nth-of-type(2)')
            .assert.containsText('h1', 'Thank You!')
            .end();

    }
}
