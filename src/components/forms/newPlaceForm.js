import { closeModal } from "../modal";
import { createImagePopup, cardContainer, userData } from "../../index.js";
import { createCard, deleteCard, tapOnLikeBtn } from "../card.js";
import { postNewCardRequest } from "../api.js";
export const newCardFormElement = document.forms["new-place"];

export const addNewCard = (event, cards) => {
  newCardFormElement.querySelector(".popup__button").textContent =
    "Сохранение...";
  const newCard = {
    name: newCardFormElement.elements["place-name"].value,
    link: newCardFormElement.elements.link.value,
  };
  event.preventDefault();

  postNewCardRequest(newCard)
    .then((res) => {
      if (res.ok) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((card) => {
      newCardFormElement.querySelector(".popup__button").textContent =
        "Сохранить";
      cards.insertAdjacentElement(
        "afterbegin",
        createCard(userData, card, deleteCard, tapOnLikeBtn, createImagePopup),
        cardContainer
      );
      closeModal(event.target.closest(".popup_is-opened"));
      newCardFormElement.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};
