import { Header } from "../../components/Header.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { ViagensScreen } from "../../screens/viagens/Viagens.screen.js";
import { Tables } from "../../screens/tables/tables.js";
import { NavigationClass } from "../../utils/Navigation.js";
import { SearchableSelect } from "../../components/SearchableSelect.js";

export class ViagensPage {
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

    await this.loadViagens(false, mainContainer);

    ModalComponents.closeMiniSpinner(mainContainer);
  }

  renderLayout(mainContainer) {
    mainContainer.innerHTML = ViagensScreen.base();
  }

  //// Botoes do cabecalho e acoes gerais
  bindHeaderActions(mainContainer) {
    const newButton = mainContainer.querySelector("#novaViagemButton");
    if (newButton) {
      newButton.addEventListener("click", () => {
        this.startCreate(mainContainer);
      });
    }

    this.bindSearch(mainContainer);
  }

  async loadViagens(showSpinner = true, mainContainer) {
    if (showSpinner) ModalComponents.miniSpinner(mainContainer);

    const tableContainer = mainContainer.querySelector("#tableRoute");
    if (!tableContainer) {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
      return;
    }

    try {
      const response = await HTTPRequest.get("/viagens", null, this.token);

      const data = response.success ? response.data : (response.data || []);
      this.currentData = data;

      tableContainer.innerHTML = Tables.viagens({ data });

      this.bindTableActions(mainContainer);
      this.bindFormEvents(mainContainer);
      this.hideForm(mainContainer);

    } catch (error) {
      console.error("Erro ao carregar viagens:", error);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Não foi possível carregar as viagens.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      }
    } finally {
      if (showSpinner) ModalComponents.closeMiniSpinner(mainContainer);
    }
  }

  bindTableActions(mainContainer) {
    const tbody = mainContainer.querySelector("#viagensBody");
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
        this.deleteViagem(id, mainContainer);
      });
    });

    // Assentos buttons
    const assentosButtons = tbody.querySelectorAll(".btn-assentos");
    assentosButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.showAssentos(id, mainContainer);
      });
    });
  }

  bindFormEvents(mainContainer) {
    const form = mainContainer.querySelector("#viagemForm");
    if (!form) return;

    const cancelBtn = form.querySelector("#cancelarViagem");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.hideForm(mainContainer);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveViagem(mainContainer);
    });
  }


  //// Criar, Editar, Excluir vovas Viagens 
  startCreate(mainContainer) {
    this.clearForm(mainContainer);
    this.loadFormOptions(mainContainer);
    this.showForm(mainContainer);
  }

  async startEdit(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      const response = await HTTPRequest.get(`/viagens/${id}`, null, this.token);

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success && response.data) {
        await this.loadFormOptions(mainContainer);
        this.fillForm(response.data, mainContainer);
        this.showForm(mainContainer);
      } else {
        throw new Error("Dados não encontrados");
      }
    } catch (error) {
      ModalComponents.closeMiniSpinner(mainContainer);
      ModalComponents.popUpAlert({
        title: "Erro",
        message: "Erro ao buscar dados da viagem.",
        status: "error",
        mainContainer: mainContainer,
      });
      const closeBtn = mainContainer.querySelector("#closePopUpButton");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
      }
    }
  }

  async loadFormOptions(mainContainer) {
    try {
      const [rotasRes, veiculosRes, motoristasRes] = await Promise.all([
        HTTPRequest.get("/rotas", null, this.token),
        HTTPRequest.get("/veiculos", null, this.token),
        HTTPRequest.get("/motoristas", null, this.token)
      ]);

      const rotaSelect = mainContainer.querySelector("#rotaSelect");
      const veiculoSelect = mainContainer.querySelector("#veiculoSelect");
      const motoristaSelect = mainContainer.querySelector("#motoristaSelect");
      const motorista2Select = mainContainer.querySelector("#motorista2Select");

      if (rotaSelect && rotasRes.success) {
        rotaSelect.innerHTML = '<option value="">Selecione uma Rota</option>' +
          rotasRes.data.map(r => `<option value="${r.id}">${r.origem} - ${r.destino}</option>`).join('');
      }

      if (veiculoSelect && veiculosRes.success) {
        veiculoSelect.innerHTML = '<option value="">Selecione um Veículo</option>' +
          veiculosRes.data.map(v => `<option value="${v.id}">${v.modelo} (${v.matricula}) - ${v.capacidade} Lugares</option>`).join('');

        // Initialize SearchableSelect
        const options = veiculosRes.data.map(v => ({
          value: v.id,
          label: `${v.modelo} (${v.matricula}) - ${v.capacidade} Lugares`
        }));

        if (this.veiculoSelectInstance) {
          this.veiculoSelectInstance.setOptions(options);
        } else {
          this.veiculoSelectInstance = new SearchableSelect(veiculoSelect, options, {
            placeholder: 'Pesquisar Veículo...'
          });
        }
      }

      if (motoristaSelect && motoristasRes.success) {
        const options = '<option value="">Selecione um Motorista</option>' +
          motoristasRes.data.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
        motoristaSelect.innerHTML = options;
        if (motorista2Select) {
          motorista2Select.innerHTML = '<option value="">Nenhum</option>' +
            motoristasRes.data.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
        }
      }

    } catch (e) {
      console.error("Erro ao carregar opções", e);
    }
  }

  fillForm(data, mainContainer) {
    const form = mainContainer.querySelector("#viagemForm");
    if (!form) return;

    form.querySelector("#viagemId").value = data.id;
    form.querySelector("#rotaSelect").value = data.rota_id;
    // Update original select
    form.querySelector("#veiculoSelect").value = data.veiculo_id;
    // Update custom select if exists
    if (this.veiculoSelectInstance) {
      this.veiculoSelectInstance.selectValue(data.veiculo_id);
    }
    form.querySelector("#motoristaSelect").value = data.motorista_id;
    form.querySelector("#motorista2Select").value = data.motorista_2_id || "";

    if (data.data) {
      const dateObj = new Date(data.data);
      form.querySelector("#dataViagem").value = dateObj.toISOString().split('T')[0];
    }
    form.querySelector("#horaViagem").value = data.hora;
    form.querySelector("#precoViagem").value = data.preco;
  }

  clearForm(mainContainer) {
    const form = mainContainer.querySelector("#viagemForm");
    if (!form) return;

    form.reset();
    form.querySelector("#viagemId").value = "";
     if (this.veiculoSelectInstance) {
      this.veiculoSelectInstance.selectValue(""); // Reset custom select
    }
    this.clearErrors(mainContainer);
  }

  showForm(mainContainer) {
    const container = mainContainer.querySelector("#viagemFormContainer");
    const tableContainer = mainContainer.querySelector("#viagemTableContainer");

    if (container) {
      container.classList.remove("hidden");
      container.classList.add("visible");
    }
    if (tableContainer) {
      tableContainer.classList.add("blur");
    }
  }

  hideForm(mainContainer) {
    const container = mainContainer.querySelector("#viagemFormContainer");
    const tableContainer = mainContainer.querySelector("#viagemTableContainer");

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

  async saveViagem(mainContainer) {
    this.clearErrors(mainContainer);
    const form = mainContainer.querySelector("#viagemForm");

    const id = form.querySelector("#viagemId").value;
    const rota_id = form.querySelector("#rotaSelect").value;
    const veiculo_id = form.querySelector("#veiculoSelect").value;
    const motorista_id = form.querySelector("#motoristaSelect").value;
    const motorista_2_id = form.querySelector("#motorista2Select").value;
    const data = form.querySelector("#dataViagem").value;
    const hora = form.querySelector("#horaViagem").value;
    const preco = form.querySelector("#precoViagem").value;

    const status = 'agendada';

    // Validation
    let hasError = false;
    if (!rota_id) { alert("Rota é obrigatória"); hasError = true; }
    if (!veiculo_id) { alert("Veículo é obrigatório"); hasError = true; }
    if (!motorista_id) { alert("Motorista é obrigatório"); hasError = true; }
    if (!data) { alert("Data é obrigatória"); hasError = true; }
    if (!hora) { alert("Hora é obrigatória"); hasError = true; }
    if (!preco) { alert("Preço é obrigatório"); hasError = true; }

    if (hasError) return;

    const payload = {
      rota_id,
      veiculo_id,
      motorista_id,
      motorista_2_id: motorista_2_id || null,
      data,
      hora,
      preco,
      status
    };

    ModalComponents.miniSpinner(mainContainer);

    try {
      let response;
      if (id) {
        response = await HTTPRequest.put({
          uri: `/viagens/${id}`,
          body: payload,
          token: this.token,
        });
      } else {
        response = await HTTPRequest.post({
          uri: "/viagens",
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
        await this.loadViagens(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao salvar viagem.",
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

  deleteViagem(id, mainContainer) {
    ModalComponents.popUpAlert({
      title: "Confirmação",
      message: "Tem certeza que deseja excluir esta viagem?",
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
        uri: `/viagens/${id}`,
        token: this.token,
      });

      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success) {
        ModalComponents.popUpAlert({
          title: "Sucesso",
          message: "Viagem excluída com sucesso.",
          status: "success",
          mainContainer: mainContainer,
        });
        const closeBtn = mainContainer.querySelector("#closePopUpButton");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => ModalComponents.closePopUp(mainContainer));
        }

        await this.loadViagens(true, mainContainer);
      } else {
        ModalComponents.popUpAlert({
          title: "Erro",
          message: response.message || "Erro ao excluir viagem.",
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
          const filtered = allData.filter((item) => {
            const searchStr = `${item.rota_origem} ${item.rota_destino} ${item.veiculo_modelo} ${item.veiculo_matricula} ${item.motorista_nome}`.toLowerCase();
            return searchStr.includes(text);
          });

          const tableContainer = mainContainer.querySelector("#tableRoute");
          if (tableContainer) {
            tableContainer.innerHTML = Tables.viagens({ data: filtered });
            this.bindTableActions(mainContainer);
            this.bindFormEvents(mainContainer);
            this.hideForm(mainContainer);
          }
        } else {
          const tableContainer = mainContainer.querySelector("#tableRoute");
          if (tableContainer) {
            tableContainer.innerHTML = Tables.viagens({ data: allData });
            this.bindTableActions(mainContainer);
            this.bindFormEvents(mainContainer);
            this.hideForm(mainContainer);
          }
        }
      });
    }
  }

  async showAssentos(id, mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    try {
      const response = await HTTPRequest.get(`/viagens/${id}`, null, this.token);
      ModalComponents.closeMiniSpinner(mainContainer);

      if (response.success && response.data) {
        const viagem = response.data;
        this.renderAssentosModal(viagem, mainContainer);
      }
    } catch (e) {
      ModalComponents.closeMiniSpinner(mainContainer);
      console.error(e);
    }
  }

  renderAssentosModal(viagem, mainContainer) {
    const modal = mainContainer.querySelector("#assentosModal");
    const grid = mainContainer.querySelector("#assentosGrid");
    const closeBtn = mainContainer.querySelector("#closeAssentosModal");

    if (!modal || !grid) return;

    let assentos = viagem.assentos;
    if (typeof assentos === 'string') {
      try { assentos = JSON.parse(assentos); } catch (e) { assentos = []; }
    }

    grid.innerHTML = '';
    assentos.forEach(seat => {
      const el = document.createElement('div');
      el.className = `seat-item ${seat.status}`;

      // Icon selection based on status
      let iconClass = 'bi-person'; // Default
      if (seat.status === 'ocupado') iconClass = 'bi-person-fill';
      if (seat.status === 'pendente') iconClass = 'bi-person-bounding-box';

      el.innerHTML = `
            <i class="bi ${iconClass} seat-icon"></i>
            <span class="seat-number">Assento ${seat.numero}</span>
            <span class="seat-status-text">${seat.status}</span>
          `;

      el.addEventListener('click', () => {
        this.toggleSeatStatus(viagem.id, seat, mainContainer);
      });

      grid.appendChild(el);
    });

    modal.classList.remove("hidden");
    modal.classList.add("visible");

    closeBtn.onclick = () => {
      modal.classList.remove("visible");
      modal.classList.add("hidden");
    };
  }

  async toggleSeatStatus(viagemId, seat, mainContainer) {
    let newStatus = 'livre';
    if (seat.status === 'livre') newStatus = 'pendente';
    else if (seat.status === 'pendente') newStatus = 'ocupado';
    else newStatus = 'livre';

    try {
      const response = await HTTPRequest.put({
        uri: `/viagens/${viagemId}/assentos`,
        body: { numero: seat.numero, status: newStatus },
        token: this.token
      });

      if (response.success) {
        this.showAssentos(viagemId, mainContainer);
      } else {
        alert("Erro ao atualizar assento: " + response.message);
      }
    } catch (e) {
      console.error(e);
      alert("Erro de conexão");
    }
  }
}
