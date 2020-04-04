const express = require('express');
const graphqlHttp = require('express-graphql');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use((req, res, next) => {
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }

    next();
});
app.use(auth);
app.use('/graphql', graphqlHttp(({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err){
        if(!err.originalError){
            return err;
        }

        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;

        return {
            message,
            status: code,
            data
        };
    }
})));

module.exports = app;
