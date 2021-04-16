import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="auth page__auth">
      <div className="auth__container">
        <h1 className="auth__header">Вход</h1>
        <form noValidate
              className="auth__form"
              name="login"
              onSubmit={props.onSubmit}>
          <input type="email" name="email"
                 required minLength="3" maxLength="70"
                 placeholder="Email"
                 className="auth__input"
                 id="email"
                 value={email}
                 onChange={handleEmailChange}/>
          <input type="password" name="password"
                 required minLength="2" maxLength="200"
                 placeholder="Пароль"
                 className="auth__input"
                 id="password"
                 value={password}
                 onChange={handlePasswordChange}/>
          <button type="submit" className="auth__submit">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
