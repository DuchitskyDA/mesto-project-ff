import { setNewAvatar, avatarFormBtn } from "../../index.js";

export const avatarFormElement = document.forms["avatar"];

export const avatarFormSubmit = (event) => {
  avatarFormBtn.textContent = "Сохранение...";
  event.preventDefault();
  setNewAvatar(event);
};
