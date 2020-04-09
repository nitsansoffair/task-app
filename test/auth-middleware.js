const { expect } = require('chai');

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
});
