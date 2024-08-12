const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'ef36db3a-2d19-4abf-a669-67e2f7384cff',
    'Content-Type': 'application/json'
  }
}

//Обработка промиса
const processData = (res) => {
  if (res.ok) {
    return res.json();
  } 
    return Promise.reject(`Ошибка запроса: ${res.status}`)
}


//Информация о пользователе
const getUserInfo = () =>  { 
 return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(processData);
}


//Отображение карточек
const getUsersCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(processData)
}

//Patch имя и описания профиля
 const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(processData)
}


//POST карточки
const postCard = (cardName, cardLink) => {
  // button.textContent = 'Сохранение...'
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => res.json())
}


//Delete карточки
const deleteCardOnServ = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(processData)
}


//Like Карточки
const putLikeCard = (id) => {
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'PUT',
    headers: config.headers
  })
  .then(processData)
}


//Дизлайк карточки
const removeLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(processData)
}


//Редактировать Аву
const patchProfileImage = (link) => {
  // button.textContent = 'Сохранение...'
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(processData)

}


export {patchProfile, getUsersCards, postCard, getUserInfo, putLikeCard, removeLikeCard, patchProfileImage, deleteCardOnServ}