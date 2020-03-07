const request = require('supertest');
const app = require('../src/app');

test('Should sign up a new user', async() => {
    await request(app)
        .post('/users')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: '1111111'
        })
        .expect(201);
});
