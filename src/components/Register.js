import React from "react";
import { Link } from 'react-router-dom';

function Register({onRegister}) {
  const [userData, setUserData] = React.useState({
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {password, email} = userData;

    onRegister({ password, email });
  }

  return (
    <section className="auth page__auth">
      <div className="auth__container">
        <h1 className="auth__header">Регистрация</h1>
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
          <button type="submit" className="auth__submit">Зарегистрироваться</button>
        </form>
        <div className="auth__hint">
          <p className="auth__hint-text">Уже зарегистрированы?</p>
          <Link className="auth__hint-link" to="/sign-in">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
