export const openModal = (popup) => {  
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEscKeydown);
  document.addEventListener("click", closeModalOnOverlayClick);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscKeydown);
  document.removeEventListener("click", closeModalOnOverlayClick);
};

export const closeModalOnOverlayClick = (event) => {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
};

export const closeModalOnEscKeydown = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};
