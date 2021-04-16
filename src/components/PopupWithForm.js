import React from "react";

function PopupWithForm(props) {
  const {name, title, button, isOpen, onClose, onSubmit, children} = props;

  return (
    <div className={`popup popup_func_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form noValidate
              className="popup__form"
              name={name}
              onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit">{button}</button>
        </form>
        <button type="button" aria-label="Закрыть окно"
                className="popup__close-button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default PopupWithForm;
