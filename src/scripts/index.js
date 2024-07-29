import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard, openPopImage } from './card.js'
import { openPopup, closePopup } from './modal.js'
import '../pages/index.css';

const container = document.querySelector('.places__list');


initialCards.forEach((item) => {
  container.append(createCard(item.name, item.link, item.alt, deleteCard, likeCard, openPopImage));
})


//6 sprint

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');


//Закрытие попапа по крестику
const popupsClose = document.querySelectorAll('.popup__close');
popupsClose.forEach((closeTag)=> {
  const popup = closeTag.closest('.popup');
  closeTag.addEventListener('click', () => closePopup(popup));
})


//Закрытие попапа по оверлэю
popups.forEach((popupOverlay)=> {
  popupOverlay.addEventListener('click', (evt)=> {
    if (evt.target === popupOverlay){
      const popup = popupOverlay.closest('.popup')
      closePopup(popup);
    }
  })
})


//Открытие попапа редактирования профиля
editButton.addEventListener('click', ()=> {openPopup(editPopup)});


//Имя и описание по умолчанию
const userName = document.querySelector('.profile__title').textContent;
const userDesc = document.querySelector('.profile__description').textContent;

const editForm = document.forms.editprofile;
editForm.elements.name.value = userName;
editForm.elements.description.value = userDesc;


//Редактирование кнопкой сохранить
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

function editFormSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
}

editForm.addEventListener('submit', (evt) => {
  editFormSubmit(evt);
  closePopup(editPopup);
})


//Открытие формы добавления карточки
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
})


//Добавление карточки
const addCardForm = document.forms.newplace;

addCardForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const nameCard = addCardForm.elements.placename.value;
  const link = addCardForm.elements.link.value;

  initialCards.unshift({
    name: nameCard,
    link: link
  })
  container.prepend(createCard(nameCard,link, '', deleteCard, likeCard, openPopImage))
  closePopup(popupNewCard);
  addCardForm.elements.placename.value = '';
  addCardForm.elements.link.value = '';
})

