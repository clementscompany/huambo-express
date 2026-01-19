export class MenuApp {
  static base({ path }) {
    const menuItems = [
      { icon: 'bi-grid-fill', label: 'Dashboard', route: '/dashboard' },
      { icon: 'bi-geo-alt-fill', label: 'Rotas', route: '/rotas' },
      { icon: 'bi-bus-front-fill', label: 'Autocarros', route: '/autocarros' },
      { icon: 'bi-people-fill', label: 'Clientes', route: '/clientes' },
      { icon: 'bi-clock-history', label: 'Reservas', route: '/reservas' }
    ];

    return `
      <div class="menu" is="menu_navigator">
        <div class="headerMenu">
          <div class="logo">
            <img src="./src/img/app-icon-color.png" alt="" width="50px">
            <div class="text">
              <h4>Huambo Express</h4>
              <p>Gestão de frotas</p>
            </div>
          </div>
        </div>

        <ul class="list" id="list_menu">
          ${menuItems.map((item, index) => `
            <li class="${item.route === path ? 'active' : ''}" route-path="${item.route}">
              <i class="bi ${item.icon}"></i>
              <span>${item.label}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}
