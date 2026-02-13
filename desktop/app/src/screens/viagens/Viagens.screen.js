import { MenuApp } from "../../components/Menu.js";
export class ViagensScreen {
  static base() {
    return (
      `
       <div class="homeContainer">
        <div class="left">
          ${MenuApp.base({ path: "/viagens" })}
        </div>
        <div class="right">
          <div class="content">
            <div class="rota-header">
              <h2>Gestão de Viagens</h2>
              <button type="button" id="novaViagemButton" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i>
                <span>Cadastrar Nova Viagem</span>
              </button>
            </div>
          </div>
          <div id="formAdd"></div>
            <div class="inputBox" id="searchBox">
              <label for="search">
              <i class="bi bi-search"></i>
              </label>
              <input type="search" placeholder="Buscar viagem..." name="search" id="search">
            </div> 
          <div id="tableRoute"></div>
        </div>
      </div>
    
      `
    )
  }
}
