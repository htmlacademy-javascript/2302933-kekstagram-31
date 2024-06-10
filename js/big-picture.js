import {photos} from './create-data';
import {isEscapeKey} from './util.js';
import {renderComments, clearComments} from './render-comments';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureContainer = bigPicturePopup.querySelector('.big-picture__img');
const totalComments = bigPicturePopup.querySelector('.social__comment-total-count');
const bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  clearComments();
  bigPicturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigPicture = () => {
  bigPicturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCancelClick);
};

const fillBigPicturePopup = (photoId) => {
  const currentPicture = photos.find((photo) => photo.id === Number(photoId));

  bigPictureContainer.querySelector('img').src = currentPicture.url;
  bigPicturePopup.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicturePopup.querySelector('.social__caption').textContent = currentPicture.description;
  totalComments.textContent = currentPicture.comments.length;

  renderComments(currentPicture.comments);

  openBigPicture();
};

export {fillBigPicturePopup};
