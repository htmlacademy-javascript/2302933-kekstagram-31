import {picturesList} from './thumbnails';
import {fillBigPicturePopup} from './bigPicture';

picturesList.addEventListener('click', (evt) => {
  const bigPictureNode = evt.target.closest('.picture');

  if (bigPictureNode) {
    fillBigPicturePopup(bigPictureNode.dataset.pictureId);
  }
});
