import { deleteCard, putLike, deleteLike  } from "./api.js";
function createCard(cardName, cardLink, cardLikeNumber = 0, ownerID, userID, cardID) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardTitle.textContent = cardName;
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardLikeCount.textContent = cardLikeNumber;
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => {
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            deleteLike(cardID)
            .then(data => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                cardLikeCount.textContent = data.likes.length;
            });
        }
        else {
            cardLikeButton.classList.add('card__like-button_is-active');
            putLike(cardID)
            .then(data => {
                cardLikeButton.classList.add('card__like-button_is-active');
                cardLikeCount.textContent = data.likes.length;
            });
        };

    });
    if(ownerID != userID) {
        cardDeleteButton.style.display = "none";
    }
    else {
        cardDeleteButton.addEventListener('click', () => {
            const cardDeleteElement = cardDeleteButton.closest('.places__item');
            cardDeleteElement.remove();
            deleteCard(cardID);   
    });
    }
    return cardElement;
}

export { createCard };