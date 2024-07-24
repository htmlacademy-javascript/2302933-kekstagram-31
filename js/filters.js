import {getRandomElement} from './util.js';
import {renderPhotos} from './thumbnails.js';

const filters = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const RANDOM_PHOTOS_LENGTH = 10;

const initFilters = (photos) =>{
  renderPhotos(photos.slice());
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', (evt)=> {
    const currentFilter = evt.target.closest('.img-filters__button');
    if(currentFilter !== null) {
      const filtersButtons = filters.querySelectorAll('.img-filters__button');
      filtersButtons.forEach((item)=> {
        if(item.classList.contains('img-filters__button--active')){
          item.classList.remove('img-filters__button--active');
        }
      });
      currentFilter.classList.toggle('img-filters__button--active');
    }
  });
};

const renderRandomPhotos = (photos) => {
  const randomPhoto = getRandomElement(photos);
  return new Array(RANDOM_PHOTOS_LENGTH).fill(0).map(() => randomPhoto());
};

const sortByComments = (photos) => {
  const sortedArray = photos.slice();
  sortedArray.sort((a, b) => b.comments.length - a.comments.length);

  return sortedArray;
};

const onDiscussedFilterClick = (cb) => {
  discussedFilter.addEventListener('click', cb);
};

const onDefaultFilterClick = (cb) => {
  defaultFilter.addEventListener('click', cb);
};

const onRandomFilterClick = (cb) => {
  randomFilter.addEventListener('click', cb);
};

export {sortByComments, onDiscussedFilterClick, onDefaultFilterClick, onRandomFilterClick, renderRandomPhotos, initFilters};
