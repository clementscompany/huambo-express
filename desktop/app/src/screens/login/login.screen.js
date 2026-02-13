export class LoginScreen {
  static renderPage({ }) {
    return `
    <div class="loginContainer">
      <div class="left">
        <div class="text">
          <h2>Otimizando as operações de viagens globais</h2>
          <p>Acesse a central de gerenciamento de frota, planejamento de rotas e rastreamento logístico em tempo real.</p>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="logo">
            <img src="./src/img/app-icon-color.png" alt="Logo">
          </div>
          <div class="title">
            <h2>Huambo Express</h2>
            <p>Gerenciamento administrativo</p>
        </div>  
      </div>

        <form class="form" id="loginForm">
          <div class="title">
            <h3>Seja bem-vindo</h3>
            <p>Por favor, faça login para continuar</p>
          </div>

          <div class="inputBox">
            <label for="username">Login</label>
            <i class="bi bi-person-fill"></i>
            <input type="text" id="username" placeholder="Digite seu email ou telefone...">
          </div>

          <div class="inputBox">
            <label for="password">Senha</label>
            <i class="bi bi-key-fill"></i>
            <input type="password" id="password" placeholder="Digite sua senha...">
            <button type="button" class="showPassword"><i class="bi bi-eye-fill"></i></button>
          </div>

          <div class="options">
            <div class="rememberMe">
              <input type="checkbox" id="rememberMe">
              <label for="rememberMe">Lembrar-me</label>
            </div>
            <div class="forgotPassword">
              <a href="#">Esqueceu a senha?</a>
            </div>
          </div>
          
           <div class="submitButton">
            <button id="loginButton" class="btn btn-primary" style="width: 100%; justify-content: center;">Entrar</button>
           </div>

          <div class="accessHelp">
            <p>Problemas de acesso? <a href="#">Clique aqui</a></p>
          </div>
        </form>
    </div>
    `;
  }
}