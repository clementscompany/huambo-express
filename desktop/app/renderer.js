import { Navigate, Route } from "./src/Routes.js";
export const mainContainer = document.querySelector("#mainContainer");
window.addEventListener("DOMContentLoaded", () => {
  // Navigate("/");
  Route();
});
window.addEventListener("hashchange", Route);
