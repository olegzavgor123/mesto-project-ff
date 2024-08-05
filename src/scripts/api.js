import { createCard } from "./card";
const cohortId = 'wff-cohort-20';
const token = 'ef36db3a-2d19-4abf-a669-67e2f7384cff';

function API() { 
 return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then(data => {
    return data;
  })
}

const user = API();

const myUserId = user.then((data) => {
  return data._id
})

console.log(myUserId)

function idCheck (myID, anyId) {
  if(myID === anyId)
    return true
  else
    return false
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
  USER_ID();
}

//POST карточки
function  postCard() {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Ярославль',
      link: 'https://avatars.mds.yandex.net/get-marketcms/1490511/img-e1a979a5-476b-4375-bae7-55a045729703.jpeg/optimize'
    })
  })
}

export {patchProfile, cohortId, token, myUserId, idCheck}
// postCard();