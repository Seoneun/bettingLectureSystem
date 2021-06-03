const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit', (e) => {
    //e.preventDefault();

    var error = false;
    error = checkInputs(error);
    if(error === false) {
        //window.location = 'home.html'
    }
});

function checkInputs(error) {
    // get the values from the inputs
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === '') {
        error = setErrorFor(email, 'Email cannot be blank');
    } else if(!isEmail(emailValue)) {
        error = setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === '') {
        error = setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    return error
    // show a success message
}

function setErrorFor(input, message, error) {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error';
    error = true;

    return error;
}

function setSuccessFor(input) {
    const formControl = input.parentElement; // .form-control
    formControl.className = 'form-control success'
}

function isEmail(email) {
    return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email);
}

