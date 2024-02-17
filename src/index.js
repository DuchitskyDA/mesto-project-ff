// Imports
import "./pages/index.css";

import { createCard, deleteCard, tapOnLikeBtn } from "./components/card";

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

import {
  getUserData,
  getCards,
  newAvatarRequest,
  patchUserData,
} from "./components/api";

// Constants
export const cardContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const avatarEditBtn = document.querySelector(".profile__image");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupImage = document.querySelector(".popup__image");
const formElement = popupTypeEdit.querySelector(".popup__form");
const popupCaption = document.querySelector(".popup__caption");

// Buttons
export const editFormBtn = editFormElement.querySelector(".popup__button");
export const avatarFormBtn = avatarFormElement.querySelector(".popup__button");
export const newCardFormBtn =
  newCardFormElement.querySelector(".popup__button");

const userAvatar = document.querySelector(".profile__image");
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");

export const renderCard = (card, cardContainer) => cardContainer.append(card);

export let userData = {};
// Animation
popupTypeImage.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");

export const createImagePopup = (e) => {
  popupImage.src = e.target.src;
  popupCaption.textContent = e.target.alt;
  popupImage.alt = e.target.alt;
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
  clearValidation(formElement, {
    inputSelector: ".popup__input",
    inactiveButtonClass: "popup__button_disabled", // есть
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active",
  });
  openModal(popupTypeAvatar);
});

addBtn.addEventListener("click", () => {
  clearValidation(formElement, {
    inputSelector: ".popup__input",
    inactiveButtonClass: "popup__button_disabled", // есть
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active",
  });
  openModal(popupTypeNewCard);
});

popupCloseBtns.forEach((btn) => {
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
  userData = { _id: data._id };
};

export const setNewAvatar = () => {
  newAvatarRequest(avatarFormElement.avatarLink.value)
    .then((res) => {
      closeModal(popupTypeAvatar);
      avatarFormElement.reset();
      return setUserData(res);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => (avatarFormBtn.textContent = "Сохранить"));
};

export const refreshUserData = () => {
  patchUserData(
    editFormElement.elements.name.value,
    editFormElement.elements.description.value
  )
    .then((userData) => {
      closeModal(popupTypeEdit);
      editFormElement.reset();
      setUserData(userData);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => (editFormBtn.textContent = "Сохранить"));
};

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    setUserData(userData);
    setCards(cards);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
