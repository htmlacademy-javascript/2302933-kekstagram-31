import {getData} from './api.js';
import {debounce, showErrorMessage} from './util.js';
import {renderGallery} from './gallery.js';
import './image-upload-form.js';
import {renderPhotos} from './thumbnails.js';
import {TIMEOUT_DELAY} from './data.js';
import {initFilters, onRandomFilterClick, renderRandomPhotos, sortByComments, onDiscussedFilterClick, onDefaultFilterClick} from './filters.js';
import './upload-image.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    initFilters(photos);
    onRandomFilterClick(debounce(() => renderPhotos(renderRandomPhotos(photos)), TIMEOUT_DELAY));
    onDiscussedFilterClick(debounce(() => renderPhotos(sortByComments(photos)), TIMEOUT_DELAY));
    onDefaultFilterClick(debounce(() => renderPhotos(photos.slice()), TIMEOUT_DELAY));
    renderGallery(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

