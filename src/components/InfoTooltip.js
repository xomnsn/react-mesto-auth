import React from "react";
import okImg from "../images/ok.svg";
import errorImg from "../images/error.svg";

function InfoTooltip(props) {
  const {ok, isOpen, onClose} = props;

  const message = {
    err: "Что-то пошло не так! Попробуйте ещё раз.",
    ok: "Вы успешно зарегистрировались!"
  };
  const style = {
    backgroundImage: `url(${ok ? okImg : errorImg})`
  }

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_tooltip">
        <div className="popup__status-img" style={style} />
        <h2 className="popup__header">
          {ok ? message.ok : message.err}
        </h2>
        <button type="button" aria-label="Закрыть окно"
                className="popup__close-button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoTooltip;
