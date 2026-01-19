import { HTTPRequest } from "../hooks/http.js";

export class Header {
  static async Home() {
    const token =
      sessionStorage.getItem("token") ?? localStorage.getItem("token");

    const getDataHome = await HTTPRequest.get("/perfil", null, token);
    const { data } = getDataHome;

    return `
      <header class="header">
        <h1 class="header-title">Visão Geral</h1>

        <div class="header-search">
          <i class="bi bi-search"></i>
          <input
            type="text"
            placeholder="Pesquisar..."
          />
        </div>

        <div class="header-actions">
          <div class="notification">
            <i class="bi bi-bell"></i>
          </div>

          <div class="profile">
            <div class="profile-info">
              <span>${data?.nome ?? "Erro ao obter os dados"}</span>
              <small>${data?.tipo ?? "Erro!"}</small>
            </div>

            <div class="profile-avatar">
              <i class="bi bi-person"></i>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  static async analytics() {
    return `
      <section class="analytics">

        <div class="analytics-card">
          <div class="card-header">
            <div class="icon bg-blue">
              <i class="bi bi-calendar-check"></i>
            </div>
            <span class="badge positive">+12%</span>
          </div>
          <p class="label">Total de Viagens</p>
          <h2 class="value">1.284</h2>
        </div>

        <div class="analytics-card">
          <div class="card-header">
            <div class="icon bg-green">
              <i class="bi bi-people"></i>
            </div>
            <span class="badge positive">+5%</span>
          </div>
          <p class="label">Passageiros Ativos</p>
          <h2 class="value">850</h2>
        </div>

        <div class="analytics-card">
          <div class="card-header">
            <div class="icon bg-orange">
              <i class="bi bi-bus-front"></i>
            </div>
            <span class="badge negative">-2%</span>
          </div>
          <p class="label">Autocarros Disponíveis</p>
          <h2 class="value">42</h2>
        </div>

        <div class="analytics-card">
          <div class="card-header">
            <div class="icon bg-purple">
              <i class="bi bi-clipboard-check"></i>
            </div>
            <span class="badge positive">+8%</span>
          </div>
          <p class="label">Reservas Pendentes</p>
          <h2 class="value">15</h2>
        </div>

      </section>
    `;
  }
}
