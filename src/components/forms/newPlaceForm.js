import { createCard, deleteCard, tapOnLikeBtn } from "../card";
import { closeModal } from "../modal";

const newCardFormElement = document.forms["new-place"];

const addNewCard = (cards) => {
  event.preventDefault();
  const newCard = {};

  newCard.name = newCardFormElement.elements["place-name"].value;
  newCard.link = newCardFormElement.elements.link.value;
  closeModal();
  newCardFormElement.reset();
  cards.insertAdjacentElement(
    "afterbegin",
    createCard(newCard, deleteCard, tapOnLikeBtn),
  );
};

export { newCardFormElement, addNewCard };
