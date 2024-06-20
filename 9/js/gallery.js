import {picturesList} from './thumbnails';
import {fillBigPicturePopup} from './big-picture';

picturesList.addEventListener('click', (evt) => {
  const bigPictureNode = evt.target.closest('.picture');

  if (bigPictureNode) {
    evt.preventDefault();
    fillBigPicturePopup(bigPictureNode.dataset.pictureId);
  }
});
