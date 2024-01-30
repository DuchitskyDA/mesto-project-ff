const createImagePopup = (event) => {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImage.src = event.target.src;
  popupCaption.textContent = event.target.alt;
};

const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEscKeydown);
  document.addEventListener("click", closeModalOnOverlayClick);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscKeydown);
  document.removeEventListener("click", closeModalOnOverlayClick);
};

const closeModalOnOverlayClick = (event) => {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
};

const closeModalOnEscKeydown = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export {
  createImagePopup,
  openModal,
  closeModal,
  closeModalOnOverlayClick,
  closeModalOnEscKeydown,
};
