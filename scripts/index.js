const cardContainer = document.querySelector(".places__list");

// Создаем карточки
const createCard = (initialCards, deleteCard) => {
  const template = document.querySelector("#card-template").content;

  // Проходимся по входному массиву
  const cardTemplate = initialCards.map((item) => {
    const card = template.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");

    // Подставляем значения из объекта item
    cardImage.src = item.link;
    cardTitle.textContent = item.name;

    // Слушаем клики на кнопке
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", (e) => deleteCard(e));

    // Записываем карточку в cardTemplate
    return card;
  });

  // Возвращаем готовый массив из всех карточек с нужными значениями внутри
  return cardTemplate;
};

// При клике на корзину удялем нужную карточку
const deleteCard = (e) => e.target.closest("li").remove();

// Рендерим полный список карточек разворачивая массив, возвращающий разметку
cardContainer.append(...createCard(initialCards, deleteCard));
