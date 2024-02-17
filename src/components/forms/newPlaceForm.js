import { closeModal } from "../modal";
import {
  createImagePopup,
  cardContainer,
  userData,
  newCardFormBtn,
  popupTypeNewCard,
} from "../../index.js";
import { createCard, deleteCard, tapOnLikeBtn } from "../card.js";
import { postNewCardRequest } from "../api.js";
export const newCardFormElement = document.forms["new-place"];

export const addNewCard = (event, cards) => {
  newCardFormBtn.textContent = "Сохранение...";
  const newCard = {
    name: newCardFormElement.elements["place-name"].value,
    link: newCardFormElement.elements.link.value,
  };
  event.preventDefault();

  postNewCardRequest(newCard)
    .then((card) => {
      cards.insertAdjacentElement(
        "afterbegin",
        createCard(userData, card, deleteCard, tapOnLikeBtn, createImagePopup),
        cardContainer
      );
      closeModal(popupTypeNewCard);
      newCardFormElement.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => (newCardFormBtn.textContent = "Сохранить"));
};
