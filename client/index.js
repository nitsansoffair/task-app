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
    fetch('http://localhost:3000/graphql', {
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

signup({
    email: 'test-client@email.com',
    name: 'test-client@email.com',
    password: 'test-client@email.com'
});
