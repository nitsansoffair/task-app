const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Task {
        _id: ID!
        description: String!
        completed: Boolean
        owner: User!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        age: Int
        tokens: [String!]
        tasks: [Task]
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootQuery {
        hello: String
    }
    
    type RootMutation {
        createUser(userInput: UserInputData): User!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
