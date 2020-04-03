const express = require('express');
const graphqlHttp = require('express-graphql');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use('/graphql', graphqlHttp(({
    schema: graphqlSchema,
    rootValue: graphqlResolver
})));

module.exports = app;
