import {photos} from './createData';
import {isEscapeKey} from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureContainer = bigPicturePopup.querySelector('.big-picture__img');
const commentsCount = bigPicturePopup.querySelector('.social__comment-count');
const commentsLoader = bigPicturePopup.querySelector('.comments-loader');
const bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicturePopup.querySelector('.social__comments');
const socialCommentTemplate = bigPicturePopup.querySelector('.social__comment');

const onBigPictureCancelClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigPicture = () => {
  bigPicturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCancelClick);
};

const fillBigPicturePopup = (photoId) => {
  const currentPicture = photos.find((photo) => photo.id === Number(photoId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureContainer.querySelector('img').src = currentPicture.url;
  bigPicturePopup.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicturePopup.querySelector('.social__caption').textContent = currentPicture.description;
  socialCommentsList.innerHTML = '';

  currentPicture.comments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    socialCommentTemplate.querySelector('.social__picture').alt = comment.name;
    socialCommentTemplate.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsList.appendChild(socialCommentsFragment);

  openBigPicture();
};

export {fillBigPicturePopup};
