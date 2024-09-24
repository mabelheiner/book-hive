const encryptNewPassword = (password) => {
    let encryptedPassword = "";
    const alphabet_lower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet_higher = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const numbers = '0123456789';

    console.log('Original password', password);
    for (const letter in password) {
        console.log('letter', letter);
    }

    for (const char in password) {

        if (alphabet_lower.includes(password[char])){
            console.log(`index of letter ${password[char]}`, alphabet_lower.indexOf(password[char]));
            console.log(`encrypted letter ${password[char]}`, alphabet_lower[alphabet_lower.indexOf(password[char]) + 3]);
            encryptedPassword += (alphabet_lower[alphabet_lower.indexOf(password[char]) + 3]);
        }
        else if (alphabet_higher.includes(password[char])){
            console.log(`index of letter ${password[char]}`, alphabet_higher.indexOf(password[char]));
            console.log(`encrypted letter ${password[char]}`, alphabet_higher[alphabet_higher.indexOf(password[char]) + 3]);
            encryptedPassword += (alphabet_higher[alphabet_higher.indexOf(password[char]) + 3]);
        }
        else if (specialCharacters.includes(password[char])) {
            encryptedPassword += (specialCharacters[specialCharacters.indexOf(password[char]) + 3]);
        }

        else if (numbers.includes(password[char])) {
            encryptedPassword += (numbers[numbers.indexOf(password[char]) + 3]);
        }
        else {
            console.log('Character', password[char])
            return console.error('invalid character in password')
        }
    }
    console.log('Encrypted password', encryptedPassword)

    return encryptedPassword;
}

const decryptPassword = (password) => {
    console.log('Password to decrypt', password)
    let decryptedPassword = "";
    const alphabet_lower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet_higher = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const numbers = '0123456789';

    for (const char in password) {

        if (alphabet_lower.includes(password[char])){
            console.log(`index of letter ${password[char]}`, alphabet_lower.indexOf(password[char]));
            console.log(`encrypted letter ${password[char]}`, alphabet_lower[alphabet_lower.indexOf(password[char]) - 3]);
            decryptedPassword += (alphabet_lower[alphabet_lower.indexOf(password[char]) - 3]);
        }
        else if (alphabet_higher.includes(password[char])){
            console.log(`index of letter ${password[char]}`, alphabet_higher.indexOf(password[char]));
            console.log(`encrypted letter ${password[char]}`, alphabet_higher[alphabet_higher.indexOf(password[char]) - 3]);
            decryptedPassword += (alphabet_higher[alphabet_higher.indexOf(password[char]) - 3]);
        }
        else if (specialCharacters.includes(password[char])) {
            decryptedPassword += (specialCharacters[specialCharacters.indexOf(password[char]) - 3]);
        }
        else if (numbers.includes(password[char])) {
            decryptedPassword += (numbers[numbers.indexOf(password[char]) + 3]);
        }
        else {
            console.log('Character', password[char])
            return console.error('invalid character in password')
        }
    }
    console.log('Decrypted password', decryptedPassword)

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