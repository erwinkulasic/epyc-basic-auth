const app = require('epyc');
const isAuthenticated = require('../src/index');
const axios = require('axios');
const assert = require('assert');

describe('epyc-basic-auth', () => {
    let instance = null;

    before(() => {
        app.get('/', isAuthenticated(({ username, password }) => username === "John" && password === "Doe123"), (req, res) => res.end('Hello World'));
        instance = app.bootstrap(8080);
    })

    after(() => instance.close());

    it('authentication', done => {
        axios.get('http://127.0.0.1:8080/', {
            headers: {
                authorization: `Basic ${Buffer.from('John:Doe123').toString('base64')}`
            }
        }).then(response => {
            assert.equal(response.data, "Hello World")
            done();
        })
    })

    it('wrong credentials', done => {
        axios.get('http://127.0.0.1:8080/', {
            headers: {
                authorization: `Basic ${Buffer.from('John:Doe').toString('base64')}`
            }
        }).catch(error => {
            assert.equal(error.response.status, 401)
            done();
        })
    })

    it('no authorization header defined', done => {
        axios.get('http://127.0.0.1:8080/', {
            headers: {}
        }).catch(error => {
            assert.equal(error.response.status, 401)
            done();
        })
    })
})