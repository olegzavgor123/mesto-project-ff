function createCard (name, link, alt, deleteCard, likeCard, openPopImage){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', () => { deleteCard(cardElement) });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', ()=> {likeCard(cardLikeButton)})

  cardImage.addEventListener('click', ()=> {openPopImage(link, name)});

  return cardElement;
}

//Удаление карточки
function deleteCard(item) {
  item.remove();
} 

//Лайк карточки
function likeCard(card){
  card.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard}