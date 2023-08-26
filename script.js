const signupContainer = document.getElementById("signup-container");
const profileContainer = document.getElementById("profile-container");
const signupForm = document.getElementById("signup-form");
const profileDetails = document.getElementById("profile-details");
const logoutButton = document.getElementById("logout-btn");

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

function redirectBasedOnAuth() {
  if (isAuthenticated()) {
    signupContainer.style.display = "none";
    profileContainer.style.display = "block";
    displayProfileDetails();
  } else {
    signupContainer.style.display = "block";
    profileContainer.style.display = "none";
  }
}

function displayProfileDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    profileDetails.innerHTML = `
      <p>Full Name: ${user.fullname}</p>
      <p>Email: ${user.email}</p>
      <p>Access Token: ${user.access_token}</p>
    `;
  }
}

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    displayErrorMessage("Passwords do not match.");
    return;
  }

  const access_token = generateAccessToken();

  const user = { fullname, email, access_token };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("access_token", access_token);

  displaySuccessMessage("Signup successful!");
  setTimeout(() => {
    clearMessages();
    redirectBasedOnAuth();
  }, 2000);
});

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  redirectBasedOnAuth();
});

function generateAccessToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 16;
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  clearMessages();
  redirectBasedOnAuth();
});

function displayErrorMessage(message) {
  const errorMessage = document.createElement("div");
  errorMessage.id = "error-message";
  errorMessage.textContent = message;
  signupForm.appendChild(errorMessage);
}

function displaySuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.id = "signup-message";
  successMessage.textContent = message;
  signupForm.appendChild(successMessage);
}

function clearMessages() {
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("signup-message");
  if (errorMessage) errorMessage.remove();
  if (successMessage) successMessage.remove();
}

redirectBasedOnAuth();
