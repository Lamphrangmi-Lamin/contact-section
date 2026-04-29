const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["name"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const minCharCount = document.getElementById("minCharCount");
const maxCharCount = document.getElementById("maxCharCount");

// Initial rendering of character count
let charCount = message.value.length;
minCharCount.innerText = charCount;

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  console.log(payload);

  sendRequest(payload);

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

  //
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
  }
  updateCharCount();
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

function updateCharCount() {
  charCount = message.value.length;
  minCharCount.innerText = charCount;
}

async function sendRequest(data) {
  const endpoint =
    "https://www.greatfrontend.com/api/projects/challenges/contact";
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    throw new Error("Message: ", error);
  }
}
