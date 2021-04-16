import React from "react";
import {NavLink, Route, Switch} from "react-router-dom";

function Header() {
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
            <p className="header__text">email@gmail.com</p>
            <button className="header__button">Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
