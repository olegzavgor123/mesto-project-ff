import { openPopup } from "./modal";

function createCard (name, link, alt, deleteCard, likeCard, popImage){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', () => { deleteCard(cardElement) });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', ()=> {likeCard(cardLikeButton)})

  const cardImageButton = cardElement.querySelector('.card__image');
  cardImageButton.addEventListener('click', ()=> {popImage(link, name)});

  return cardElement;
}

//Удаление карточки
function deleteCard(item) {
  item.remove();
} 

//Лайк карточки
function likeCard(card){
  if (card.classList.contains('card__like-button_is-active')) {
    card.classList.remove('card__like-button_is-active');
  } else
    card.classList.add('card__like-button_is-active');
}

//Попап картинки
function popImage(link, desc){
  const popupTypeImage = document.querySelector('.popup_type_image');
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__caption').textContent = desc;
  openPopup(popupTypeImage);
}



export {createCard, deleteCard, likeCard, popImage}