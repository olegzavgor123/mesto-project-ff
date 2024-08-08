
const cohortId = 'wff-cohort-20';
const token = 'ef36db3a-2d19-4abf-a669-67e2f7384cff';

////////////////////////------------------------------------------------
function API() { 
 return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(res => res.json());
}


//Patch имя и описания профиля
 function patchProfile (name, about)  {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

//POST карточки
function postCard(cardName, cardLink) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
}

//Like Карточки
function PutLikeCard(id) {
 return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`,{
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
}

function removeLikeCard(id) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
}

//Редактировать Аву
function PatchProfileImage(link) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
}


export {patchProfile, cohortId, token, postCard, API, PutLikeCard, removeLikeCard, PatchProfileImage}