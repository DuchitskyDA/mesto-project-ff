import { createCard, deleteCard, tapOnLikeBtn } from "../card";
import { closeModal, createImagePopup } from "../modal";

const newCardFormElement = document.forms["new-place"];

const addNewCard = (event, cards) => {
  event.preventDefault();
  const newCard = {
    name: newCardFormElement.elements["place-name"].value,
    link: newCardFormElement.elements.link.value,
  };
  closeModal(event.target.closest(".popup_is-opened"));
  newCardFormElement.reset();
  cards.insertAdjacentElement(
    "afterbegin",
    createCard(newCard, deleteCard, tapOnLikeBtn, createImagePopup),
  );
};

export { newCardFormElement, addNewCard };
