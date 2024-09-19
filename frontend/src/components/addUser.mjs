import axios from "axios";
import { decryptPassword, encryptNewPassword } from "./encrypt.mjs";

const addNewUser = async (username, password, firstName, lastName, email) => {
    password = encryptNewPassword(password)
    try {
        const response = await axios.post('http://localhost:5000/users', {username, password, firstName, lastName, email});
        return response.data

    } catch (error) {
        console.error(error.message)
    }
}

const checkUser = async (users, username, password) => {
    const encryptedPassword = encryptNewPassword(password)

    for (const index in users) {
        const checkUsername = users[index].username;

        if (checkUsername == username) {
            const checkPassword = users[index].password;if (checkPassword == encryptedPassword) {
                return 'User found', users[index];
            }
        }
    }
    return 'User not found. Please try again.'
}

const loginUser = async (username, password) => {
    let message = ''
    try {
        const response = await axios.get('http://localhost:5000/users')
        const users = response.data;

        message = checkUser(users, username, password)
    } catch (error) {
        console.error(error.message)
    }
    return message
}

export {addNewUser, loginUser}