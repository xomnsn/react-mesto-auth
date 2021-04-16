import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const {card, onCardClick, onLikeClick, onDeleteClick} = props;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${!isOwn && 'place__delete-button_hidden'}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${isLiked && 'place__like-button_liked'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }
  
  function handleDeleteClick() {
    onDeleteClick(card._id);
  }

  return (
    <li
      key={card._id}
      className="place">
      <div className="place__picture-container">
        <img
          src={card.link}
          alt={card.name}
          className="place__picture"
          onClick={handleClick}
        />
      </div>
      <div className="place__footer">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button
            type="button" aria-label="Поставить лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button" aria-label="Удалить место"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card;
