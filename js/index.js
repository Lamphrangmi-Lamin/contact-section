const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["username"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const usernameError = document.getElementById("usernameError");
// console.log(usernameError)
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formData = new FormData(contactForm);
console.log(formData)
// console.log(contactForm.elements['username']);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!username.value) {
        showError(username);
    }
    if (!email.value) {
        showError(email);
    }
    if (!message.value) {
        showError(message);
    }
})

function showError(input) {
    const field = input.parentElement;
    const error = field.querySelector(".error");
    error.classList.remove("hidden");
    // input.focus();
}