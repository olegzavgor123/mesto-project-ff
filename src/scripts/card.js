import { putLikeCard, removeLikeCard, deleteCardOnServ } from "./api";

function createCard ({name, link, alt, likeCounter, userId, myData, cardId, dataLikes, deleteCard, likeCard, openPopImage}){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.like-counter');
  likeCount.textContent = likeCounter;

  cardImage.src = link;
  cardImage.alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  
  //Проверка моя карточка или не моя
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (myData._id === userId) {
    deleteButton.classList.add('card__delete-button-active')
    deleteButton.addEventListener('click', () => { deleteCard(cardElement, cardId)});
  }

  //отображение лайка на ранее лайкнутой карточке
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  //Если массив лайкнувших существует, то проходимся по нему
  if (dataLikes){
    dataLikes.forEach((user) => {
      if(user._id === myData._id){
        cardLikeButton.classList.toggle('card__like-button_is-active');
      }
    })
  }

  cardLikeButton.addEventListener('click', ()=> {likeCard(cardLikeButton, cardId, likeCount)})

  cardImage.addEventListener('click', ()=> {openPopImage(link, name)});

  return cardElement;
}

//Удаление карточки
function deleteCard(item, cardId) {
  item.remove();
  deleteCardOnServ(cardId);
} 

//Лайк карточки
function likeCard(card, cardId, likeCount){
  card.classList.toggle('card__like-button_is-active');
  if (card.classList.contains('card__like-button_is-active')) {
    putLikeCard(cardId)
    .then(res => {
      likeCount.textContent = res.likes.length;
    });
  } else {
    removeLikeCard(cardId)
    .then(res => {
      likeCount.textContent = res.likes.length;
    })
  }
}

export {createCard, deleteCard, likeCard}