import { createCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import { patchProfile, getUsersCards, postCard, getUserInfo, patchProfileImage } from './api.js'
import '../pages/index.css';

const container = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');

//Кнопка редактирования аватара
const profileImageEditButton = document.querySelector('.profile__image-edit-button');
//Форма
const editImageProfieForm = document.forms.editImageProfile;


const profileImage = document.querySelector('.profile__image');
const popupProfileImageEdit = document.querySelector('.popup_type_avatar');

//Имя и описание по умолчанию
const userName = document.querySelector('.profile__title');
const userDesc = document.querySelector('.profile__description');

//Форма редактирования профиля
const editForm = document.forms.editprofile;

const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;



//6 sprint
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');


//Загрузка аватара, имени и описания с сервера

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
  clearValidation(editForm, validationConfig)
  openPopup(editPopup)
});


//Редактирование кнопкой сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  patchProfile(nameInput.value, jobInput.value)
  .then((data) => {
    userName.textContent = data.name;
    userDesc.textContent = data.about;
    closePopup(editPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    editForm.elements.button.textContent = 'Сохранить'
  })
}

editForm.addEventListener('submit', (evt) => {
  editForm.elements.button.textContent = 'Сохранение...'
  handleProfileFormSubmit(evt);
})

//Открытие попапа редактирования аватарки и её patch
profileImageEditButton.addEventListener('click', () => {
  openPopup(popupProfileImageEdit);
})

editImageProfieForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  editImageProfieForm.elements.button.textContent = 'Сохранение...'
  patchProfileImage(editImageProfieForm.elements.link.value)
  .then(() => {
    profileImage.style.backgroundImage = `url(${editImageProfieForm.elements.link.value})`;
    closePopup(popupProfileImageEdit);
  })
  .finally(() => {
    editImageProfieForm.elements.button.textContent = 'Сохранить'
  })
})

//Открытие формы добавления карточки
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.newplace;
addButton.addEventListener('click', () => {
  newCardForm.elements.placename.value = '';
  newCardForm.elements.link.value = '';
  clearValidation(newCardForm, validationConfig)
  openPopup(popupNewCard);
})


//Добавление карточки
const addCardForm = document.forms.newplace;

addCardForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const nameCard = addCardForm.elements.placename.value;
  const link = addCardForm.elements.link.value;
  addCardForm.elements.button.textContent = 'Сохранение...'
  postCard(nameCard, link)
  .then((data) => {
    container.prepend(createCard({
      name: data.name,
      link: data.link,
      alt: data.name,
      likeCounter: data.likes.length,
      userId: data.owner._id,
      myData: data.owner,
      cardId: data._id,
      deleteCard,
      likeCard,
      openPopImage
    }));
    closePopup(popupNewCard);
  })
  .finally(() => {
    addCardForm.elements.button.textContent = 'Сохранить'
  })
})

//Попап картинки
function openPopImage(link, desc){
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__caption').textContent = desc;
  popupTypeImage.querySelector('.popup__image').alt = desc;
  openPopup(popupTypeImage);
}



//7 sprint
//Валидация всех форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);


//API
Promise.all([
  getUsersCards(), 
  getUserInfo()
]).then(([cards, myData]) => {
  cards.forEach((card) => {
    container.append(createCard({
      name: card.name,
      link: card.link,
      alt: card.name,
      likeCounter: card.likes.length,
      userId: card.owner._id,
      myData,
      dataLikes: card.likes,
      cardId: card._id,
      deleteCard,
      likeCard,
      openPopImage
    }));
  })
  profileImage.style.backgroundImage = `url(${myData.avatar})`;
  userName.textContent = myData.name;
  userDesc.textContent = myData.about;
})
.catch((err) => {
  console.error(err)
})
