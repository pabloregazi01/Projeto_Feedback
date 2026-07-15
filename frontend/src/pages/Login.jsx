import "./login.css";

function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">
          <h1>Feedback 360°</h1>
          <p>Gestão de avaliações e desenvolvimento</p>
        </div>

        <form>

          <div className="input-group">
            <label>Usuário</label>
            <input 
              type="text"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;