import { runAppropriatePageScript } from "./index.js";
import { redirectUnAuthorizedUsers } from "./user.js";

var routes = {
  "/": {
    location: "./html-templates/index.html",
    title: "Home",
  },
  "/login": {
    location: "./html-templates/login.html",
    title: "Login",
  },
  "/register": {
    location: "./html-templates/register.html",
    title: "Registration",
  },
  404: {
    location: "./html-templates/notFound.html",
    title: "Not Found",
  },
};

export default function routerInit(handleCurrentRoute = true) {
  var pageAnchors = document.body.querySelectorAll("a.localPage");
  pageAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", loadNewPage);
  });

  handleCurrentRoute && routeChangeHandler();
  window.addEventListener("popstate", routeChangeHandler);
}

function loadNewPage(event) {
  event.preventDefault();
  history.pushState({}, "", event.target.href);
  routeChangeHandler();
}

async function routeChangeHandler() {
  var { pathname } = location;
  pathname == "/" && redirectUnAuthorizedUsers();

  var route = routes[pathname] || routes[404];
  var newPage = await fetch(route.location).then(function (response) {
    return response.text();
  });

  document.head.querySelector("title").innerText = route.title;
  document.getElementById("dynamicPageContent").innerHTML = newPage;
  runAppropriatePageScript(pathname);

  routerInit(false);
}
