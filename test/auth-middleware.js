const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../src/middleware/auth');

describe('Auth middleware', function () {
    it('Should set req.isAuth to false if no authorization header is present', async () => {
        const req = {
            header: function () {
                return null;
            }
        };

        await authMiddleware(req, {}, () => {});

        expect(req.isAuth).to.equal(false);
    });

    it('Shoudk set req.isAuth to false if the authorization header is only one string', async () => {
        const req = {
            header: function () {
                return 'Bearer';
            }
        };

        await authMiddleware(req, {}, () => {});

        expect(req.isAuth).to.equal(false);
    });

    it('Shoudk set req.isAuth to false if the token cannot be verified', async () => {
        const req = {
            header: function () {
                return 'Bearer abc';
            }
        };

        await authMiddleware(req, {}, () => {});

        expect(req.isAuth).to.equal(false);
    });

    it('Shoudk a userId after decoding the token', async () => {
        const req = {
            header: function () {
                return 'Bearer';
            }
        };

        sinon.stub(jwt, 'verify');
        jwt.verify.returns({
            _id: 'abc'
        });

        await authMiddleware(req, {}, () => {});

        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;

        jwt.verify.restore();
    });
});
