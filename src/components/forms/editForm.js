import { closeModal } from "../modal";

const editFormElement = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const setInitialEditProfileFormValues = () => {
  editFormElement.elements.name.value = profileName.textContent;
  editFormElement.elements.description.value = profileDescription.textContent;
};

const handleEditFormSubmit = (event) => {
  event.preventDefault();

  profileName.textContent = editFormElement.elements.name.value;
  profileDescription.textContent = editFormElement.elements.description.value;
  closeModal(event.target.closest(".popup_is-opened"));

  editFormElement.reset();
};

export {
  editFormElement,
  setInitialEditProfileFormValues,
  handleEditFormSubmit,
};
