var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
var users = JSON.parse(localStorage.getItem("users")) || [];

(function () {
  var { pathname } = location;
  if (pathname == "/" && !currentUser.length) location.replace("/login");
})();
