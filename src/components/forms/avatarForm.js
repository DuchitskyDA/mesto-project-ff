import { closeModal } from "../modal";
import { newAvatarRequest } from "../api.js";
import { setUserData } from "../../index.js";

export const avatarFormElement = document.forms["avatar"];

export const setNewAvatar = (event) => {
  newAvatarRequest(avatarFormElement.avatarLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      avatarFormElement.querySelector(".popup__button").textContent =
        "Сохранить";
      closeModal(event.target.closest(".popup_is-opened"));
      avatarFormElement.reset();
      return setUserData(res);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};

export const avatarFormSubmit = (event) => {
  avatarFormElement.querySelector(".popup__button").textContent =
    "Сохранение...";
  event.preventDefault();
  setNewAvatar(event);
};
