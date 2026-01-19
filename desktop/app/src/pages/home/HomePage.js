import { Header } from "../../components/Header.js";
import { MenuApp } from "../../components/Menu.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HomeScreen } from "../../screens/home/Home.screen.js";
import { NavigationClass } from "../../utils/Navigation.js";

export class HomePage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.Home(this.mainContainer);
  }


  async Home(mainContainer) {
    // ModalComponents.miniSpinner(mainContainer);

    setTimeout(() => {
      this.HomeComponents(mainContainer)
      ModalComponents.closeMiniSpinner(mainContainer);
    }, 2000)
  }

  async HomeComponents(mainContainer) {
    mainContainer.innerHTML = HomeScreen.base({ left: MenuApp.base({ path: "/dashboard" }) })
    const head = mainContainer.querySelector("#headerTop");
    const analytics = mainContainer.querySelector("#analytics");
    if (head) { head.innerHTML = await Header.Home(); }
    if (analytics) { analytics.innerHTML = await Header.analytics(); }
    new NavigationClass(mainContainer);
  }
}
