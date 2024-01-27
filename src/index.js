// Imports
import "./pages/index.css";
import {
  createCard,
  renderCard,
  deleteCard,
  tapOnLikeBtn,
} from "./components/card";
import { initialCards } from "./scripts/cards";
import {
  createImagePopup,
  openModal,
  closeModal,
  closeModalOnOverlayClick,
  closeModalOnEscKeydown,
} from "./components/modal";
import {
  editFormElement,
  setInitialFormValue,
  handleFormSubmit,
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

const popupTypeImage = document.querySelector(".popup_type_image");

const popupCloseBtn = document.querySelectorAll(".popup__close");

popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeImage.classList.add("popup_is-animated");

// Add card
initialCards.forEach((card) => {
  renderCard(createCard(card, deleteCard, tapOnLikeBtn), cardContainer);
});
const cardImage = document.querySelectorAll(".card__image");
// Forms
editFormElement.addEventListener("submit", handleFormSubmit);
newCardFormElement.addEventListener("submit", () => addNewCard(cardContainer));
// Modal listeners
profileEditBtn.addEventListener("click", () => {
  setInitialFormValue();
  openModal(popupTypeEdit);

  document.addEventListener("click", () => {
    closeModalOnOverlayClick();
  });

  document.addEventListener("keydown", () => {
    closeModalOnEscKeydown();
  });
});

addBtn.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

cardImage.forEach((image) => {
  image.addEventListener("click", () => {
    createImagePopup(popupTypeImage);
  });
});

popupCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal();
  });
});
