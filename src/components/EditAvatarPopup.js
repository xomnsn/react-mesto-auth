import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const {isOpen, onClose, onAvatarUpdate} = props;

  const currentUser = React.useContext(CurrentUserContext);

  const linkRef = React.useRef();

  React.useEffect(() => {
    linkRef.current.value = currentUser.avatar;
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAvatarUpdate({
      avatar: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="url" name="link"
             required
             placeholder="Ссылка на картинку"
             className="popup__text-input popup__text-input_type_avatar-src"
             id="avatar-url"
             ref={linkRef}/>
      <p className="popup__input-error" id="avatar-url-error"/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
