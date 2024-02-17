import {
  profileName,
  editFormBtn,
  profileDescription,
  refreshUserData,
} from "../../index";

export const editFormElement = document.forms["edit-profile"];

export const setInitialEditProfileFormValues = () => {
  editFormElement.elements.name.value = profileName.textContent;
  editFormElement.elements.description.value = profileDescription.textContent;
};

export const handleEditFormSubmit = (event) => {
  editFormBtn.textContent = "Сохранение...";
  event.preventDefault();
  refreshUserData();
};
