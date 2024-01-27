import { closeModal } from "../modal";

const editFormElement = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const setInitialFormValue = () => {
  editFormElement.elements.name.value = profileName.textContent;
  editFormElement.elements.description.value = profileDescription.textContent;
};

const handleFormSubmit = () => {
  event.preventDefault();

  profileName.textContent = editFormElement.elements.name.value;
  profileDescription.textContent = editFormElement.elements.description.value;
  closeModal();

  editFormElement.reset();
};

export { editFormElement, setInitialFormValue, handleFormSubmit };
