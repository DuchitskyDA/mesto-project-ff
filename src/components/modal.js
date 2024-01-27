const createImagePopup = (image) => {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImage.src = event.target.src;
  popupCaption.textContent = event.target.alt;
  openModal(image);
};

const openModal = (popup) => popup.classList.add("popup_is-opened");

const closeModal = (popup) =>
  event.target.closest(".popup_is-opened").classList.remove("popup_is-opened");

const closeModalOnOverlayClick = () => {
  if (event.target.classList.contains("popup_is-opened")) {
    document.removeEventListener("click", closeModalOnOverlayClick);
    closeModal();
  }
};

const closeModalOnEscKeydown = () => {
  if (event.key === "Escape") {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((item) => {
      item.classList.remove("popup_is-opened");
    });
    document.removeEventListener("click", closeModalOnEscKeydown);
  }
};

export {
  createImagePopup,
  openModal,
  closeModal,
  closeModalOnOverlayClick,
  closeModalOnEscKeydown,
};
