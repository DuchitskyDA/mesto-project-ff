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

export const getUserData = () => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me"
  ).then((res) => {
    if (res.ok) {
      if (res.ok) {
        return res.json();
      }
    }
  });
};

export const getCards = () => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/cards"
  ).then((res) => {
    if (res.ok) {
      if (res.ok) {
        return res.json();
      }
    }
  });
};

export const deleteCardRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/${id}`,
    "DELETE"
  );
};

export const patchUserData = (name, description) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me",
    "PATCH",
    { name: name, about: description }
  );
};

export const postNewCardRequest = (data) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/cards",
    "POST",
    { name: data.name, link: data.link }
  );
};

export const addLikeRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`,
    "PUT"
  );
};

export const removeLikeRequest = (id) => {
  return requestTemplateCreator(
    `https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`,
    "DELETE"
  );
};

export const newAvatarRequest = (avatar) => {
  return requestTemplateCreator(
    "https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar",
    "PATCH",
    { avatar: avatar }
  );
};
