const isUsernameValid = (username) => {
    if(username && username.match(/^[a-zA-Z0-9]{5,15}$/)){
        return true;
    }
    return false;
}

const isPasswordValid = (password) => {
    if(password && password.match(/^.{6,12}$/)){
        return true;
    }
    return false;
}

const isUserDataValid = (username, password) => {
    return (isPasswordValid(password) && isUsernameValid(username));
}

module.exports = { isUserDataValid }