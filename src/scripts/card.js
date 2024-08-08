import { PutLikeCard, removeLikeCard } from "./api";

function createCard ({name, link, alt, likeCounter, userId, myData, cardId, deleteCard, likeCard, openPopImage}){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.like-counter');
  likeCount.textContent = likeCounter;

  cardImage.src = link;
  cardImage.alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (myData._id === userId) {
    deleteButton.classList.add('card__delete-button-active')
    deleteButton.addEventListener('click', () => { deleteCard(cardElement) });
  }

   
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', ()=> {likeCard(cardLikeButton, cardId, likeCount)})

  cardImage.addEventListener('click', ()=> {openPopImage(link, name)});

  return cardElement;
}

//Удаление карточки
function deleteCard(item) {
  item.remove();
} 

//Лайк карточки
function likeCard(card, cardId, likeCount){
  card.classList.toggle('card__like-button_is-active');
  if (card.classList.contains('card__like-button_is-active')) {
    PutLikeCard(cardId)
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