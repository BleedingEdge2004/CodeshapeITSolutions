import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};
// This function generates a JWT token for the user with a specified expiration time of 7 days. It uses the user's ID and role as payload data, and signs the token using a secret key stored in environment variables.
export default generateToken;
// This code defines a utility function to generate a JSON Web Token (JWT) for user authentication. It uses the `jsonwebtoken` library to create a token that includes the user's ID and role as payload data. The token is signed with a secret key stored in environment variables, and it has an expiration time of 7 days. The function is then exported for use in other parts of the application.