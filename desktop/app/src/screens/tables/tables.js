class Tables {
  static routes() {
    return `
      <div class="rota-body">
        <div class="rota-form-container hidden" id="rotaFormContainer">
          <form id="rotaForm" class="rota-form">
            <input type="hidden" id="rotaId">
            <div class="form-row">
              <div class="form-group">
                <label for="origem">
                  <i class="bi bi-geo-alt"></i>
                  <span>Origem</span>
                </label>
                <input id="origem" type="text" placeholder="Cidade de origem">
                <span class="error-message" id="origemError"></span>
              </div>
              <div class="form-group">
                <label for="destino">
                  <i class="bi bi-flag"></i>
                  <span>Destino</span>
                </label>
                <input id="destino" type="text" placeholder="Cidade de destino">
                <span class="error-message" id="destinoError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="distancia">
                  <i class="bi bi-signpost"></i>
                  <span>Distância (km)</span>
                </label>
                <input id="distancia" type="number" step="0.01" min="0" placeholder="Opcional">
                <span class="error-message" id="distanciaError"></span>
              </div>
              <div class="form-group">
                <label for="duracao">
                  <i class="bi bi-clock-history"></i>
                  <span>Duração estimada (min)</span>
                </label>
                <input id="duracao" type="number" step="1" min="0" placeholder="Opcional">
                <span class="error-message" id="duracaoError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="status">
                  <i class="bi bi-toggle-on"></i>
                  <span>Status</span>
                </label>
                <select id="status">
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" id="salvarRota" class="primary">
                <i class="bi bi-save"></i>
                <span>Salvar</span>
              </button>
              <button type="button" id="cancelarRota" class="secondary">
                <i class="bi bi-x-circle"></i>
                <span>Cancelar</span>
              </button>
            </div>
          </form>
        </div>
        <div class="rota-table-container" id="rotaTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Distância (km)</th>
                <th>Duração estimada</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="rotasBody"></tbody>
          </table>
        </div>
      </div>
    `;
  }
}
