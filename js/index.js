const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["username"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const nameError = document.getElementById("nameError");
console.log(nameError)
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formData = new FormData(contactForm);
console.log(formData)
// console.log(contactForm.elements['username']);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!username.value) {
        console.log(nameError.classList);
    }
})