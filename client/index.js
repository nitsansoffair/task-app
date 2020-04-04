const fetch = require('node-fetch');

const signup = ({ email, name, password }) => {
    const graphqlQuery = {
        query: `
        mutation {
            createUser(userInput: {email: "${email}", name: "${name}", password:"${password}"}){
                _id
                email
            }
        }
    `
    };
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if(resData.errors && resData.errors[0].status === 422){
                throw new Error('Error validation.');
            }

            if(resData.errors){
                throw new Error('User creation failed.');
            }

            console.log(resData);
            return resData;
        })
        .catch(err => console.log(err));
};

const login = ({ email, password }) => {
    const graphqlQuery = {
        query: `{
            login(email: "${email}", password: "${password}") {
                token
                userId
            } 
         }`
    };
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if(resData.errors && resData.errors[0].status === 422){
                throw new Error('Error validation.');
            }

            if(resData.errors){
                throw new Error('User login failed.');
            }

            return resData;
        })
        .catch(err => console.log(err));
};

const createTask = ({ description, completed }, token) => {
    const graphqlQuery = {
        query: `
            mutation {
                createTask(taskInputData: { description: "${description}", completed: ${completed} }) {
                    _id
                    description
                    completed
                }
            }`
    };

    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(graphqlQuery)
    })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if(resData.errors && resData.errors[0].status === 422){
                throw new Error('Error validation.');
            }

            if(resData.errors){
                console.log(resData.errors);
                throw new Error('Error validation.');
            }

            return resData;
        })
        .catch(err => console.log(err));
};

login({ email: '', password: '' })
    .then(({ data: { login: { token } } }) => {
        createTask({ description: 'susu sans', completed: false }, token)
            .then(res => console.log(res))
            .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
