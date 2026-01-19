import { Header } from "../../components/Header.js";
import { MenuApp } from "../../components/Menu.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { RotasScreen } from "../../screens/rotas/Rotas.screen.js";
import { NavigationClass } from "../../utils/Navigation.js";

export class RotasPage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.token =
      sessionStorage.getItem("token") ?? localStorage.getItem("token");
    this.init();
  }

  async init() {
    ModalComponents.miniSpinner(this.mainContainer);
    this.renderLayout();
    const head = this.mainContainer.querySelector("#headerTop");
    if (head) {
      head.innerHTML = await Header.Home();
    }
    new NavigationClass(this.mainContainer);
    ModalComponents.closeMiniSpinner(this.mainContainer);
  }

  renderLayout() {
    this.mainContainer.innerHTML = RotasScreen.base();

  }

  functions(mainContainer) {
    const addButton  = mainContainer.querySelector("");
    if (addButton) {
        
    }
  }

}

