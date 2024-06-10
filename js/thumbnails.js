import {photos} from './create-data';

const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const similarListFragment = document.createDocumentFragment();

photos.forEach(({id, url, description, likes, comments}) => {
  const userPictureElement = userPictureTemplate.cloneNode(true);

  userPictureElement.dataset.pictureId = id;
  userPictureElement.querySelector('.picture__img').src = url;
  userPictureElement.querySelector('.picture__img').alt = description;
  userPictureElement.querySelector('.picture__likes').textContent = likes;
  userPictureElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(userPictureElement);
});

picturesList.appendChild(similarListFragment);

export {picturesList};
