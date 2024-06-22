//ДАННЫЕ

const NAMES = [
  'Иван',
  'Вера',
  'Петя',
  'Лера',
  'Женя',
  'Сева',
  'Юра',
  'Виталя',
  'Аркадий',
  'Влад',
  'Анна',
  'Дмитрий',
  'Анастасия',
];

const MESSAGES = 'Всё отлично!\n' +
  'В целом всё неплохо. Но не всё.\n' +
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.\n' +
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.\n' +
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.\n' +
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!\n';

const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const sliderOptionsObjectPhobos = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsObjectHeat = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const Effects = {
  none: sliderOptionsObjectMarvinDefault,
  marvin: sliderOptionsObjectMarvinDefault,
  chrome: sliderOptionsObjectChromeSepia,
  sepia: sliderOptionsObjectChromeSepia,
  phobos: sliderOptionsObjectPhobos,
  heat: sliderOptionsObjectHeat,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value}%)`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const StyleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter,
  marvin: getMarvinStyleFilter,
};

export {NAMES, MESSAGES, Effects, StyleFilterByEffects};
