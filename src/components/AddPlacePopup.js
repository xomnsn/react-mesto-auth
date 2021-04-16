import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" name="name"
             required minLength="2" maxLength="30"
             placeholder="Название"
             className="popup__text-input popup__text-input_type_title" id="card-title"
             value={name}
             onChange={handleNameChange}
      />
      <p className="popup__input-error" id="card-title-error"/>
      <input type="url" name="link"
             required placeholder="Ссылка на картинку"
             className="popup__text-input popup__text-input_type_src" id="card-url"
             value={link}
             onChange={handleLinkChange}
      />
      <p className="popup__input-error" id="card-url-error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
