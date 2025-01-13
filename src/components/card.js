import { openModal } from "./modal";
function createCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
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

    return cardElement;
}

export { createCard };