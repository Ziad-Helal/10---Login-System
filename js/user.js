var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
var users = JSON.parse(localStorage.getItem("users")) || [];

export function signUserUp(userName, userEmail, userPassword) {
  users.push({ userName, userEmail, userPassword });
  localStorage.setItem("users", JSON.stringify(users));
  logUserIn(userName, userEmail, userPassword);
}

export function logUserIn(userName, userEmail, userPassword) {
  currentUser = { userName, userEmail, userPassword };
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
