import { mainContainer } from "../renderer.js";
import { HomePage } from "./pages/home/HomePage.js";
import LoginPage from "./pages/loginPage/LoginPage.js";
import { RotasPage } from "./pages/rotas/RotasPage.js";
export function Route() {
  const path = window.location.hash.substring(1);
  switch (path) {
    case "/":
      new LoginPage(mainContainer);
      break;

    case "/home":
      new HomePage(mainContainer);
      break;

    case "/dashboard":
      new HomePage(mainContainer);
      break;

    case "/rotas":
      new RotasPage(mainContainer);
      break;

    default:
      new LoginPage(mainContainer);
      break;
  }
}

export function Navigate(path) {
  window.location.hash = path;
}
