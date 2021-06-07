const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener('submit', (e) => {
    checkInputs(e);
    console.log(100);
});


function checkInputs(e) {
    // get the values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        e.preventDefault();
    } else {
        setSuccessFor(username);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        e.preventDefault();
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
        e.preventDefault();
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        e.preventDefault();
    } else {
        setSuccessFor(password);
    }

    if(password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
        e.preventDefault();
    } else if(passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        e.preventDefault();
    }
    else {
        setSuccessFor(password2);
    }
    // show a success message
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error';
    error = true;
}

function setSuccessFor(input) {
    const formControl = input.parentElement; // .form-control
    formControl.className = 'form-control success'
}

function isEmail(email) {
    return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email);
}

