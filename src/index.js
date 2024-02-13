// Imports
import "./pages/index.css";

import {
  createCard,
  renderCard,
  deleteCard,
  tapOnLikeBtn,
} from "./components/card";

import { openModal, closeModal } from "./components/modal";

import {
  editFormElement,
  setInitialEditProfileFormValues,
  handleEditFormSubmit,
} from "./components/forms/editForm";

import {
  newCardFormElement,
  addNewCard,
} from "./components/forms/newPlaceForm";

import {
  clearValidation,
  enableValidation,
} from "./components/forms/validation";

import {
  avatarFormElement,
  avatarFormSubmit,
} from "./components/forms/avatarForm";

import { getUserData, getCards } from "./components/api";

// Constants
export const cardContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const avatarEditBtn = document.querySelector(".profile__image");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseBtn = document.querySelectorAll(".popup__close");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const userAvatar = document.querySelector(".profile__image");
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");

export let userData = {};
// Animation
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

// Forms
editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardFormElement.addEventListener("submit", (event) =>
  addNewCard(event, cardContainer)
);
avatarFormElement.addEventListener("submit", avatarFormSubmit);
// Modal listeners

profileEditBtn.addEventListener("click", () => {
  const formElement = popupTypeEdit.querySelector(".popup__form");
  clearValidation(formElement, {
    inputSelector: ".popup__input",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active",
  });
  setInitialEditProfileFormValues();
  openModal(popupTypeEdit);
});

avatarEditBtn.addEventListener("click", () => {
  const formElement = popupTypeAvatar.querySelector(".popup__form");
  clearValidation(formElement, {
    inputSelector: ".popup__input",
    inactiveButtonClass: "popup__button_disabled", // есть
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active",
  });
  openModal(popupTypeAvatar);
});

addBtn.addEventListener("click", () => {
  const formElement = popupTypeNewCard.querySelector(".popup__form");
  clearValidation(formElement, {
    inputSelector: ".popup__input",
    inactiveButtonClass: "popup__button_disabled", // есть
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active",
  });
  openModal(popupTypeNewCard);
});

popupCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(btn.closest(".popup"));
  });
});

// Валидация формы
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active",
});

export const setCards = (cards) => {
  cards.forEach((card) => {
    renderCard(
      createCard(userData, card, deleteCard, tapOnLikeBtn, createImagePopup),
      cardContainer
    );
  });
};

export const setUserData = (data) => {
  userAvatar.setAttribute("style", `background-image: url('${data.avatar}')`);
  userName.textContent = data.name;
  userDescription.textContent = data.about;
  userData = JSON.parse(JSON.stringify(data));
};

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    setUserData(userData);
    setCards(cards);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
