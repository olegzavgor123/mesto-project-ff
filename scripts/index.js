const container = document.querySelector('.places__list');

function templateCard (card){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteCard(cardElement);
  return cardElement;
}

function deleteCard (item) {
  const deleteButton = item.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    item.remove();
  })
}


initialCards.forEach((item) => {
  container.append(templateCard(item));
})
