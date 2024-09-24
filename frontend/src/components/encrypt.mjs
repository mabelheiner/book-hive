const encryptNewPassword = (password) => {
    let encryptedPassword = "";
    const alphabet_lower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet_higher = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const numbers = '0123456789';

    for (const char in password) {

        if (alphabet_lower.includes(password[char])){
            encryptedPassword += (alphabet_lower[alphabet_lower.indexOf(password[char]) + 3]);
        }
        else if (alphabet_higher.includes(password[char])){
            encryptedPassword += (alphabet_higher[alphabet_higher.indexOf(password[char]) + 3]);
        }
        else if (specialCharacters.includes(password[char])) {
            encryptedPassword += (specialCharacters[specialCharacters.indexOf(password[char]) + 3]);
        }

        else if (numbers.includes(password[char])) {
            encryptedPassword += (numbers[numbers.indexOf(password[char]) + 3]);
        }
        else {
            return console.error('invalid character in password')
        }
    }

    return encryptedPassword;
}

const decryptPassword = (password) => {
    let decryptedPassword = "";
    const alphabet_lower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet_higher = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const numbers = '0123456789';

    for (const char in password) {

        if (alphabet_lower.includes(password[char])){
            decryptedPassword += (alphabet_lower[alphabet_lower.indexOf(password[char]) - 3]);
        }
        else if (alphabet_higher.includes(password[char])){
            decryptedPassword += (alphabet_higher[alphabet_higher.indexOf(password[char]) - 3]);
        }
        else if (specialCharacters.includes(password[char])) {
            decryptedPassword += (specialCharacters[specialCharacters.indexOf(password[char]) - 3]);
        }
        else if (numbers.includes(password[char])) {
            decryptedPassword += (numbers[numbers.indexOf(password[char]) + 3]);
        }
        else {
            return console.error('invalid character in password')
        }
    }

    return decryptedPassword;
}

const sayHello = () => {
    return 'hello'
}

export {
    encryptNewPassword, 
    decryptPassword,
    sayHello
}