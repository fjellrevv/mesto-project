const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const cardName = document.querySelector('.card__title');
const cardUrl = document.querySelector('.card__description');
const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };

  const hidePopupInputErrors = (popupElement) => {
    const formList = Array.from(popupElement.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
        });
    });
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc); 
} 

function closeByEsc(evt) {     
    if (evt.key === 'Escape') {       
        const openedPopup = document.querySelector('.popup_is-opened');       
        closeModal(openedPopup);      
    }
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc); 
} 

function createCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardName;
    cardImage.src = cardLink;
    cardImage.alt = cardName;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    cardDeleteButton.addEventListener('click', () => {
        const cardDeleteElement = cardDeleteButton.closest('.places__item');
        cardDeleteElement.remove(); 
    });

    cardImage.addEventListener('click', () => {
        openModal(imagePopup);
        imageElement.src = cardImage.src;
        imageCaption.textContent = cardTitle.textContent;
    });

    return cardElement;
}

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    enableValidation();
    openModal(profilePopup);
});

popupList.forEach(popupItem => {
    popupItem.addEventListener('click', function (evt) {
        console.log(evt.target);
        if (evt.target.classList.contains('popup')) {
            closeModal(popupItem);
            hidePopupInputErrors(popupItem);
        }
    }); 
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(profilePopup);
    hidePopupInputErrors(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(cardPopup);
});

cardPopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(cardPopup);
    cardNameInput.value = ''; urlInput.value = '';
    hidePopupInputErrors(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(cardNameInput.value, urlInput.value);
    placesList.prepend(cardElement);
    closeModal(cardPopup);
    cardNameInput.value = ''; urlInput.value = '';
}
cardFormElement.addEventListener('submit', handleCardFormSubmit); 

imagePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(imagePopup);
});

initialCards.forEach((item) => {
    const cardItem = createCard(item.name, item.link);
    placesList.append(cardItem);
});

profilePopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_inactive');
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove('popup__button_inactive');
      buttonElement.removeAttribute('disabled', '');
    }
};    

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };


  enableValidation();