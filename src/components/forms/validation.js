const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((element) => !element.validity.valid);
};

const toggleButtonState = (
  inputList,
  currentSubmitBtn,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    currentSubmitBtn.classList.add(inactiveButtonClass);
    currentSubmitBtn.disabled = true;
  } else {
    currentSubmitBtn.classList.remove(inactiveButtonClass);
    currentSubmitBtn.disabled = false;
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitBtn,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const currentSubmitBtn = formElement.querySelector(submitBtn);
  toggleButtonState(inputList, currentSubmitBtn, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, currentSubmitBtn, inactiveButtonClass);
    });
  });
};

export const enableValidation = (props) => {
  const formList = Array.from(document.querySelectorAll(props.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      props.inputSelector,
      props.submitButtonSelector,
      props.inactiveButtonClass,
      props.inputErrorClass,
      props.errorClass
    );
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const inputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputs.forEach((input) => {
    hideInputError(
      formElement,
      input,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
    input.value = "";
  });
};
