//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');   
  document.addEventListener('keydown', pressEsc);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', pressEsc)
}

//Функция закрытия попапа по ESC
function pressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup)
      closePopup(openedPopup);
  }
}

export {openPopup, closePopup}