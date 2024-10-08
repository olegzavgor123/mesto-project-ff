

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
  inputElement.setCustomValidity("");
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


//Очистка ошибок и инпутов
function clearValidation(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  })
  toggleButtonState(inputList, buttonElement, settings);
}

export {clearValidation, enableValidation}