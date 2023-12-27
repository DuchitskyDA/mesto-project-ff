const cardContainer = document.querySelector(".places__list");

const createCard = (cardData, deleteCard) => {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.src = cardData.link;
  // Во входных данных нет alt у картинок, так что будет name, но когда появится alt, то будет alt
  cardImage.alt = cardData.alt || cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", (e) => deleteCard(e));

  return card;
};

const renderCard = (card) => cardContainer.append(card);

const deleteCard = (e) => e.target.closest("li").remove();

initialCards.forEach((card) => renderCard(createCard(card, deleteCard)));
