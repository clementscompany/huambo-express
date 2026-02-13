export class Forms {
  static rotas({ data = false }) {
    if (!data) {
      return (
        `
        <form action="" class="rota-form" id="formRotas">
          <div class="form-row">
            <div class="form-group">
              <label for="origem">
                <i class="bi bi-geo-alt"></i>
                <span>Origem</span>
              </label>
              <input type="text" placeholder="Origem..." name="origem" id="origem" required>
            </div>
            <div class="form-group">
              <label for="destino">
                <i class="bi bi-geo-alt-fill"></i>
                <span>Destino</span>
              </label>
              <input type="text" placeholder="Destino..." name="destino" id="destino" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="distancia_km">
                <i class="bi bi-arrows-fullscreen"></i>
                <span>Distância (km)</span>
              </label>
              <input type="number" placeholder="Distância..." name="distancia_km" id="distancia_km" required>
            </div>
            <div class="form-group">
              <label for="duracao_minutos">
                <i class="bi bi-clock"></i>
                <span>Tempo (min)</span>
              </label>
              <input type="number" placeholder="Tempo..." name="duracao_minutos" id="duracao_minutos" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">
                <i class="bi bi-dot"></i>
                <span>Status</span>
              </label>
              <select name="status" id="status">
                <option value="ativa">ATIVA</option>
                <option value="inaativa">INAATIVA</option>
              </select>
            </div>
          </div>
  
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="sendrotasButton">
              <i class="bi bi-save"></i>
              <span>Salvar Rota</span>
            </button>
            <button type="reset" class="btn btn-secondary" id="closeForm">
              <i class="bi bi-x-circle"></i>
              <span>Cancelar</span>
            </button>
          </div>
        </form>
        `
      )
    }

    return (
      `
      <form action="" class="rota-form" id="formRotas">
        <div class="form-row">
          <div class="form-group">
            <label for="origem">
              <i class="bi bi-geo-alt"></i>
              <span>Origem</span>
            </label>
            <input type="text" placeholder="Origem..." name="origem" id="origem" value="${data.origem}" required>
          </div>
          <div class="form-group">
            <label for="destino">
              <i class="bi bi-geo-alt-fill"></i>
              <span>Destino</span>
            </label>
            <input type="text" placeholder="Destino..." name="destino" id="destino" value="${data.destino}" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="distancia_km">
              <i class="bi bi-arrows-fullscreen"></i>
              <span>Distância (km)</span>
            </label>
            <input type="number" placeholder="Distância..." name="distancia_km" id="distancia_km" value="${data.distancia_km}" required>
          </div>
          <div class="form-group">
            <label for="duracao_minutos">
              <i class="bi bi-clock"></i>
              <span>Tempo (min)</span>
            </label>
            <input type="number" placeholder="Tempo..." name="duracao_minutos" id="duracao_minutos" value="${data.duracao_minutos}" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="status">
              <i class="bi bi-dot"></i>
              <span>Status</span>
            </label>
            <select name="status" id="status">
              <option value="ativa" ${data.status === 'ativa' ? 'selected' : ''}>ATIVA</option>
              <option value="inaativa" ${data.status === 'inaativa' ? 'selected' : ''}>INAATIVA</option>
            </select>
          </div>
        </div>
    
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" id="sendrotasButton">
            <i class="bi bi-save"></i>
            <span>Atualizar Rota</span>
          </button>
          <button type="reset" class="btn btn-secondary" id="closeForm">
            <i class="bi bi-x-circle"></i>
            <span>Cancelar</span>
          </button>
        </div>
      </form>
      `
    )
  }
}