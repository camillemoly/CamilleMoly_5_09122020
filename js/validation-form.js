function nameValid(value) { // function which checks if the value of form input doesn't contain numbers
    let regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    return regex.test(value);
}

function emailValid(value) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

function specialCharactersValid(value) {
    let regex = /^[^@&"()!_$*€£`+=\/;?#]+$/;
    return regex.test(value);
}

function onlyWhitespacesInvalid(value) {
    let regex = /^\s+$/;
    return regex.test(value);
}

export { nameValid, emailValid, specialCharactersValid, onlyWhitespacesInvalid }; 