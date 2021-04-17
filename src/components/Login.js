import React from "react";

function Login({onLogin}) {

  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(userData);
  }

  return (
    <section className="auth page__auth">
      <div className="auth__container">
        <h1 className="auth__header">Вход</h1>
        <form noValidate
              className="auth__form"
              name="login"
              onSubmit={handleSubmit}>
          <input type="email" name="email"
                 required minLength="3" maxLength="70"
                 placeholder="Email"
                 className="auth__input"
                 id="email"
                 value={userData.email}
                 onChange={handleChange}/>
          <input type="password" name="password"
                 required minLength="2" maxLength="200"
                 placeholder="Пароль"
                 className="auth__input"
                 id="password"
                 value={userData.password}
                 onChange={handleChange}/>
          <button type="submit" className="auth__submit">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
