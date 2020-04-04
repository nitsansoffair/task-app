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
    
    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    
    input TaskInputData {
        description: String!
        completed: Boolean
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }
    
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createTask(taskInputData: TaskInputData): Task!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
