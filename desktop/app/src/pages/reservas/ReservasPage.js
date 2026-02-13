import { Header } from "../../components/Header.js";
import { MenuApp } from "../../components/Menu.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HomeScreen } from "../../screens/home/Home.screen.js";
import { NavigationClass } from "../../utils/Navigation.js";
import { HTTPRequest } from "../../hooks/http.js";
import { Tables } from "../../screens/tables/tables.js";

export class ReservasPage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.token = sessionStorage.getItem("token") ?? localStorage.getItem("token");
    this.render();
  }

  async render() {
    ModalComponents.miniSpinner(this.mainContainer);

    this.mainContainer.innerHTML = HomeScreen.base({
      left: MenuApp.base({ path: "/reservas" })
    });

    const head = this.mainContainer.querySelector("#headerTop");
    if (head) { head.innerHTML = await Header.Home(); }

    // Load data
    await this.loadReservas();

    new NavigationClass(this.mainContainer);
    ModalComponents.closeMiniSpinner(this.mainContainer);
  }

  async loadReservas() {
    const container = this.mainContainer.querySelector("#dashboardLists");
    if (!container) return;

    try {
      const response = await HTTPRequest.get("/reservas/all", null, this.token);
      const data = response.success ? response.data : [];

      // Use the new Tables.reservas method
      container.innerHTML = `
            <div style="padding: 20px;">
                <div class="rota-header" style="margin: 0 0 20px 0;">
                    <h2>Gestão de Reservas</h2>
                </div>
                ${Tables.reservas({ data })}
            </div>
          `;

      this.bindActions();

    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
      container.innerHTML = '<p style="padding: 20px; color: var(--error);">Erro ao carregar reservas.</p>';
    }
  }

  bindActions() {
    const tbody = this.mainContainer.querySelector("#reservasBody");
    if (!tbody) return;

    const deleteButtons = tbody.querySelectorAll(".btn-delete");
    deleteButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.cancelReserva(id);
      });
    });
  }

  cancelReserva(id) {
    ModalComponents.popUpAlert({
      title: "Confirmar Cancelamento",
      message: "Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.",
      status: "warning",
      mainContainer: this.mainContainer,
      showCancelButton: true
    });

    const confirmBtn = this.mainContainer.querySelector("#confirmPopUpButton");
    const cancelBtn = this.mainContainer.querySelector("#cancelPopUpButton");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => ModalComponents.closePopUp(this.mainContainer));
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", async () => {
        ModalComponents.closePopUp(this.mainContainer);
        ModalComponents.miniSpinner(this.mainContainer);

        try {
          const response = await HTTPRequest.delete({
            uri: `/reservas/${id}`,
            token: this.token
          });

          ModalComponents.closeMiniSpinner(this.mainContainer);

          if (response.success) {
            ModalComponents.popUpAlert({
              title: "Sucesso",
              message: "Reserva cancelada com sucesso.",
              status: "success",
              mainContainer: this.mainContainer
            });
            setTimeout(() => {
              ModalComponents.closePopUp(this.mainContainer);
              this.loadReservas();
            }, 1500);
          } else {
            ModalComponents.popUpAlert({
              title: "Erro",
              message: response.message || "Erro ao cancelar reserva.",
              status: "error",
              mainContainer: this.mainContainer
            });
            this.bindCloseAlert();
          }
        } catch (error) {
          ModalComponents.closeMiniSpinner(this.mainContainer);
          ModalComponents.popUpAlert({
            title: "Erro",
            message: "Erro de conexão ao cancelar reserva.",
            status: "error",
            mainContainer: this.mainContainer
          });
          this.bindCloseAlert();
        }
      });
    }
  }

  bindCloseAlert() {
    const closeBtn = this.mainContainer.querySelector("#closePopUpButton");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => ModalComponents.closePopUp(this.mainContainer));
    }
  }
}