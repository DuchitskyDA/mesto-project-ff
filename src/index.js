// Imports
import "./pages/index.css";
import {
    createCard,
    renderCard,
    deleteCard,
    tapOnLikeBtn,
} from "./components/card";
import {initialCards} from "./scripts/cards";
import {openModal, closeModal} from "./components/modal";
import {
    editFormElement,
    setInitialEditProfileFormValues,
    handleEditFormSubmit,
} from "./components/forms/editForm";
import {
    newCardFormElement,
    addNewCard,
} from "./components/forms/newPlaceForm";

// Constants
const cardContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseBtn = document.querySelectorAll(".popup__close");
const popupTypeImage = document.querySelector(".popup_type_image");

popupTypeImage.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");

export const createImagePopup = (e) => {
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupImage.src = e.target.src;
    popupCaption.textContent = e.target.alt;
    openModal(popupTypeImage);
};

// Add card
initialCards.forEach((card) => {
    renderCard(
        createCard(card, deleteCard, tapOnLikeBtn, createImagePopup),
        cardContainer,
    );
});

// Forms
editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardFormElement.addEventListener("submit", (event) =>
    addNewCard(event, cardContainer),
);
// Modal listeners

profileEditBtn.addEventListener("click", () => {
    setInitialEditProfileFormValues();
    openModal(popupTypeEdit);
});


addBtn.addEventListener("click", () => {
    openModal(popupTypeNewCard);
});

popupCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        closeModal(btn.closest(".popup"));
    });
});
