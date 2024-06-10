let comments = [];
const COUNT_STEP = 5;
let currentCount = 0;

const bigPicturePopup = document.querySelector('.big-picture');
const commentsLoader = bigPicturePopup.querySelector('.social__comments-loader');
const socialCommentsList = bigPicturePopup.querySelector('.social__comments');
const socialCommentTemplate = bigPicturePopup.querySelector('.social__comment');
const commentsShown = bigPicturePopup.querySelector('.social__comment-shown-count');
socialCommentsList.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    socialCommentTemplate.querySelector('.social__picture').alt = comment.name;
    socialCommentTemplate.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsList.appendChild(socialCommentsFragment);
  commentsShown.textContent = renderedCommentsLength;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPictureComments) => {
  comments = currentPictureComments;
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export {renderComments, clearComments};
