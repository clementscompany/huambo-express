export class Tables {
  static routes(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(rota => ` 
      <tr>
        <td>${rota.origem}</td>
        <td>${rota.destino}</td>
        <td>${rota.distancia_km}</td>
        <td>${rota.duracao_minutos} min</td>
        <td><span class="status-badge status-${rota.status}">${rota.status}</span></td>
        <td class="actions-cell">
          <button class="btn-edit" data-id="${rota.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-delete" data-id="${rota.id}" title="Deletar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="6" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-geo-alt"></i>
            <p>Nenhuma rota cadastrada ainda.</p>
          </div>
        </td>
      </tr>
        `
      ;

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
                <label for="distancia_km">
                  <i class="bi bi-signpost"></i>
                  <span>Distância (km)</span>
                </label>
                <input id="distancia_km" type="number" step="0.01" min="0" placeholder="Opcional">
                <span class="error-message" id="distancia_kmError"></span>
              </div>
              <div class="form-group">
                <label for="duracao_minutos">
                  <i class="bi bi-clock-history"></i>
                  <span>Duração estimada (min)</span>
                </label>
                <input id="duracao_minutos" type="number" step="1" min="0" placeholder="Opcional">
                <span class="error-message" id="duracao_minutosError"></span>
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
              <button type="submit" id="salvarRota" class="btn btn-primary">
                <i class="bi bi-save"></i>
                <span>Salvar</span>
              </button>
              <button type="button" id="cancelarRota" class="btn btn-secondary">
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
            <tbody id="rotasBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static autocarros(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(item => ` 
      <tr>
        <td>${item.modelo || '-'}</td>
        <td>${item.matricula}</td>
        <td>${item.capacidade}</td>
        <td><span class="status-badge status-${item.ativo ? 'ativa' : 'inativa'}">${item.ativo ? 'Ativo' : 'Inativo'}</span></td>
        <td class="actions-cell">
          <button class="btn-edit" data-id="${item.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-delete" data-id="${item.id}" title="Deletar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="5" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-bus-front"></i>
            <p>Nenhum autocarro cadastrado ainda.</p>
          </div>
        </td>
      </tr>
        `
      ;

    return `
      <div class="rota-body">
        <div class="rota-form-container hidden" id="autocarroFormContainer">
          <form id="autocarroForm" class="rota-form">
            <input type="hidden" id="autocarroId">
            <div class="form-row">
              <div class="form-group">
                <label for="modelo">
                  <i class="bi bi-bus-front"></i>
                  <span>Modelo</span>
                </label>
                <input id="modelo" type="text" placeholder="Ex: Toyota Coaster">
                <span class="error-message" id="modeloError"></span>
              </div>
              <div class="form-group">
                <label for="matricula">
                  <i class="bi bi-card-text"></i>
                  <span>Matrícula</span>
                </label>
                <input id="matricula" type="text" placeholder="Ex: LD-00-00-AA">
                <span class="error-message" id="matriculaError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="capacidade">
                  <i class="bi bi-people"></i>
                  <span>Capacidade (Lugares)</span>
                </label>
                <input id="capacidade" type="number" min="1" placeholder="Ex: 30">
                <span class="error-message" id="capacidadeError"></span>
              </div>
              <div class="form-group">
                <label for="status">
                  <i class="bi bi-toggle-on"></i>
                  <span>Status</span>
                </label>
                <select id="status">
                  <option value="ativo">Ativo</option>
                  <option value="inativa">Inativo</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" id="salvarAutoCarro" class="btn btn-primary">
                <i class="bi bi-save"></i>
                <span>Salvar</span>
              </button>
              <button type="button" id="cancelarAutoCarro" class="btn btn-secondary">
                <i class="bi bi-x-circle"></i>
                <span>Cancelar</span>
              </button>
            </div>
          </form>
          </div>

        <div class="rota-table-container" id="autocarroTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Matrícula</th>
                <th>Capacidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="autocarrosBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static motoristas(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(item => ` 
      <tr>
        <td>${item.nome}</td>
        <td>${item.telefone}</td>
        <td>${item.email || '-'}</td>
        <td>${item.genero}</td>
        <td class="actions-cell">
          <button class="btn-edit" data-id="${item.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-delete" data-id="${item.id}" title="Deletar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="5" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-person-badge"></i>
            <p>Nenhum motorista cadastrado ainda.</p>
          </div>
        </td>
      </tr>
        `
      ;

    return `
      <div class="rota-body">
        <div class="rota-form-container hidden" id="motoristaFormContainer">
          <form id="motoristaForm" class="rota-form">
            <input type="hidden" id="motoristaId">
            <div class="form-row">
              <div class="form-group">
                <label for="nome">
                  <i class="bi bi-person"></i>
                  <span>Nome Completo</span>
                </label>
                <input id="nome" type="text" placeholder="Nome do motorista">
                <span class="error-message" id="nomeError"></span>
              </div>
              <div class="form-group">
                <label for="email">
                  <i class="bi bi-envelope"></i>
                  <span>Email</span>
                </label>
                <input id="email" type="email" placeholder="email@exemplo.com">
                <span class="error-message" id="emailError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="telefone">
                  <i class="bi bi-telephone"></i>
                  <span>Telefone</span>
                </label>
                <input id="telefone" type="text" placeholder="Telefone principal">
                <span class="error-message" id="telefoneError"></span>
              </div>
              <div class="form-group">
                <label for="telefone_contato">
                  <i class="bi bi-telephone-plus"></i>
                  <span>Tel. Contato (Opcional)</span>
                </label>
                <input id="telefone_contato" type="text" placeholder="Telefone secundário">
                <span class="error-message" id="telefone_contatoError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="numero_carta">
                  <i class="bi bi-card-heading"></i>
                  <span>Nº Carta Condução</span>
                </label>
                <input id="numero_carta" type="text" placeholder="Número da carta">
                <span class="error-message" id="numero_cartaError"></span>
              </div>
              <div class="form-group">
                <label for="bilhete_identidade">
                  <i class="bi bi-person-vcard"></i>
                  <span>Bilhete de Identidade</span>
                </label>
                <input id="bilhete_identidade" type="text" placeholder="Nº do BI">
                <span class="error-message" id="bilhete_identidadeError"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="genero">
                  <i class="bi bi-gender-ambiguous"></i>
                  <span>Gênero</span>
                </label>
                <select id="genero">
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <span class="error-message" id="generoError"></span>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" id="salvarMotorista" class="btn btn-primary">
                <i class="bi bi-save"></i>
                <span>Salvar</span>
              </button>
              <button type="button" id="cancelarMotorista" class="btn btn-secondary">
                <i class="bi bi-x-circle"></i>
                <span>Cancelar</span>
              </button>
            </div>
          </form>
          </div>

        <div class="rota-table-container" id="motoristaTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Gênero</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="motoristasBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static viagens(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(item => ` 
      <tr>
        <td>
            <div class="rota-info">
                <strong>${item.origem} <i class="bi bi-arrow-right"></i> ${item.destino}</strong>
            </div>
        </td>
        <td>
            <div class="datetime-info">
                <div><i class="bi bi-calendar"></i> ${new Date(item.data).toLocaleDateString()}</div>
                <div><i class="bi bi-clock"></i> ${item.hora}</div>
            </div>
        </td>
        <td>${item.duracao_minutos ? item.duracao_minutos + ' min' : '-'}</td>
        <td>
            <div class="veiculo-info">
                <div>${item.veiculo_modelo || 'N/A'}</div>
                <small>${item.veiculo_matricula || ''}</small>
            </div>
        </td>
        <td>
            <div class="motoristas-info">
                <div><i class="bi bi-person"></i> ${item.motorista_nome || 'N/A'}</div>
                ${item.motorista_2_nome ? `<div><i class="bi bi-person"></i> ${item.motorista_2_nome}</div>` : ''}
            </div>
        </td>
        <td>${item.vagas_disponiveis}</td>
        <td><span class="status-badge status-${item.status}">${item.status}</span></td>
        <td class="actions-cell">
          <button class="btn-assentos" data-id="${item.id}" title="Ver Assentos" style="background-color: #6f42c1; color: white;">
            <i class="bi bi-grid-3x3"></i>
          </button>
          <button class="btn-delete" data-id="${item.id}" title="Deletar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="8" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-bus-front"></i>
            <p>Nenhuma viagem agendada.</p>
          </div>
        </td>
      </tr>
        `
      ;

    return `
      <div class="rota-body">
        
        <!-- Modal de Assentos -->
        <div id="assentosModal" class="modal-overlay hidden">
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3>Mapa de Assentos</h3>
                    <button id="closeAssentosModal" class="close-btn"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body">
                    <div class="assentos-legend">
                        <span class="legend-item"><span class="seat-sample livre"></span> Livre</span>
                        <span class="legend-item"><span class="seat-sample ocupado"></span> Ocupado</span>
                        <span class="legend-item"><span class="seat-sample pendente"></span> Pendente</span>
                    </div>
                    <div id="assentosGrid" class="assentos-grid"></div>
                </div>
            </div>
        </div>

        <div class="rota-form-container hidden" id="viagemFormContainer">
          <form id="viagemForm" class="rota-form">
            <input type="hidden" id="viagemId">
            
            <div class="form-row">
              <div class="form-group">
                <label for="rotaSelect">Rota</label>
                <select id="rotaSelect"></select>
              </div>
              <div class="form-group">
                <label for="veiculoSelect">Veículo</label>
                <select id="veiculoSelect"></select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="motoristaSelect">Motorista Principal</label>
                <select id="motoristaSelect"></select>
              </div>
              <div class="form-group">
                <label for="motorista2Select">2º Motorista (Opcional)</label>
                <select id="motorista2Select">
                    <option value="">Nenhum</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="dataViagem">Data</label>
                <input id="dataViagem" type="date">
              </div>
              <div class="form-group">
                <label for="horaViagem">Hora</label>
                <input id="horaViagem" type="time">
              </div>
               <div class="form-group">
                <label for="precoViagem">Preço</label>
                <input id="precoViagem" type="number" step="0.01" min="0">
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" id="salvarViagem" class="btn btn-primary">
                <i class="bi bi-save"></i>
                <span>Salvar</span>
              </button>
              <button type="button" id="cancelarViagem" class="btn btn-secondary">
                <i class="bi bi-x-circle"></i>
                <span>Cancelar</span>
              </button>
            </div>
          </form>
          </div>

        <div class="rota-table-container" id="viagemTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Rota</th>
                <th>Partida</th>
                <th>Duração</th>
                <th>Veículo</th>
                <th>Motoristas</th>
                <th>Vagas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="viagensBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static clientes(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(item => ` 
      <tr>
        <td>${item.nome}</td>
        <td>${item.email || '-'}</td>
        <td>${item.telefone}</td>
        <td><span class="status-badge status-${item.ativo ? 'ativa' : 'inativa'}">${item.ativo ? 'Ativo' : 'Inativo'}</span></td>
        <td>${item.tipo}</td>
        <td class="actions-cell">
          <button class="btn-edit" data-id="${item.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-delete" data-id="${item.id}" title="Deletar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="6" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-people"></i>
            <p>Nenhum cliente cadastrado ainda.</p>
          </div>
        </td>
      </tr>
        `
      ;

    return `
      <div class="rota-body">
        <!-- Form for Clientes can be added here if needed, or handle via separate modal/page -->
        
        <div class="rota-table-container" id="clientesTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="clientesBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static reservas(props) {
    const { data = [] } = props;

    const rowsHTML = data.length > 0 ? data.map(item => ` 
      <tr>
        <td>
            <div class="rota-info">
               ${item.usuario_nome || 'N/A'}
               <br><small>${item.usuario_telefone || ''}</small>
            </div>
        </td>
        <td>
            ${item.origem} <i class="bi bi-arrow-right"></i> ${item.destino}
        </td>
        <td>
            <div class="datetime-info">
                <div><i class="bi bi-calendar"></i> ${item.data ? new Date(item.data).toLocaleDateString() : '-'}</div>
                <div><i class="bi bi-clock"></i> ${item.hora || '-'}</div>
            </div>
        </td>
        <td>${item.assento_numero || '-'}</td>
        <td>${item.preco || '-'}</td>
        <td><span class="status-badge status-${item.status}">${item.status}</span></td>
        <td class="actions-cell">
          <!-- Add specific actions for reservations if needed, e.g. Cancel -->
          <button class="btn-delete" data-id="${item.id}" title="Cancelar Reserva">
            <i class="bi bi-x-circle"></i>
          </button>
        </td>
      </tr>
    `).join('') :
      `
       <tr>
        <td colspan="7" style="text-align:center; padding: 2rem;">
          <div class="empty-state">
            <i class="bi bi-ticket-perforated"></i>
            <p>Nenhuma reserva encontrada.</p>
          </div>
        </td>
      </tr>
        `
      ;

    return `
      <div class="rota-body">
        <div class="rota-table-container" id="reservasTableContainer">
          <table class="rota-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Viagem</th>
                <th>Data/Hora</th>
                <th>Assento</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="reservasBody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static dashboardTable({ title, columns, rows, seeMoreLink }) {
    return `
      <div class="dashboard-table-card" style="background: var(--card); padding: 20px; border-radius: 12px; border: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="font-size: 16px; font-weight: 600; color: var(--text);">${title}</h3>
            <button onclick="window.location.hash='${seeMoreLink}'" class="btn-see-more" style="background: transparent; border: 1px solid var(--border); padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; color: var(--text-secondary); transition: all 0.2s;">Ver mais</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="rota-table" style="width: 100%;">
              <thead>
                  <tr>
                      ${columns.map(col => `<th>${col}</th>`).join('')}
                  </tr>
              </thead>
              <tbody>
                  ${rows}
              </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
