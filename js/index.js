const contactForm = document.getElementById("contactForm");
const username = contactForm.elements["name"];
const email = contactForm.elements["email"];
const message = contactForm.elements["message"];
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const minCharCount = document.getElementById("minCharCount");
const maxCharCount = document.getElementById("maxCharCount");
const successState = document.getElementById("success-state");
const successBtn = document.getElementById("successBtn");
const successMsg = document.getElementById("successMsg");
const toaster = document.getElementById("toaster");
const toastBadge = document.getElementById("toastBadge");
const toastMessage = document.getElementById("toastMessage");

// Initial rendering of character count
let charCount = message.value.length;
minCharCount.innerText = charCount;

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

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

  sendRequest(payload);
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

successBtn.addEventListener("click", () => {
  contactForm.classList.remove("hidden");
  successState.classList.add("hidden");
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

function resetForm() {
  contactForm.reset();
  updateCharCount();
}

function showSuccessMsg(container, message) {
  container.innerText = message;
}

function showErrorToast(message) {
  toaster.classList.remove("hidden");

  toaster.classList.remove("bg-green-50");
  toaster.classList.add("bg-red-50");

  toastBadge.classList.remove("text-green-700");
  toastBadge.classList.add("text-red-800");

  toastMessage.classList.remove("text-green-700");
  toastMessage.classList.add("text-red-600");

  toastBadge.innerText = "Error";
  toastMessage.innerText =
    message ||
    "Failed to submit. Please ensure your details are correct or try again later.";
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

    // Handle successful API response
    if (response.ok) {
      const result = await response.json();
      showSuccessMsg(successMsg, result.message);
      resetForm();
      successState.classList.remove("hidden");
      contactForm.classList.add("hidden");
      return;
    }

    // Handle failed API response
    if (!response.ok) {
      showErrorToast();
    }
  } catch (error) {
    console.log(error);
    showErrorToast();
  }
}
