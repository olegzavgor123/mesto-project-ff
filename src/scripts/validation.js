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
    const buttonElement = formElem.querySelector('.button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((input)=> {
      input.addEventListener('input', ()=> {
        checkInputValidation(formElem, input);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }
  
  //Проверка валидации инпутов
  function checkInputValidation(formElement, inputElement) {
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.error)
    } else{
      inputElement.setCustomValidity("");
    }
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

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }

  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)){
        buttonElement.disabled = true;
        buttonElement.classList.add('button_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('button_inactive');
    }
  }
  
  enableValidation();
  export {enableValidation, setEventListener, checkInputValidation, showInputError, hideInputError}