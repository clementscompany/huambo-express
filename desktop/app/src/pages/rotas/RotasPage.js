import { Header } from "../../components/Header.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { RotasScreen } from "../../screens/rotas/Rotas.screen.js";
import { Tables } from "../../screens/tables/tables.js";
import { NavigationClass } from "../../utils/Navigation.js";

export class RotasPage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.token =
      sessionStorage.getItem("token") ?? localStorage.getItem("token");
    this.init(this.mainContainer);
  }

  async init(mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    this.renderLayout(mainContainer);
    const head = mainContainer.querySelector("#headerTop");
    if (head) {
      head.innerHTML = await Header.Home();
    }
    new NavigationClass(mainContainer);
    this.bindHeaderActions(mainContainer);

    await this.loadRotas(false, mainContainer);

    ModalComponents.closeMiniSpinner(mainContainer);
  }

  renderLayout(mainContainer) {
    mainContainer.innerHTML = RotasScreen.base();
  }

  bindHeaderActions(mainContainer) {
    const newButton = mainContainer.querySelector("#novaRotaButton");
    if (newButton) {
      newButton.addEventListener("click", () => {
        this.startCreate(mainContainer);
      });
    }

    this.bindSearch(mainContainer);
  }

  async loadRotas(showSpinner = true, mainContainer) {
    if (showSpinner) ModalComponents.miniSpinner(mainContainer);

    const tableContainer = mainContainer.querySelector("#tableRoute");
    if (!tableContainer) {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
      return;
    }

    try {
      const response = await HTTPRequest.get("/rotas");

      const data = response.success ? response.data : (response.data || []);

      // Store data for search
      this.currentData = data;

      tableContainer.innerHTML = Tables.routes({ data });

      this.bindTableActions(mainContainer);
      this.bindFormEvents(mainContainer);
      this.hideForm(mainContainer);

    } catch (error) {
      console.error("Erro ao carregar rotas:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Não foi possível carregar as rotas.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          ModalComponents.closePopUp(mainContainer)
        });
      }
    } finally {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
    }
  }

  bindTableActions(mainContainer) {
    const tbody = mainContainer.querySelector("#rotasBody");
    if (!tbody) return;

    // Edit buttons
    const editButtons = tbody.querySelectorAll(".btn-edit");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.startEdit(id, mainContainer);
      });
    });

    // Delete buttons
    const deleteButtons = tbody.querySelectorAll(".btn-delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.deleteRota(id, mainContainer);
      });
    });
  }

  bindFormEvents(mainContainer) {
    const form = mainContainer.querySelector("#rotaForm");
    if (!form) return;

    const cancelBtn = form.querySelector("#cancelarRota");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.hideForm(mainContainer);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveRota(mainContainer);
    });
  }

  startCreate(mainContainer) {
    this.clearForm(mainContainer);
    this.showForm(mainContainer);
  }

  async startEdit(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      const response = await HTTPRequest.get(`/rotas`, id, this.token); // The API seems to use query param or just /rotas with filter, but original code used get("/rotas", id, token). 
      // Wait, HTTPRequest.get signature is (uri, id, token).

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success && response.data) {
        this.fillForm(response.data, mainContainer);
        this.showForm(mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: "Erro ao buscar dados da rota.",
          status: "error",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }
      }
    } catch (error) {
      ModalComponents.closeMiniSpinner(mainContainer);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Erro de conexão.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      }
    }
  }

  fillForm(data, mainContainer) {
    const form = mainContainer.querySelector("#rotaForm");
    if (!form) return;

    form.querySelector("#rotaId").value = data.id;
    form.querySelector("#origem").value = data.origem || "";
    form.querySelector("#destino").value = data.destino || "";
    form.querySelector("#distancia_km").value = data.distancia_km || "";
    form.querySelector("#duracao_minutos").value = data.duracao_minutos || "";
    form.querySelector("#status").value = data.status || "ativa";
  }

  clearForm(mainContainer) {
    const form = mainContainer.querySelector("#rotaForm");
    if (!form) return;

    form.reset();
    form.querySelector("#rotaId").value = "";
    this.clearErrors(mainContainer);
  }

  showForm(mainContainer) {
    const container = mainContainer.querySelector("#rotaFormContainer");
    const tableContainer = mainContainer.querySelector("#rotaTableContainer");

    if (container) {
      container.classList.remove("hidden");
      container.classList.add("visible");
    }
    if (tableContainer) {
      tableContainer.classList.add("blur");
    }
  }

  hideForm(mainContainer) {
    const container = mainContainer.querySelector("#rotaFormContainer");
    const tableContainer = mainContainer.querySelector("#rotaTableContainer");

    if (container) {
      container.classList.remove("visible");
      container.classList.add("hidden");
    }
    if (tableContainer) {
      tableContainer.classList.remove("blur");
    }
    this.clearForm(mainContainer);
  }

  clearErrors(mainContainer) {
    const errors = mainContainer.querySelectorAll(".error-message");
    errors.forEach((el) => (el.textContent = ""));
  }

  setFieldError(fieldId, message, mainContainer) {
    const errorEl = mainContainer.querySelector(`#${fieldId}Error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  async saveRota(mainContainer) {
    this.clearErrors(mainContainer);
    const form = mainContainer.querySelector("#rotaForm");

    const id = form.querySelector("#rotaId").value;
    const origem = form.querySelector("#origem").value.trim();
    const destino = form.querySelector("#destino").value.trim();
    const distancia_km = form.querySelector("#distancia_km").value;
    const duracao_minutos = form.querySelector("#duracao_minutos").value;
    const status = form.querySelector("#status").value;

    // Validation
    let hasError = false;
    if (!origem) {
      this.setFieldError("origem", "Origem é obrigatória", mainContainer);
      hasError = true;
    }
    if (!destino) {
      this.setFieldError("destino", "Destino é obrigatório", mainContainer);
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      origem,
      destino,
      distancia_km,
      duracao_minutos,
      status
    };

    ModalComponents.miniSpinner(mainContainer);

    try {
      let response;
      if (id) {
        response = await HTTPRequest.put({
          uri: `/rotas/${id}`,
          body: payload,
          token: this.token,
        });
      } else {
        response = await HTTPRequest.post({
          uri: "/rotas",
          body: payload,
          token: this.token,
        });
      }

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success) {
        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: response.message,
          status: "success",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }

        this.hideForm(mainContainer);
        await this.loadRotas(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao salvar rota.",
          status: "error",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }
      }
    } catch (error) {
      ModalComponents.closeMiniSpinner(mainContainer);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Erro inesperado ao salvar.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      }
    }
  }

  deleteRota(id, mainContainer) {
    ModalComponents.popUpAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir esta rota?",
      status: "warning",
      mainContainer: mainContainer,
      showCancelButton: true,
    });
    const closePopUpButton = mainContainer.querySelector("#cancelPopUpButton");
    const confirmPopUpButton = mainContainer.querySelector("#confirmPopUpButton");
    if (closePopUpButton) {
      closePopUpButton.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
    }
    if (confirmPopUpButton) {
      confirmPopUpButton.addEventListener("click", () => {
        ModalComponents.closePopUp(mainContainer);
        this.performDelete(id, mainContainer);
      });
    }
  }

  async performDelete(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      const response = await HTTPRequest.delete({
        uri: `/rotas/${id}`,
        token: this.token,
      });

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success) {
        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: "Rota excluída com sucesso.",
          status: "success",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }

        await this.loadRotas(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao excluir rota.",
          status: "error",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }
      }
    } catch (error) {
      ModalComponents.closeMiniSpinner(mainContainer);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Erro inesperado ao excluir.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      }
    }
  }

  bindSearch(mainContainer) {
    const searchInput = mainContainer.querySelector("#search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const text = e.target.value.toLowerCase();
        const allData = this.currentData || [];

        if (text.length > 0) {
          const filtered = allData.filter((item) =>
            (item.origem && item.origem.toLowerCase().includes(text)) ||
            (item.destino && item.destino.toLowerCase().includes(text))
          );

          const tableContainer = mainContainer.querySelector("#tableRoute");
          if (tableContainer) {
            tableContainer.innerHTML = Tables.routes({ data: filtered });
            this.bindTableActions(mainContainer);
            this.bindFormEvents(mainContainer); // Re-bind form events just in case (though form is outside table container? No, it's inside Tables.routes)
            // Wait, Tables.routes renders BOTH form and table.
            // If I re-render Tables.routes, I replace the form too.
            // So I MUST re-bind form events and HIDE the form again.
            this.hideForm(mainContainer);
          }
        } else {
          // Restore full list
          const tableContainer = mainContainer.querySelector("#tableRoute");
          if (tableContainer) {
            tableContainer.innerHTML = Tables.routes({ data: allData });
            this.bindTableActions(mainContainer);
            this.bindFormEvents(mainContainer);
            this.hideForm(mainContainer);
          }
        }
      });
    }
  }
}
