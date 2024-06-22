const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const hashtagRules = [
    {
      check: inputArray.some((item) => item === '#'),
      errorMessage: 'Хештег не может состоять только из одной решётки'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      errorMessage: 'Хештег должен начинаться с символа \'#\''
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      errorMessage: 'Хештеги должны разделяться пробелами'
    },
    {
      check: inputArray.some((item , num, array) => array.includes(item, num + 1)),
      errorMessage: 'Хештеги не должны повторяться'
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      errorMessage: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      errorMessage: 'Хештег не может быть больше 20 символов, включая решётку'
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      errorMessage: 'Хештег содержит недопустимые символы'
    }
  ];

  return hashtagRules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.errorMessage;
    }

    return !isInvalid;
  });
};

const isDescriptionValid = (value) => {
  errorMessage = '';
  if (value.length > 140) {
    errorMessage = `Комментарий не может привышать ${MAX_DESCRIPTION_LENGTH} символов`;
    return false;
  }
  return true;
};

export {isDescriptionValid, isHashtagValid, error};
