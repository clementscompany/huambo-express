import { Header } from "../../components/Header.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { MotoristasScreen } from "../../screens/motoristas/Motoristas.screen.js";
import { Tables } from "../../screens/tables/tables.js";
import { NavigationClass } from "../../utils/Navigation.js";

export class MotoristasPage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.token =
      sessionStorage.getItem("token") ?? localStorage.getItem("token");
    this.init(this.mainContainer);
  }


  /// inicializar a pagina 
  async init(mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    this.renderLayout(mainContainer);
    const head = mainContainer.querySelector("#headerTop");
    if (head) {
      head.innerHTML = await Header.Home();
    }
    new NavigationClass(mainContainer);
    this.bindHeaderActions(mainContainer);

    // Load data without creating a new spinner (init already has one)
    await this.loadMotoristas(false, mainContainer);

    ModalComponents.closeMiniSpinner(mainContainer);
  }

  renderLayout(mainContainer) {
    mainContainer.innerHTML = MotoristasScreen.base();
  }

  bindHeaderActions(mainContainer) {
    const newButton = mainContainer.querySelector("#novoMotoristaButton");
    if (newButton) {
      newButton.addEventListener("click", () => {
        this.startCreate(mainContainer);
      });
    }
  }

  async loadMotoristas(showSpinner = true, mainContainer) {
    if (showSpinner) ModalComponents.miniSpinner(mainContainer);

    const tableContainer = mainContainer.querySelector("#tableMotoristas");
    if (!tableContainer) {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
      return;
    }

    try {
      const response = await HTTPRequest.get("/motoristas", null, this.token);

      // Handle potential API errors or empty response
      const data = response.success ? response.data : [];

      tableContainer.innerHTML = Tables.motoristas({ data });

      this.bindTableActions(mainContainer);
      this.bindFormEvents(mainContainer);

      // Ensure form is hidden initially
      this.hideForm(mainContainer);

    } catch (error) {
      console.error("Erro ao carregar motoristas:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Não foi possível carregar os motoristas.",
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
    const tbody = mainContainer.querySelector("#motoristasBody");
    if (!tbody) return;

    // Edit buttons
    const editButtons = tbody.querySelectorAll(".btn-edit");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const row = btn.closest("tr");
        // Get data from row cells
        const cells = row.querySelectorAll("td");
        this.startEdit(id, mainContainer);
      });
    });

    // Delete buttons
    const deleteButtons = tbody.querySelectorAll(".btn-delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.deleteMotorista(id, mainContainer);
      });
    });
  }

  bindFormEvents(mainContainer) {
    const form = mainContainer.querySelector("#motoristaForm");
    if (!form) return;

    const cancelBtn = form.querySelector("#cancelarMotorista");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.hideForm(mainContainer);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveMotorista(mainContainer);
    });
  }

  startCreate(mainContainer) {
    this.clearForm(mainContainer);
    this.showForm(mainContainer);
  }

  async startEdit(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      const response = await HTTPRequest.get(`/motoristas/${id}`, null, this.token);
      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success && response.data) {
        this.fillForm(response.data, mainContainer);
        this.showForm(mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: "Erro ao buscar dados do motorista.",
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
    const form = mainContainer.querySelector("#motoristaForm");
    if (!form) return;

    form.querySelector("#motoristaId").value = data.id;
    form.querySelector("#nome").value = data.nome || "";
    form.querySelector("#email").value = data.email || "";
    form.querySelector("#telefone").value = data.telefone || "";
    form.querySelector("#genero").value = data.genero || "";
    form.querySelector("#numero_carta").value = data.numero_carta || "";
    form.querySelector("#bilhete_identidade").value = data.bilhete_identidade || "";
    form.querySelector("#telefone_contato").value = data.telefone_contato || "";
  }

  clearForm(mainContainer) {
    const form = mainContainer.querySelector("#motoristaForm");
    if (!form) return;

    form.reset();
    form.querySelector("#motoristaId").value = "";
    this.clearErrors(mainContainer);
  }

  showForm(mainContainer) {
    const container = mainContainer.querySelector("#motoristaFormContainer");
    const tableContainer = mainContainer.querySelector("#motoristaTableContainer");

    if (container) {
      container.classList.remove("hidden");
      container.classList.add("visible");
    }
    if (tableContainer) {
      tableContainer.classList.add("blur");
    }
  }

  hideForm(mainContainer) {
    const container = mainContainer.querySelector("#motoristaFormContainer");
    const tableContainer = mainContainer.querySelector("#motoristaTableContainer");

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

  async saveMotorista(mainContainer) {
    this.clearErrors(mainContainer);
    const form = mainContainer.querySelector("#motoristaForm");

    const id = form.querySelector("#motoristaId").value;
    const nome = form.querySelector("#nome").value.trim();
    const email = form.querySelector("#email").value.trim();
    const telefone = form.querySelector("#telefone").value.trim();
    const genero = form.querySelector("#genero").value;
    const numero_carta = form.querySelector("#numero_carta").value.trim();
    const bilhete_identidade = form.querySelector("#bilhete_identidade").value.trim();
    const telefone_contato = form.querySelector("#telefone_contato").value.trim();

    // Validation
    let hasError = false;
    if (!nome) {
      this.setFieldError("nome", "Nome é obrigatório", mainContainer);
      hasError = true;
    }
    if (!telefone) {
      this.setFieldError("telefone", "Telefone é obrigatório", mainContainer);
      hasError = true;
    }
    if (!genero) {
      this.setFieldError("genero", "Gênero é obrigatório", mainContainer);
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      nome,
      email,
      telefone,
      genero,
      numero_carta,
      bilhete_identidade,
      telefone_contato
    };

    ModalComponents.miniSpinner(mainContainer);

    try {
      let response;
      if (id) {
        response = await HTTPRequest.put({
          uri: `/motoristas/${id}`,
          body: payload,
          token: this.token,
        });
      } else {
        response = await HTTPRequest.post({
          uri: "/motoristas",
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
        await this.loadMotoristas(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao salvar motorista.",
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

  deleteMotorista(id, mainContainer) {
    ModalComponents.popUpAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir este motorista?",
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
        uri: `/motoristas/${id}`,
        token: this.token,
      });

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success) {
        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: "Motorista excluído com sucesso.",
          status: "success",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }

        await this.loadMotoristas(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao excluir motorista.",
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
}
