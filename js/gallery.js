import {picturesList} from './thumbnails';
import {fillBigPicturePopup} from './big-picture';

const renderGallery = (photos) => {
  picturesList.addEventListener('click', (evt) => {
    const bigPictureNode = evt.target.closest('.picture');

    if (bigPictureNode) {
      evt.preventDefault();
      fillBigPicturePopup(photos, bigPictureNode.dataset.pictureId);
    }
  });
};

export {renderGallery};
