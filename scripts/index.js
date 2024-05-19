const container = document.querySelector('.places__list');

function createCard (name, link, alt, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', () => { deleteCard(cardElement) });
  return cardElement;
}

function deleteCard(item) {
  item.remove();
} 


initialCards.forEach((item) => {
  container.append(createCard(item.name, item.link, item.alt, deleteCard));
})


// function deleteCard(item) {
//   const deleteButton = item.querySelector('.card__delete-button');
//   deleteButton.addEventListener('click', () => {
//     item.remove();
//   })
// }
