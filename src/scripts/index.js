import { createCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
import {enableValidation, validationConfig, clearValidation} from './validation.js'
import { patchProfile, USERS_CARDS, postCard, getUserInfo, PatchProfileImage } from './api.js'
import '../pages/index.css';

const container = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');

//Кнопка редактирования аватара
const profileImageEditButton = document.querySelector('.profile__image-edit-button');

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
  userName.textContent = nameInput.value;
  userDesc.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value, editForm.elements.button)
}

editForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(editPopup);
})

//Открытие попапа редактирования аватарки и её patch
profileImageEditButton.addEventListener('click', () => {
  const editImageProfieForm = document.forms.editImageProfile;
  openPopup(popupProfileImageEdit);
  editImageProfieForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    profileImage.style.backgroundImage = `url(${editImageProfieForm.elements.link.value})`;
    PatchProfileImage(editImageProfieForm.elements.link.value, editImageProfieForm.elements.button);
    closePopup(popupProfileImageEdit);
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
  // evt.preventDefault();
  const nameCard = addCardForm.elements.placename.value;
  const link = addCardForm.elements.link.value;
  postCard(nameCard, link, addCardForm.elements.button);
  // container.prepend(createCard(nameCard, link, '', deleteCard, likeCard, openPopImage))
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
//Валидация всех форм
enableValidation(validationConfig);
//API

Promise.all([
  USERS_CARDS(), 
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
      cardId: card._id,
      deleteCard,
      likeCard,
      openPopImage
    }));
  })

  profileImage.style.backgroundImage = `url(${myData.avatar})`;
  userName.textContent = myData.name;
  userDesc.textContent = myData.about;
  console.log(myData)
})
.catch((err) => {
  console.error(err)
})

//Лоадер
function loader(button, isLoading) {
  if (isLoading)
    button.textContent = 'Сохранение...';
  else
    button.textContent = 'Сохранить';
}

export {USERS_CARDS, loader}