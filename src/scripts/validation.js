const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//Проходим по всем формам
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElem)=> {
    formElem.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    });
    setEventListener(settings ,formElem)
  })
}
  
  //Слушатель на каждый инпут
function setEventListener(settings ,formElem) {
  const inputList = Array.from(formElem.querySelectorAll(settings.inputSelector));
  const buttonElement = formElem.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((input)=> {
    input.addEventListener('input', ()=> {
      checkInputValidation(formElem, input, settings);
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
}
  
//Проверка валидации инпутов
function checkInputValidation(formElement, inputElement, settings) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error)
  } else{
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings)
  } else  {
    hideInputError(formElement, inputElement, settings);
  }
}
  
  //Показать ошибку
function showInputError(formElement, inputElement, errorMessage, settings){
  const errorElem = formElement.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
  errorElem.classList.add(settings.errorClass);
}
  
  //Скрыть ошибку
function hideInputError(formElement, inputElement, settings) {
  const errorElem = formElement.querySelector(`.${inputElement.id}-error`);
  errorElem.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
  errorElem.classList.remove(settings.errorClass);
}


//Блокировка кнопки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)){
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

// function clearValidation(profileForm, validationConfig) {

// }


  
enableValidation(validationConfig);

export {validationConfig, enableValidation, setEventListener, checkInputValidation, showInputError, hideInputError}