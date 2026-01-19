import { MenuApp } from "../../components/Menu.js";
export class RotasScreen {
  static base() {
    return (
      `
       <div class="homeContainer">
        <div class="left">
          ${MenuApp.base({ path: "/rotas" })}
        </div>
        <div class="right">
          <div class="content">
            <div class="rota-header">
              <h2>Gestão de Rotas</h2>
              <button type="button" id="novaRotaButton" class="rota-new-button">
                <i class="bi bi-plus-circle"></i>
                <span>Cadastrar Nova Rota</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    
      `
    )
  }
}