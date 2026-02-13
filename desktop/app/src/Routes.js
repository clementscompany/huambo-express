import { mainContainer } from "../renderer.js";
import { HomePage } from "./pages/home/HomePage.js";
import LoginPage from "./pages/loginPage/LoginPage.js";
import { RotasPage } from "./pages/rotas/RotasPage.js";
import { MotoristasPage } from "./pages/motoristas/MotoristasPage.js";
import { AutoCarrosPage } from "./pages/autocarros/AutoCarrosPage.js";
import { ViagensPage } from "./pages/viagens/ViagensPage.js";
import { ReservasPage } from "./pages/reservas/ReservasPage.js";
import { ClientesPage } from "./pages/clientes/ClientesPage.js";

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

    case "/viagens":
      new ViagensPage(mainContainer);
      break;
    
    case "/reservas":
      new ReservasPage(mainContainer);
      break;

    case "/clientes":
      new ClientesPage(mainContainer);
      break;

    case "/motoristas":
      new MotoristasPage(mainContainer);
      break;

    case "/autocarros":
      new AutoCarrosPage(mainContainer);
      break;

    default:
      new LoginPage(mainContainer);
      break;
  }
}

export function Navigate(path) {
  window.location.hash = path;
}
