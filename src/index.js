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
import { initialCards } from './cards.js';
import { showInputError, hideInputError, hidePopupInputErrors, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from './components/validate.js';
import { createCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
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

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    enableValidation(validationSettings);
    openModal(profilePopup);
    document.addEventListener('keydown', closeByEsc); 
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
    hidePopupInputErrors(profilePopup, validationSettings);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(profilePopup);
    document.removeEventListener('keydown', closeByEsc); 
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
    const cardElement = createCard(cardNameInput.value, urlInput.value);
    placesList.prepend(cardElement);
    closeModal(cardPopup);
    hidePopupInputErrors(cardPopup, validationSettings);
    document.removeEventListener('keydown', closeByEsc); 
}
cardFormElement.addEventListener('submit', handleCardFormSubmit); 

imagePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(imagePopup);
    document.removeEventListener('keydown', closeByEsc); 
});

initialCards.forEach((item) => {
    const cardItem = createCard(item.name, item.link);
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardItem.querySelector('.card__like-button').addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    cardDeleteButton.addEventListener('click', () => {
        const cardDeleteElement = cardDeleteButton.closest('.places__item');
        cardDeleteElement.remove(); 
    });

    cardImage.addEventListener('click', () => {
        openModal(imagePopup);
        document.addEventListener('keydown', closeByEsc); 
        imageElement.src = cardImage.src;
        imageCaption.textContent = cardTitle.textContent;
    });

    placesList.append(cardItem);
});

  enableValidation(validationSettings);

  profilePopup.classList.add('popup_is-animated');
  imagePopup.classList.add('popup_is-animated');
  cardPopup.classList.add('popup_is-animated');

  profileFormElement.addEventListener('submit', handleProfileFormSubmit); 