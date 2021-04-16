import {apiConfig} from "./utils";

function checkApiRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Возникла ошибка :(');
}

class Api {
  constructor({url, token}) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
  }

  getUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    }).then(checkApiRes);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    }).then(checkApiRes);
  }

  editUser(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(checkApiRes);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(checkApiRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(checkApiRes);
  }

  changeCardLikeStatus(cardId, isLiked) {
    return isLiked
      ? fetch(`${this._url}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(checkApiRes)
      : fetch(`${this._url}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      }).then(checkApiRes);
  }

  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(checkApiRes);
  }
}

const api = new Api(apiConfig);
export default api;
