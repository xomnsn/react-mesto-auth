import React from "react";
import {NavLink, Route, Switch, useHistory} from "react-router-dom";

function Header({email}) {

  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <NavLink to="/" className="header__logo"/>
      <div className="header__nav">
        <Switch>
          <Route path='/sign-up'>
            <NavLink className="header__link" to="/sign-in">Войти</NavLink>
          </Route>
          <Route path='/sign-in'>
            <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
          </Route>
          <Route exact path='/'>
            <p className="header__text">{email}</p>
            <button className="header__button" onClick={signOut}>Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
