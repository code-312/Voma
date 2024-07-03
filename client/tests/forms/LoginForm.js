const request = require('sync-request');
const assert = require('assert');

module.exports = {
  'Login Form (Successful Login)': function (browser) {
    // assert that back and front end running (ports 3000, 5000)
    let response = request('GET', 'http://localhost:3000');
    assert.equal(response.statusCode, 200, 'Checking if client is running on port 3000');

    response = request('GET', 'http://localhost:5000');
    assert.equal(response.statusCode, 200, 'Checking if server is running on port 5000');

    // Successful Login
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('#root', 5000)
      .assert.elementPresent('#input-email', '(Login Form) Check for email field.')
      .setValue('input#input-email', 'voma.code.for.chicago@gmail.com')
      .setValue('input#input-password', 'password')
      .click('button[type="submit"]')
      .pause(1000)
      .getCookie('connect.sid', function (result) {
        this.assert.equal(
          result.name,
          'connect.sid',
          '(Session) Check session cookie {connect.sid} is set.',
        );
      })
      .url(function (result) {
        this.assert.equal(
          result.value,
          'http://localhost:3000/board',
          '(Login Form) Verify successful login redirected to /board',
        );
      })
      .deleteCookie('connect.sid')
      .refresh()
      .pause(1000)
      .url(function (result) {
        this.assert.equal(
          result.value,
          'http://localhost:3000/login',
          '(Session) Verify deleting session cookie {connect.sid} redirects user to /login on refresh',
        );
      })
      .end();

    return browser;
  },

  'Login Form (Failed Login)': function (browser) {
    // Unsuccessful Login
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('#root', 5000)
      .assert.elementPresent('#input-email', '(Login Form) Check for email field.')
      .setValue('input#input-email', 'voma.code.for.chicago@gmail.com')
      .setValue('input#input-password', 'incorrect password :)')
      .click('button[type="submit"]')
      .pause(1000)
      .url(function (result) {
        this.assert.equal(
          result.value,
          'http://localhost:3000/login',
          '(Login Form) Verfiy failed login did not redirect to authenticated page.',
        );
      })
      .url('http://localhost:3000/board')
      .pause(1000)
      .url(function (result) {
        this.assert.equal(
          result.value,
          'http://localhost:3000/login',
          '(Session) Verify that after failed login attempt, authenticated pages redirect to /login.',
        );
      })
      .end();

    return browser;
  },
};
