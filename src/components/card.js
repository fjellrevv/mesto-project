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

export { createCard };