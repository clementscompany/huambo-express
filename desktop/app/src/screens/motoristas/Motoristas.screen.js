import { MenuApp } from "../../components/Menu.js";

export class MotoristasScreen {
  static base() {
    return (
      `
       <div class="homeContainer">
        <div class="left">
          ${MenuApp.base({ path: "/motoristas" })}
        </div>
        <div class="right">
          <div id="headerTop"></div>
          <div class="content">
            <div class="rota-header">
              <h2>Gestão de Motoristas</h2>
              <button type="button" id="novoMotoristaButton" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i>
                <span>Cadastrar Novo Motorista</span>
              </button>
            </div>
            <div id="tableMotoristas"></div>
          </div>
        </div>
      </div>
      `
    )
  }
}
