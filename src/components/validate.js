const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  // функция обходит список всех форм попапа на случай расширения функциональности
  const hidePopupInputErrors = (popupElement, settings) => {
    const formList = Array.from(popupElement.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, settings);
            inputElement.value = '';
        });
    });
};

const isValidURL = url => {
  const urlRegex = new RegExp(
  /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/i
);
return urlRegex.test(url);
}

const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid || (inputElement.type === "url" && !isValidURL(inputElement.value))) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

const hasInvalidInput = (inputList) => {
    if (Array.isArray(inputList)) {
      return inputList.some((inputElement) => {
        return (!inputElement.validity.valid || ((inputElement.type === "url") && !isValidURL(inputElement.value)));
      })
    }
    else {
      if (inputElement.type === "url") return !isValidURL(inputElement.value);
      return !inputList.validity.valid;
    }
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', '');
    }
};    

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  };

  export { isValidURL, showInputError, hideInputError, hidePopupInputErrors, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation };