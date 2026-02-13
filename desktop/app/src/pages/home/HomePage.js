import { Header } from "../../components/Header.js";
import { MenuApp } from "../../components/Menu.js";
import { ModalComponents } from "../../components/modalComponents.js";
import { HomeScreen } from "../../screens/home/Home.screen.js";
import { NavigationClass } from "../../utils/Navigation.js";
import { HTTPRequest } from "../../hooks/http.js";
import { Tables } from "../../screens/tables/tables.js";

export class HomePage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.token = sessionStorage.getItem("token") ?? localStorage.getItem("token");
    this.Home(this.mainContainer);
  }

  async Home(mainContainer) {
    ModalComponents.miniSpinner(mainContainer);

    // Render structure
    await this.HomeComponents(mainContainer);

    // Load dashboard data
    await this.loadDashboardData(mainContainer);

    ModalComponents.closeMiniSpinner(mainContainer);
  }

  async HomeComponents(mainContainer) {
    mainContainer.innerHTML = HomeScreen.base({ left: MenuApp.base({ path: "/dashboard" }) })
    const head = mainContainer.querySelector("#headerTop");
    const analytics = mainContainer.querySelector("#analytics");
    if (head) { head.innerHTML = await Header.Home(); }
    if (analytics) { analytics.innerHTML = await Header.analytics(); }
    new NavigationClass(mainContainer);
  }

  async loadDashboardData(mainContainer) {
    try {
      const [viagensRes, reservasRes, usersRes, veiculosRes] = await Promise.all([
        HTTPRequest.get('/viagens', null, this.token),
        HTTPRequest.get('/reservas/all', null, this.token),
        HTTPRequest.get('/users', null, this.token),
        HTTPRequest.get('/veiculos', null, this.token)
      ]);

      const viagens = viagensRes.success ? viagensRes.data : [];
      const reservas = reservasRes.success ? reservasRes.data : [];
      const users = usersRes.success ? usersRes.data : [];
      const veiculos = veiculosRes.success ? veiculosRes.data : [];

      this.updateAnalytics(mainContainer, { viagens, reservas, users, veiculos });
      this.renderTables(mainContainer, { viagens, reservas, users });

    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    }
  }

  updateAnalytics(mainContainer, data) {
    const cards = mainContainer.querySelectorAll('.analytics-card .value');
    if (cards.length >= 4) {
      // 1. Total Viagens
      cards[0].textContent = data.viagens.length;

      // 2. Passageiros Ativos (Clientes)
      cards[1].textContent = data.users.filter(u => u.tipo === 'cliente').length;

      // 3. Autocarros Disponíveis
      cards[2].textContent = data.veiculos.filter(v => v.ativo).length;

      // 4. Reservas Pendentes
      cards[3].textContent = data.reservas.filter(r => r.status === 'pendente').length;
    }
  }

  renderTables(mainContainer, data) {
    const container = mainContainer.querySelector('#dashboardLists');
    if (!container) return;

    const recentViagens = data.viagens.slice(0, 5);
    const recentReservas = data.reservas.slice(0, 5);
    const recentUsers = data.users.slice(0, 5);

    const viagensRows = recentViagens.length > 0 ? recentViagens.map(v => `
          <tr>
              <td>${v.origem || v.rota_origem || '-'} -> ${v.destino || v.rota_destino || '-'}</td>
              <td>${v.data ? v.data.split('T')[0] : '-'} ${v.hora || ''}</td>
              <td>${v.preco}</td>
              <td><span class="status-badge status-${v.status}">${v.status}</span></td>
          </tr>
      `).join('') : '<tr><td colspan="4" style="text-align:center; padding: 1rem;">Nenhuma viagem recente</td></tr>';

    const reservasRows = recentReservas.length > 0 ? recentReservas.map(r => `
          <tr>
              <td>${r.usuario_nome || '-'}</td>
              <td>${r.origem} -> ${r.destino}</td>
              <td>${r.data ? r.data.split('T')[0] : '-'}</td>
              <td><span class="status-badge status-${r.status}">${r.status}</span></td>
          </tr>
      `).join('') : '<tr><td colspan="4" style="text-align:center; padding: 1rem;">Nenhuma reserva recente</td></tr>';

    const usersRows = recentUsers.length > 0 ? recentUsers.map(u => `
          <tr>
              <td>${u.nome}</td>
              <td>${u.email || '-'}</td>
              <td>${u.telefone}</td>
              <td>${u.tipo}</td>
          </tr>
      `).join('') : '<tr><td colspan="4" style="text-align:center; padding: 1rem;">Nenhum usuário recente</td></tr>';

    container.innerHTML = `
          ${Tables.dashboardTable({
      title: 'Últimas Viagens',
      columns: ['Rota', 'Data/Hora', 'Preço', 'Status'],
      rows: viagensRows,
      seeMoreLink: '#/viagens'
    })}
          
          ${Tables.dashboardTable({
      title: 'Últimas Reservas',
      columns: ['Cliente', 'Viagem', 'Data', 'Status'],
      rows: reservasRows,
      seeMoreLink: '#/reservas' 
    })}
          
          ${Tables.dashboardTable({
      title: 'Novos Clientes',
      columns: ['Nome', 'Email', 'Telefone', 'Tipo'],
      rows: usersRows,
      seeMoreLink: '#/clientes'
    })}
      `;
  }
}
