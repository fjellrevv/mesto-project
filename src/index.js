import addIcon from './images/add-icon.svg';
import avatar from './images/avatar.jpg';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import close from './images/close.svg';
import deleteIcon from './images/delete-icon.svg';
import editIcon from './images/edit-icon.svg';
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';
import logo from './images/logo.svg';

import './pages/index.css';
import { hidePopupInputErrors, enableValidation, toggleButtonState } from './components/validate.js';
import { createCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard, updateUserImage } from './components/api.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const userImage = document.querySelector('.profile__image');

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');

const profileImagePopup = document.querySelector('.popup_type_profile-image');
const profileImageFormElement = profileImagePopup.querySelector('.popup__form');
const profileImageInput = profileImageFormElement.querySelector('.popup__input_type_url');
const userImageButton = document.querySelector('.profile__image_edit-button');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const aboutInput = profileFormElement.querySelector('.popup__input_type_description');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
let userID = '';

function renderLoading(isLoading, currentPopup) {
    const submitButton = currentPopup.querySelector('.popup__button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...';
    }
    else {
        submitButton.textContent = 'Сохранить';
    }
}

// блокирование кнопки без привязки к конкретному инпуту
function resetButtonState(buttonElement, isBlocked) {
    if (!isBlocked) {
          buttonElement.classList.add(validationSettings.inactiveButtonClass);
          buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
    }
}

function openImagePopup(cardElement) {
    openModal(imagePopup);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    document.addEventListener('keydown', closeByEsc); 
    imageElement.src = cardImage.src;
    imageCaption.textContent = cardTitle.textContent;
}

userImage.addEventListener('mouseover', () => {
    userImageButton.classList.add('profile__image_edit-button_active');
});

userImage.addEventListener('mouseout', () => {
    userImageButton.classList.remove('profile__image_edit-button_active');
});

userImageButton.addEventListener('click', () => {
    openModal(profileImagePopup);
    document.addEventListener('keydown', closeByEsc); 
});

profileImagePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(profileImagePopup);
    document.removeEventListener('keydown', closeByEsc); 
    hidePopupInputErrors(profileImagePopup, validationSettings);
});

function handleProfileImageFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, profileImagePopup);
    updateUserImage(profileImageInput.value)
    .then(data => {
        userImage.style.backgroundImage = `url("${data.avatar}")`;
    })
    .then(() => {
        closeModal(profileImagePopup);
        document.removeEventListener('keydown', closeByEsc); 
        resetButtonState(profileImagePopup.querySelector('.popup__button'), false);
    })
    .catch(err => {
        console.log(err); 
    }) 
    .finally(() => {
        renderLoading(false, profileImagePopup);
    });
}

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    function setNames() {
        nameInput.value = userName.textContent;
        aboutInput.value = userAbout.textContent;
    };  
    setNames();
    openModal(profilePopup);
    document.addEventListener('keydown', closeByEsc); 
    resetButtonState(profilePopup.querySelector('.popup__button'), true);
});

popupList.forEach(popupItem => {
    popupItem.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closeModal(popupItem);
            document.removeEventListener('keydown', closeByEsc); 
            hidePopupInputErrors(popupItem, validationSettings);
        }
    }); 
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(profilePopup);
    document.removeEventListener('keydown', closeByEsc); 
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, profilePopup);
    updateUserInfo(nameInput.value, aboutInput.value)
    .then(res => {
        userName.textContent = res.name;
        userAbout.textContent = res.about;
        closeModal(profilePopup);
        document.removeEventListener('keydown', closeByEsc); 
        resetButtonState(profilePopup.querySelector('.popup__button'), false);
    })
    .catch(err => {
        console.log(err); 
    })
    .finally(() => {
        renderLoading(false, profilePopup);
    });
}

function closeByEsc(evt) {     
    if (evt.key === 'Escape') {       
        const openedPopup = document.querySelector('.popup_is-opened');       
        closeModal(openedPopup);    
        document.removeEventListener('keydown', closeByEsc); 
        hidePopupInputErrors(openedPopup, validationSettings);
    }
}

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(cardPopup);
    document.addEventListener('keydown', closeByEsc); 
});

cardPopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(cardPopup);
    document.removeEventListener('keydown', closeByEsc); 
    hidePopupInputErrors(cardPopup, validationSettings);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, cardPopup);
    addNewCard(cardNameInput.value, urlInput.value)
    .then(res => {
        const cardElement = createCard(res.name, res.link, 0, res.owner._id, userID, res._id);
        const cardImage = cardElement.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            openImagePopup(cardElement);
        });
        placesList.prepend(cardElement);
        closeModal(cardPopup);
        hidePopupInputErrors(cardPopup, validationSettings);
        document.removeEventListener('keydown', closeByEsc); 
        resetButtonState(cardPopup.querySelector('.popup__button'), false);
    })
    .catch(err => {
        console.log(err); 
    })
    .finally(() => {
        renderLoading(false, cardPopup);
    });
}

imagePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(imagePopup);
    document.removeEventListener('keydown', closeByEsc); 
    hidePopupInputErrors(imagePopup, validationSettings);
});
  
Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cardsData]) => {
    userName.textContent = userData.name;
    userAbout.textContent = userData.about;
    userImage.style.backgroundImage = `url("${userData.avatar}")`;
    userID = userData._id;
    cardsData.forEach(item => {
        const cardItem = createCard(item.name, item.link, item.likes.length, item.owner._id, userID, item._id);
        const cardImage = cardItem.querySelector('.card__image');
        const cardLikeButton = cardItem.querySelector('.card__like-button');
        for (let like = 0; like < item.likes.length; like++) {
            if (item.likes[like]._id === userID) {
                cardLikeButton.classList.add('card__like-button_is-active');
                break;
            }
        }
        cardImage.addEventListener('click', () => {
            openImagePopup(cardItem);
        });
        placesList.append(cardItem);
    });
})
.catch(err => {
    console.error(err)
});

enableValidation(validationSettings);

profilePopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
profileImagePopup.classList.add('popup_is-animated');

cardFormElement.addEventListener('submit', handleCardFormSubmit); 
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
profileImageFormElement.addEventListener('submit', handleProfileImageFormSubmit); 