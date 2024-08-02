import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
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
addButton.addEventListener('click', () => {
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

//Проходим по всем формам
function enableValidation() {
  const formList = Array.from(document.forms);
  formList.forEach((formElem)=> {
    formElem.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    });
    setEventListener(formElem)
  })
}

//Слушатель на каждый инпут
function setEventListener(formElem) {
  const inputList = Array.from(formElem.querySelectorAll('.popup__input'));
  inputList.forEach((input)=> {
    input.addEventListener('input', ()=> {
      checkInputValidation(formElem, input);
    })
  })
}

//Проверка валидации инпутов
function checkInputValidation(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else  {
    hideInputError(formElement, inputElement);
  }
}

//Показать ошибку
function showInputError(formElement, inputElement, errorMessage){
  const errorElem = formElement.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = errorMessage;
  inputElement.classList.add('form__input_type_error');
  errorElem.classList.add('.form__input-error_active');
}

//Скрыть ошибку
function hideInputError(formElement, inputElement) {
  const errorElem = formElement.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = '';
  inputElement.classList.remove('form__input_type_error');
  errorElem.classList.remove('.form__input-error_active');
}

enableValidation();