import { deleteCardRequest, removeLikeRequest, addLikeRequest } from "./api";

export const createCard = (
  userData,
  cardData,
  deleteCard,
  tapOnLikeBtn,
  createImagePopup
) => {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikes = card.querySelector(".card__like-counter");
  const cardId = cardData.owner._id;

  cardLikes.innerText = cardData.likes.length;
  cardImage.src = cardData.link;

  cardIsLiked(cardData.likes, userData._id)
    ? likeBtn.classList.add("card__like-button_is-active")
    : "";
  if (cardId !== userData._id) cardDeleteButton.remove();

  cardImage.alt = cardData.alt || cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener("click", (e) => {
    deleteCardRequest(cardData._id)
      .then(() => deleteCard(e))
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  });

  likeBtn.addEventListener("click", (event) =>
    tapOnLikeBtn(event, cardData, cardLikes)
  );

  cardImage.addEventListener("click", (e) => createImagePopup(e));

  return card;
};

export const deleteCard = (e) => {
  e.target.closest(".card").remove();
};

const cardIsLiked = (likes, userId) => {
  if (likes.length) {
    return likes.find((like) => like._id === userId) ? true : false;
  }
};

export const tapOnLikeBtn = (event, cardData, cardLikes) => {
  if (event.target.classList.contains("card__like-button_is-active")) {
    removeLikeRequest(cardData._id)
      .then((res) => {
        event.target.classList.toggle("card__like-button_is-active");
        cardLikes.innerText = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    addLikeRequest(cardData._id)
      .then((res) => {
        event.target.classList.toggle("card__like-button_is-active");
        cardLikes.innerText = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
};
