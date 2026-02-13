import { Header } from "../../components/Header.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { AutoCarrosScreen } from "../../screens/autocarros/AutoCarros.screen.js";
import { Tables } from "../../screens/tables/tables.js";
import { NavigationClass } from "../../utils/Navigation.js";

export class AutoCarrosPage {
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

    await this.loadAutoCarros(false, mainContainer);

    ModalComponents.closeMiniSpinner(mainContainer);
  }

  renderLayout(mainContainer) {
    mainContainer.innerHTML = AutoCarrosScreen.base();
  }

  bindHeaderActions(mainContainer) {
    const newButton = mainContainer.querySelector("#novoAutoCarroButton");
    if (newButton) {
      newButton.addEventListener("click", () => {
        this.startCreate(mainContainer);
      });
    }

    this.bindSearch(mainContainer);
  }

  async loadAutoCarros(showSpinner = true, mainContainer) {
    if (showSpinner) ModalComponents.miniSpinner(mainContainer);

    const tableContainer = mainContainer.querySelector("#tableAutoCarros");
    if (!tableContainer) {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
      return;
    }

    try {
      const response = await HTTPRequest.get("/veiculos", null, this.token);

      const data = response.success ? response.data : (Array.isArray(response) ? response : []);

      // Store data for search
      this.currentData = data;

      tableContainer.innerHTML = Tables.autocarros({ data });

      this.bindTableActions(mainContainer);
      this.bindFormEvents(mainContainer);
      this.hideForm(mainContainer);

    } catch (error) {
      console.error("Erro ao carregar autocarros:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Não foi possível carregar os autocarros.",
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
    const tbody = mainContainer.querySelector("#autocarrosBody");
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
        this.confirmDelete(id, mainContainer);
      });
    });
  }

  bindFormEvents(mainContainer) {
    const form = mainContainer.querySelector("#autocarroForm");
    const cancelBtn = mainContainer.querySelector("#cancelarAutoCarro");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveAutoCarro(mainContainer);
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.hideForm(mainContainer);
      });
    }
  }

  showForm(mainContainer) {
    const container = mainContainer.querySelector("#autocarroFormContainer");
    const tableContainer = mainContainer.querySelector("#autocarroTableContainer");

    // Match Rotas/Motoristas UX pattern
    if (container) {
      container.classList.remove("hidden");
      container.classList.add("visible");
    }
    if (tableContainer) {
      tableContainer.classList.add("blur");
    }
  }

  hideForm(mainContainer) {
    const container = mainContainer.querySelector("#autocarroFormContainer");
    const tableContainer = mainContainer.querySelector("#autocarroTableContainer");
    const form = mainContainer.querySelector("#autocarroForm");

    if (container) {
      container.classList.remove("visible");
      container.classList.add("hidden");
    }
    if (tableContainer) {
      tableContainer.classList.remove("blur");
    }

    if (form) form.reset();

    // Reset hidden id
    const idInput = mainContainer.querySelector("#autocarroId");
    if (idInput) idInput.value = "";

    this.clearErrors(mainContainer);
  }

  clearErrors(mainContainer) {
    const errors = mainContainer.querySelectorAll(".error-message");
    errors.forEach((el) => (el.textContent = ""));
  }

  startCreate(mainContainer) {
    this.showForm(mainContainer);
    const form = mainContainer.querySelector("#autocarroForm");
    if (form) form.reset();
  }

  async startEdit(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      // Use get with null params but with token
      const response = await HTTPRequest.get(`/veiculos/${id}`, null, this.token);
      const data = response.success ? response.data : response;

      if (data) {
        this.showForm(mainContainer);

        const idInput = mainContainer.querySelector("#autocarroId");
        const modeloInput = mainContainer.querySelector("#modelo");
        const matriculaInput = mainContainer.querySelector("#matricula");
        const capacidadeInput = mainContainer.querySelector("#capacidade");
        const statusInput = mainContainer.querySelector("#status");

        if (idInput) idInput.value = data.id;
        if (modeloInput) modeloInput.value = data.modelo || "";
        if (matriculaInput) matriculaInput.value = data.matricula || "";
        if (capacidadeInput) capacidadeInput.value = data.capacidade || "";
        if (statusInput) statusInput.value = data.ativo ? "ativo" : "inativa";
      }
    } catch (error) {
      console.error("Erro ao buscar autocarro:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Erro ao carregar dados do autocarro.",
        status: "error",
        mainContainer: mainContainer
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
    } finally {
      ModalComponents.closeMiniSpinner(mainContainer);
    }
  }

  async saveAutoCarro(mainContainer) {
    const idInput = mainContainer.querySelector("#autocarroId");
    const modeloInput = mainContainer.querySelector("#modelo");
    const matriculaInput = mainContainer.querySelector("#matricula");
    const capacidadeInput = mainContainer.querySelector("#capacidade");
    const statusInput = mainContainer.querySelector("#status");

    const id = idInput ? idInput.value : null;
    const data = {
      modelo: modeloInput.value,
      matricula: matriculaInput.value,
      capacidade: capacidadeInput.value,
      ativo: statusInput.value === "ativo"
    };

    if (!data.modelo || !data.matricula || !data.capacidade) {
      ModalComponents.popUpAlert({
        title: "Atenção",
        message: "Preencha todos os campos obrigatórios.",
        status: "warning",
        mainContainer: mainContainer
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      return;
    }

    ModalComponents.miniSpinner(mainContainer);

    try {
      let response;
      if (id) {
        // Fix: Pass object to put
        response = await HTTPRequest.put({
          uri: `/veiculos/${id}`,
          body: data,
          token: this.token
        });
      } else {
        // Fix: Pass object to post
        response = await HTTPRequest.post({
          uri: "/veiculos",
          body: data,
          token: this.token
        });
      }

      if (response.success || response.id) {
        await this.loadAutoCarros(false, mainContainer);
        this.hideForm(mainContainer);

        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: id ? "Autocarro atualizado com sucesso!" : "Autocarro cadastrado com sucesso!",
          status: "success",
          mainContainer: mainContainer
        });
      } else {
        throw new Error(response.message || "Erro ao salvar");
      }
    } catch (error) {
      console.error("Erro ao salvar autocarro:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: error.message || "Não foi possível salvar o autocarro.",
        status: "error",
        mainContainer: mainContainer
      });
    } finally {
      ModalComponents.closeMiniSpinner(mainContainer);
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
    }
  }

  confirmDelete(id, mainContainer) {
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
        this.deleteAutoCarro(id, mainContainer);
      });
    }
  }

  async deleteAutoCarro(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      // Fix: Pass object to delete
      const response = await HTTPRequest.delete({
        uri: `/veiculos/${id}`,
        token: this.token
      });

      if (response.success) {
        await this.loadAutoCarros(false, mainContainer);
        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: "Autocarro removido com sucesso!",
          status: "success",
          mainContainer: mainContainer
        });
      } else {
        throw new Error(response.message || "Erro ao deletar");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Não foi possível remover o autocarro.",
        status: "error",
        mainContainer: mainContainer
      });
    } finally {
      ModalComponents.closeMiniSpinner(mainContainer);
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
    }
  }

  bindSearch(mainContainer) {
    const searchInput = mainContainer.querySelector("#search");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      if (!this.currentData) return;

      const filtered = this.currentData.filter(item =>
        (item.modelo && item.modelo.toLowerCase().includes(term)) ||
        (item.matricula && item.matricula.toLowerCase().includes(term))
      );

      const tableContainer = mainContainer.querySelector("#tableAutoCarros");
      if (tableContainer) {
        tableContainer.innerHTML = Tables.autocarros({ data: filtered });
        this.bindTableActions(mainContainer);
      }
    });
  }
}
