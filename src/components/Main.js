import React from "react";
import Card from "./Card";
import userIcon from "../images/user-icon.jpg";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const {cards, onCardLike, onCardDelete, onCardClick, onEditUser, onAddPlace, onEditAvatar} = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__main">
      <section className="profile page__profile">
        <div className="profile__user">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar ? currentUser.avatar : userIcon}
              alt="user" className="profile__avatar"/>
            <button className="profile__edit-avatar" onClick={onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="Редактировать данные пользователя"
                      className="profile__edit-user-info" onClick={onEditUser}/>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="Добавить место" className="profile__add-button" onClick={onAddPlace}/>
      </section>
      <section className="page__places places">
        <ul className="places__elements">
          {cards && cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onLikeClick={onCardLike}
              onDeleteClick={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
