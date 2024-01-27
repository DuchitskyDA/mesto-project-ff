const createCard = (cardData, deleteCard, tapOnLikeBtn) => {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  // Во входных данных нет alt у картинок, так что будет name, но когда появится alt, то будет alt
  cardImage.alt = cardData.alt || cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener("click", (e) => deleteCard(e));
  likeBtn.addEventListener("click", tapOnLikeBtn);

  return card;
};

const renderCard = (card, cardContainer) => cardContainer.append(card);

const deleteCard = (e) => e.target.closest("li").remove();

const tapOnLikeBtn = () => {
  event.target.classList.toggle("card__like-button_is-active");
};

export { createCard, renderCard, deleteCard, tapOnLikeBtn };
