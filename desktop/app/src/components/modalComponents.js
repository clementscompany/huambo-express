export class ModalComponents {
  static miniSpinner(maincontainer) {

    const currentLoadder = maincontainer.querySelector(".miniSpinner");
    if (currentLoadder) {
      currentLoadder.remove();
    }

    const spinner = document.createElement("div");
    spinner.className = "miniSpinner";
    spinner.innerHTML = `
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `;
    maincontainer.appendChild(spinner);
  }


  static closeMiniSpinner(maincontainer) {
    const currentLoadder = maincontainer.querySelector(".miniSpinner");
    if (currentLoadder) {
      currentLoadder.remove();
    }
  }

  static popUpAlert({ title, message, status, mainContainer, closePopUpButton }) {

    const currentCard = mainContainer.querySelector(".popUpModal");
    if (currentCard) {
      currentCard.remove();
    }

    const container = document.createElement("div");
    container.className = "popUpModal"
    container.innerHTML = `
      <div class="contentPopUp">
          <div class="topCcontent ${status}">
            <i class="bi bi-check-circle"></i>
          <h4>${title ?? "Sucesso"}</h4>
          <p>${message}</p>
        </div>

      <button class="closeButton">ok</button>
      </div>
    `

    mainContainer.appendChild(container);
  }

  static closePopUp(maincontainer) {
    const currentCard = maincontainer.querySelector(".popUpModal");
    if (currentCard) {
      currentCard.remove();
    }
  }
}