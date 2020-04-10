const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../src/models/user');
const { login } = require('../src/graphql/resolvers');

describe('User - Resolver', function () {
    it('Should throw an error if accessing the db fails', async function () {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        try {
            await login({
                email: 'test@test.net',
                password: '12345678'
            });
        } catch (e) {
            expect(e).to.be.an('error');
        }

        User.findOne.restore();
    });
});
