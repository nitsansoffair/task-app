const { expect } = require('chai');

const authMiddleware = require('../src/middleware/auth');

it('Should throw an error if no authorization header is present', async () => {
    const req = {
        header: function () {
            return null;
        }
    };

    await authMiddleware(req, {}, () => {});
    expect(req.isAuth).to.equal(false);
});
