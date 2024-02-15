const requestTemplateCreator = (url, method, body) => {
  return fetch(url, {
    method: method || "GET",
    headers: {
      authorization: "b5cac8d6-0312-47a5-8380-33aaffd8133c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const isResultOkChecker = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me"
  ).then((res) => isResultOkChecker(res));
};

export const getCards = () => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/cards"
  ).then((res) => isResultOkChecker(res));
};

export const deleteCardRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/${id}`,
    "DELETE"
  ).then((res) => isResultOkChecker(res))
};

export const patchUserData = (name, description) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me",
    "PATCH",
    { name: name, about: description }
  ).then((res) => isResultOkChecker(res));
};

export const postNewCardRequest = (data) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/cards",
    "POST",
    { name: data.name, link: data.link }
  ).then((res) => isResultOkChecker(res));
};

export const addLikeRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`,
    "PUT"
  ).then((res) => isResultOkChecker(res));
};

export const removeLikeRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`,
    "DELETE"
  ).then((res) => isResultOkChecker(res));
};

export const newAvatarRequest = (avatar) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar",
    "PATCH",
    { avatar: avatar }
  ).then((res) => isResultOkChecker(res));
};
