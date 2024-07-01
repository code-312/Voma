const request = require('sync-request');
const assert = require('assert');

module.exports = {
  'Volunteer Registration Form Tests': function (browser) {
    const SlackButtonDOMQuery = 'button.makeStyles-SlackButton-1';
    const ModalDOMQuery = 'div.MuiModal-root[role="presentation"]';
    const COCButtonQuery = '.AcceptCOC input[type="radio"]';

    // assert that back and front end running (ports 3000, 5000)
    let response = request('GET', 'http://localhost:3000');
    assert.equal(response.statusCode, 200, 'Checking if client is running on port 3000');

    response = request('GET', 'http://localhost:5000');
    assert.equal(response.statusCode, 200, 'Checking if server is running on port 5000');

    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('#root', 5000)
      .assert.elementPresent(SlackButtonDOMQuery, 'Registration (Step 1)')
      .click(SlackButtonDOMQuery)
      .waitForElementVisible(ModalDOMQuery)
      .setValue('input#email', 'voma.code.for.chicago@gmail.com')
      .click(ModalDOMQuery + ' button:nth-of-type(2)')
      .assert.elementPresent('input#pronouns', 'Registration (Step 2)')
      .setValue('input#pronouns', 'test/test/test')
      .click('#root form button')
      .assert.elementPresent('input[type="radio"]', 'Registration (Step 3)')
      .click('input[type="radio"]')
      .click('form button:nth-of-type(2)')
      .assert.elementPresent(COCButtonQuery, 'Registration (Step 4)')
      .click(COCButtonQuery)
      .click('form button:nth-of-type(2)')
      .assert.containsText('h1', 'Thank You!', 'Registration (Step 5)')
      .end();
  },
};
