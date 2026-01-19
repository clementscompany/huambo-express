import { Navigate } from "../Routes.js";

export class NavigationClass {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.menuNavigation(this.mainContainer);
  }


  menuNavigation(mainContainer) {
    const lisItems = mainContainer.querySelectorAll("#list_menu > li");
    if (lisItems) {
      lisItems.forEach(li => {
        li.addEventListener("click", (e) => {
          const currentPath = li.getAttribute("route-path");
          if (currentPath) {
            Navigate(currentPath);
          }
        })
      });
    }

  }
}
