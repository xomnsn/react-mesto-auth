import React from "react";

function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_func_img-view ${card && 'popup_opened'}`}>
      <div className="image-view">
        <figure className="image-view__figure">
          <img src={card?.link} alt={card?.name} className="image-view__image"/>
          <figcaption className="image-view__caption">{card?.name}</figcaption>
        </figure>
        <button type="button" aria-label="Закрыть окно"
                className="image-view__close-button popup__close-button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default ImagePopup;
