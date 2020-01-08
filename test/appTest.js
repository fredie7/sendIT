const assert = require('chai').assert;
const app = require('../app')

describe('App', () => {
    it('app should run hello', ()=> {
        assert.equal(app(), 'hello')
    })
    it('type should return a string', ()=> {
        assert.typeOf(app(), 'string')
    })
})
