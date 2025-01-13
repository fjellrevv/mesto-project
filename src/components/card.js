import { openModal } from "./modal";
function createCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardName;
    cardImage.src = cardLink;
    cardImage.alt = cardName;

    return cardElement;
}

export { createCard };