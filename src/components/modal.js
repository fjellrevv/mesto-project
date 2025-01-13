function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
} 

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
} 

export { closeModal, openModal };