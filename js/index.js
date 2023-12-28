import routerInit from "./router.js";
import {
  isCorrectPassword,
  isRegistedEmail,
  isValidUser,
  logUserIn,
  logUserOut,
  signUserUp,
} from "./user.js";

var logoutButton = document.getElementById("logoutButton");

(function () {
  routerInit();
})();

export function runAppropriatePageScript(path) {
  switch (path) {
    case "/":
      HomePageScript();
      break;
    case "/login":
      loginPageScript();
      break;
    case "/register":
      registerPageScript();
      break;
    default:
      notFoundPageScript();
      break;
  }
}

function HomePageScript() {
  logoutButton.style.display = "block";

  var currentUser = JSON.parse(localStorage.getItem("currentUser"));

  var userSpan = document.getElementById("user");
  userSpan.innerText = currentUser.userName;

  displayAllUsers();
  logoutButton.addEventListener("click", logUserOut);
}

function loginPageScript() {
  logoutButton.style.display = "none";

  var emailInput = document.getElementById("emailInput");
  var emailInputFeedback = document.querySelector(".emailFeedback");
  isRegistedEmail(emailInput, emailInputFeedback);

  var passwordInput = document.getElementById("passwordInput");
  var passwordInputFeedback = document.querySelector(".passwordFeedback");
  isCorrectPassword(passwordInput, passwordInputFeedback, emailInput);

  var loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    isValidUser(emailInput.value, passwordInput.value) &&
      logUserIn(emailInput.value);
  });
}

function registerPageScript() {
  logoutButton.style.display = "none";

  var nameInputRegex = new RegExp(/^[\w ]{3,14}$/);
  var nameInput = document.getElementById("nameInput");
  var nameInputFeedback = document.querySelector(".userNameFeedback");
  isValidInput(nameInput, nameInputRegex, nameInputFeedback);

  var emailInputRegex = new RegExp(/^[\w \.]+@\w+\.com$/);
  var emailInput = document.getElementById("emailInput");
  var emailInputFeedback = document.querySelector(".emailFeedback");
  isValidInput(emailInput, emailInputRegex, emailInputFeedback);

  var passwordInputRegex = new RegExp(/^[\w \.]{5,}$/);
  var passwordInput = document.getElementById("passwordInput");
  var passwordInputFeedback = document.querySelector(".passwordFeedback");
  isValidInput(passwordInput, passwordInputRegex, passwordInputFeedback);

  var singupButton = document.getElementById("singupButton");
  singupButton.addEventListener("click", function (event) {
    event.preventDefault();
    areValidSignupInputs([
      { input: nameInput, regex: nameInputRegex },
      { input: emailInput, regex: emailInputRegex },
      { input: passwordInput, regex: passwordInputRegex },
    ]) && signUserUp(nameInput.value, emailInput.value, passwordInput.value);
  });
}

function notFoundPageScript() {
  logoutButton.style.display = "none";
}

function isValidInput(inputElement, regexRule, feedbackElement) {
  var errorMessage = "";
  switch (inputElement.id) {
    case "nameInput":
      errorMessage = "a-z, A-Z, _, space, 3-14 characters.";
      break;
    case "emailInput":
      errorMessage = "Ex:. me@ex.com";
      break;
    case "passwordInput":
      errorMessage = "a-z, A-Z, _, space, dot, at least 5 characters.";
      break;
    default:
      errorMessage = "Wrong!";
      break;
  }

  inputElement.addEventListener("input", function (event) {
    feedbackElement.innerText = regexRule.test(event.target.value)
      ? ""
      : errorMessage;
  });
}

function areValidSignupInputs(inputElements) {
  var validInputs = true;
  for (var element of inputElements) {
    if (element.regex.test(element.input.value)) continue;
    else {
      validInputs = false;
      break;
    }
  }

  return validInputs;
}

function displayAllUsers() {
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var users = JSON.parse(localStorage.getItem("users"));

  var userCards = "";
  users.forEach(function ({ userName, userEmail }) {
    userCards += `
    <li class="card${userEmail == currentUser.userEmail ? " currentUser" : ""}">
    <p class="userName">${userName}</p>
    <p class="userEmail">${userEmail}</p>
    </li>
    `;
  });

  var usersList = document.getElementById("users");
  usersList.innerHTML = userCards;
}
