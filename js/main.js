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

const messages = 'Всё отлично!\n' +
  'В целом всё неплохо. Но не всё.\n' +
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.\n' +
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.\n' +
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.\n' +
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!\n';

const LINES_OF_MESSAGES = 6;
const SIMILAR_PHOTO_DESCRIPTIONS = 25;

//ВОСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIntegerWithoutRepeat = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//ПЕРЕМЕННЫЕ
const photoId = getRandomIntegerWithoutRepeat(1, 25);
const photoUrl = getRandomIntegerWithoutRepeat(1, 25);
const commentId = getRandomIntegerWithoutRepeat(0, 10000);
const newMessages = messages.split('\n', LINES_OF_MESSAGES);

//СОЗДАНИЕ ОПИСАНИЯ ДЛЯ ФОТО
const createPhotoComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(newMessages),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: photoId(),
  url: `photos/${ photoUrl() }.jpg`,
  description: 'На море',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createPhotoComment)
});

const similarPhotoDescriptions = Array.from({length: SIMILAR_PHOTO_DESCRIPTIONS}, createPhotoDescription);

console.log(similarPhotoDescriptions);
