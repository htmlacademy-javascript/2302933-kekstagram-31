// СОЗДАНИЕ ДАННЫХ

import {getRandomArrayElement, getRandomInteger, getRandomIntegerWithoutRepeat} from './util';
import {MESSAGES, NAMES} from './data';

const LINES_OF_MESSAGES = 6;
const SIMILAR_PHOTO_DESCRIPTIONS = 25;

//ПЕРЕМЕННЫЕ
const photoId = getRandomIntegerWithoutRepeat(1, 25);
const photoUrl = getRandomIntegerWithoutRepeat(1, 25);
const commentId = getRandomIntegerWithoutRepeat(0, 10000);
const newMessages = MESSAGES.split('\n', LINES_OF_MESSAGES);

//СОЗДАНИЕ КОММЕНТАРИЕВ ДЛЯ ФОТО
const createPhotoComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(newMessages),
  name: getRandomArrayElement(NAMES)
});

// СОЗДАНИЕ ОПИСАНИЯ ДЛЯ ФОТО

const createPhotoDescription = () => ({
  id: photoId(),
  url: `photos/${ photoUrl() }.jpg`,
  description: 'На море',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createPhotoComment)
});

const photos = Array.from({length: SIMILAR_PHOTO_DESCRIPTIONS}, createPhotoDescription);

export {photos};
