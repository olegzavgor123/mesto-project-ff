import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
import {enableValidation, hideInputError, validationConfig} from './validation.js'
import '../pages/index.css';

const container = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');

//Имя и описание по умолчанию
const userName = document.querySelector('.profile__title');
const userDesc = document.querySelector('.profile__description');

//Форма редактирования профиля
const editForm = document.forms.editprofile;

const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

initialCards.forEach((item) => {
  container.append(createCard(item.name, item.link, item.alt, deleteCard, likeCard, openPopImage));
})


//6 sprint

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');


//Закрытие попапа по крестику
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((closeTag)=> {
  const popup = closeTag.closest('.popup');
  closeTag.addEventListener('click', () => closePopup(popup));
})


//Закрытие попапа по оверлэю
popups.forEach((popupOverlay)=> {
  popupOverlay.addEventListener('click', (evt)=> {
    if (evt.target === popupOverlay){
      closePopup(popupOverlay);
    }
  })
})


//Открытие попапа редактирования профиля
editButton.addEventListener('click', ()=> {
  editForm.elements.name.value = userName.textContent;
  editForm.elements.description.value = userDesc.textContent;
  hideInputError(editForm, editForm.elements.name, validationConfig);
  hideInputError(editForm, editForm.elements.description, validationConfig);
  openPopup(editPopup)
});


//Редактирование кнопкой сохранить

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  userName.textContent = nameInput.value;
  userDesc.textContent = jobInput.value;
}

editForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(editPopup);
})


//Открытие формы добавления карточки
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.newplace;
addButton.addEventListener('click', () => {
  newCardForm.elements.placename.value = '';
  newCardForm.elements.link.value = '';
  hideInputError(newCardForm, newCardForm.elements.placename, validationConfig);
  hideInputError(newCardForm, newCardForm.elements.link, validationConfig);
  openPopup(popupNewCard);
})


//Добавление карточки
const addCardForm = document.forms.newplace;

addCardForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const nameCard = addCardForm.elements.placename.value;
  const link = addCardForm.elements.link.value;

  container.prepend(createCard(nameCard,link, '', deleteCard, likeCard, openPopImage))
  closePopup(popupNewCard);
  evt.target.reset();
})

//Попап картинки
function openPopImage(link, desc){
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__caption').textContent = desc;
  popupTypeImage.querySelector('.popup__image').alt = desc;
  openPopup(popupTypeImage);
}



//7 sprint
enableValidation();