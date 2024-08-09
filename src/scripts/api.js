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
const USERS_CARDS = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
.then(processData)
.catch((err) => {
  console.error(err)
})


//Patch имя и описания профиля
 const patchProfile = (name, about, button) => {
  button.textContent = 'Сохранение...'
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(processData)
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    button.textContent = 'Сохранить'
  })
}


//POST карточки
const postCard = (cardName, cardLink, button) => {
  button.textContent = 'Сохранение...'
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => res.json())
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    button.textContent = 'Сохранить'
  })
}


//Delete карточки
const deleteCardOnServ = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(processData)
  .catch((err) => {
    console.error(err)
  })
}


//Like Карточки
const putLikeCard = (id) => {
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'PUT',
    headers: config.headers
  })
  .then(processData)
  .catch((err) => {
    console.error(err)
  })
}


//Дизлайк карточки
const removeLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(processData)
  .catch((err) => {
    console.error(err)
  })
}


//Редактировать Аву
const patchProfileImage = (link, button) => {
  button.textContent = 'Сохранение...'
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(processData)
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    button.textContent = 'Сохранить'
  })
}


export {patchProfile, USERS_CARDS, postCard, getUserInfo, putLikeCard, removeLikeCard, patchProfileImage, deleteCardOnServ}