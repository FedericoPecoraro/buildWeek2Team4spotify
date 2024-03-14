function toggleElements() {
    const passwordInput = document.getElementById('password-login');
    const eyeIconPrivacy = document.getElementById('eye-icon-privacy');
    const eyeIconVisible = document.getElementById('eye-icon-visibile');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIconPrivacy.style.display = 'none';
        eyeIconVisible.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeIconPrivacy.style.display = 'block';
        eyeIconVisible.style.display = 'none';
    }
}

document.getElementById('eye-icon-privacy').addEventListener('click', toggleElements);
document.getElementById('eye-icon-visibile').addEventListener('click', toggleElements);


function validateForm(){
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
    let loginButton = document.getElementById('login-btn');
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    let formValid = true;

    if(!emailRegex.test(email)){
        alert('Per favore inserisci un indirizzo email valido');
        formValid = false;
    }
    if(!passwordRegex.test(password)){
        alert('La password deve contenere almeno 8 caratteri e massimo 16, almeno una lettera maiuscola, almeno una lettera minuscola, almeno 1 numero, almeno 1 carattere speciale.');
        formValid = false;
    }
    return formValid;
};