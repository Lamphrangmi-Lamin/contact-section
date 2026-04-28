const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["username"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formData = new FormData(contactForm);
console.log(formData)
// console.log(contactForm.elements['username']);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstErrorField = null;
    
    // Username validation
    if (!username.value) {
        if (!firstErrorField) firstErrorField = username;
        isValid = false;
        showError(username);
    }

    // Email address validation
    if (!email.value) {
        if (!firstErrorField) firstErrorField = email;
        isValid = false;
        showError(email);
    }

    // Message validation
    if (!message.value) {
        if (!firstErrorField) firstErrorField = message;
        isValid = false;
        showError(message);
    }
    if (!isValid) {
        firstErrorField.focus();
        return;
    };
})

function showError(input) {
    const field = input.parentElement;
    const error = field.querySelector(".error");
    error.classList.remove("hidden");
}