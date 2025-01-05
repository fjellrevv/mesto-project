const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const cardName = document.querySelector('.card__title');
const cardUrl = document.querySelector('.card__description');
const placesList = document.querySelector('.places__list');

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

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
} 

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
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
    openModal(profilePopup);
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(profilePopup);
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
    imageElement.src = '';
    imageCaption.textContent = '';
});

initialCards.forEach((item) => {
    const cardItem = createCard(item.name, item.link);
    placesList.append(cardItem);
});

profilePopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');