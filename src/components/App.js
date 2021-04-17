import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import api from "../utils/api";
import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isTooltipOk, setIsTooltipOk] = React.useState(false);
  const [isEditUserPopupOpen, setIsEditUserPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const tooltipMessage = {
    err: "Что-то пошло не так! Попробуйте ещё раз.",
    ok: "Вы успешно зарегистрировались!"
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(state => state.filter(c => c._id !== cardId));
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditUserClick() {
    setIsEditUserPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditUserPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUserUpdate(data) {
    api.editUser(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAvatarUpdate(link) {
    api.changeAvatar(link)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleRegister({ password, email }) {
    return auth.register({ password, email })
      .then(() => {
        setIsTooltipOk(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipOk(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  }

  function handleLogin({ password, email }) {
    return auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    setCurrentUser({});
    history.push('/sign-in');
  }

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        auth.getContent(token)
          .then((res) => {
            if (res.data._id) {
              setLoggedIn(true);
              setCurrentUser(res.data._id);
              setEmail(res.data.email);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
            history.push('/sign-in')
          });
      }
    }

    handleTokenCheck();
  },  [loggedIn, history]);

  // get initial user info and cards
  React.useEffect(() => {
    api.getUser()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err));
  },  [loggedIn]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => setCards(cards))
      .catch(err => console.log(err));
  },  [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onLogout={handleLogout}/>
      <main className="page__main">
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditUser={handleEditUserClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
      <EditProfilePopup
        isOpen={isEditUserPopupOpen}
        onClose={closeAllPopups}
        onUserUpdate={handleUserUpdate}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onAvatarUpdate={handleAvatarUpdate}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        button="Да"
        isOpen={false}
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        ok={isTooltipOk}
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        message={tooltipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
