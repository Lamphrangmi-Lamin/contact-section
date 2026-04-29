const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["username"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formData = new FormData(contactForm);
console.log(formData);
// console.log(contactForm.elements['username']);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  let firstErrorField = null;

  // Username validation
  if (username.value.trim() === "") {
    if (!firstErrorField) firstErrorField = username;
    isValid = false;
    addErrorStyle(isValid, username);
    showError(username, "Name is required.");
  }

  // Email address validation
  if (!email.value) {
    if (!firstErrorField) firstErrorField = email;
    isValid = false;
    addErrorStyle(isValid, username);
    showError(email, "Email is required.");
  }

  if (email.value && !isEmailValid(email.value)) {
    if (!firstErrorField) firstErrorField = email;
    isValid = false;
    addErrorStyle(isValid, email);
    showError(email, "Please enter a valid email address.");
  }

  // Message validation
  if (!message.value) {
    if (!firstErrorField) firstErrorField = message;
    isValid = false;
    addErrorStyle(isValid, message);
    showError(message, "Message is required");
  }
  if (!isValid) {
    firstErrorField.focus();
    return;
  }
});


// EventListeners
username.addEventListener("input", (e) => {
  if (e.target.value) {
    removeErrorStyle(username);
    showError(username, "");
    return;
  }
});

email.addEventListener("input", (e) => {
  if (isEmailValid(e.target.value)) {
    removeErrorStyle(email);
    showError(email, "");
    return;
  }
});

message.addEventListener("input", (e) => {
  if (e.target.value) {
    removeErrorStyle(message);
    showError(message, "");
    return;
  }
});

// Helper functions
function showError(input, message) {
  const field = input.parentElement;
  const error = field.querySelector(".error");
  error.innerText = message;
  error.classList.remove("hidden");
}

function isEmailValid(email) {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return regex.test(email);
}

function addErrorStyle(isValid, inputField) {
  if (!isValid) {
    inputField.classList.remove("focus:border-indigo-600");
    inputField.classList.add("focus:border-red-600");

    inputField.classList.remove("focus:outline-indigo-200");
    inputField.classList.add("focus:outline-red-50");
    return;
  }
}

function removeErrorStyle(inputField) {
  inputField.classList.remove("focus:border-red-600");
  inputField.classList.add("focus:border-indigo-600");

  inputField.classList.remove("focus:outline-red-50");
  inputField.classList.add("focus:outline-indigo-200");
  return;
}
