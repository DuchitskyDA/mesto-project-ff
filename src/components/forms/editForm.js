import { closeModal } from "../modal";
import { patchUserData } from "../api";
import { setUserData } from "../../index";

export const editFormElement = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

export const setInitialEditProfileFormValues = () => {
  editFormElement.elements.name.value = profileName.textContent;
  editFormElement.elements.description.value = profileDescription.textContent;
};

const refreshUserData = (event) => {
  patchUserData(
    editFormElement.elements.name.value,
    editFormElement.elements.description.value
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((userData) => {
      editFormElement.querySelector(".popup__button").textContent = "Сохранить";
      closeModal(event.target.closest(".popup_is-opened"));
      editFormElement.reset();
      return setUserData(userData);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};

export const handleEditFormSubmit = (event) => {
  editFormElement.querySelector(".popup__button").textContent = "Сохранение...";
  event.preventDefault();
  refreshUserData(event);
};
