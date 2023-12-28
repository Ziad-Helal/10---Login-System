var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
var users = JSON.parse(localStorage.getItem("users")) || [];

export function signUserUp(userName, userEmail, userPassword) {
  users.push({ userName, userEmail, userPassword });
  localStorage.setItem("users", JSON.stringify(users));
  logUserIn(userEmail);
}

export function logUserIn(userEmail) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  currentUser = {};
  for (var user of users) {
    if (user.userEmail == userEmail) {
      currentUser = user;
      break;
    }
  }
  console.log(currentUser);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  location.assign("/");
}

export function logUserOut() {
  currentUser = {};
  localStorage.setItem("currentUser", "{}");
  location.assign("/login");
}

export function redirectUnAuthorizedUsers() {
  currentUser.userEmail || location.replace("/login");
}

export function isRegistedEmail(inputElement, feedbackElement) {
  inputElement.addEventListener("input", function (event) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userExists = false;
    for (var user of users) {
      if (event.target.value == user.userEmail) {
        userExists = true;
        break;
      }
    }
    feedbackElement.innerText = userExists ? "" : "Not a registered Email!";
  });
}

export function isCorrectPassword(inputElement, feedbackElement, emailInput) {
  inputElement.addEventListener("input", function (event) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var correctPassword = false;
    for (var user of users) {
      if (emailInput.value == user.userEmail)
        if (event.target.value == user.userPassword) {
          correctPassword = true;
          break;
        }
    }
    feedbackElement.innerText = correctPassword ? "" : "Wrong Password!";
  });
}

export function isValidUser(userEmail, userPassword) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var isValid = false;
  for (var user of users) {
    if (user.userEmail == userEmail)
      if (user.userPassword == userPassword) {
        isValid = true;
        break;
      }
  }
  return isValid;
}
