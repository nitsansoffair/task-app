const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'test_1',
    email: 'test_1@test.com',
    password: '1111111'
};

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should sign up a new user', async() => {
    await request(app)
        .post('/users')
        .send({
            name: 'test_2',
            email: 'test_2@test.com',
            password: '1111111'
        })
        .expect(201);
});

test('Should Login existing user', async() => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
});

test('Should not login non-existent user', async() => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'not_exists@test.com',
            password: '1111111'
        })
        .expect(400);
});
