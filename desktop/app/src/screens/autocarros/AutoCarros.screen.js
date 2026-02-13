import { MenuApp } from "../../components/Menu.js";

export class AutoCarrosScreen {
  static base() {
    return (
      `
       <div class="homeContainer">
        <div class="left">
          ${MenuApp.base({ path: "/autocarros" })}
        </div>
        <div class="right">
          <div class="content">
            <div class="rota-header">
              <h2>Gestão de Autocarros</h2>
              <button type="button" id="novoAutoCarroButton" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i>
                <span>Cadastrar Novo Autocarro</span>
              </button>
            </div>
          </div>
          <div id="formAdd"></div>
            <div class="inputBox" id="searchBox">
              <label for="search">
              <i class="bi bi-search"></i>
              </label>
              <input type="search" placeholder="Buscar autocarro..." name="search" id="search">
            </div> 
          <div id="tableAutoCarros"></div>
        </div>
      </div>
      `
    )
  }
}
