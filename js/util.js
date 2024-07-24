//ВОСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const REMOVE_MESSAGE_TIMEOUT = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getEffectsSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-heat': 'effects__preview--heat',
    'effect-phobos': 'effects__preview--phobos',
  };
  return selectors[currentInputId];
};

function getRandomElement (elements) {
  let randomElement;
  const availableIndexes = [];
  for(let i = 0; i <= elements.length - 1; i++) {
    availableIndexes.push(i);
  }
  function getElement() {
    const randomIndex = getRandomInteger(0, availableIndexes.length - 1);
    const elementFromAvailableIndexes = availableIndexes[randomIndex];
    availableIndexes.splice(randomIndex, 1);
    randomElement = elements[elementFromAvailableIndexes];
    return randomElement;
  }
  return getElement;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = (message) => {
  const errorNode = errorLoadDataTemplate.cloneNode(true);

  if (message) {
    errorNode.querySelector('.data-error__title').textContent = message;
  }

  document.body.append(errorNode);

  const errorLoadDataNode = document.body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataNode.remove();
  }, REMOVE_MESSAGE_TIMEOUT);

};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInteger, isEscapeKey, getEffectsSelector, showErrorMessage, debounce, getRandomElement};
