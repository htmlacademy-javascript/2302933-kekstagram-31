import {isEscapeKey} from './util';
import {isDescriptionValid, isHashtagValid, error} from './validate-form';
import {onEffectButtonClick, resetFilter} from './slider-editor';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadFormOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadFormClose = imageUploadForm.querySelector('.img-upload__cancel');
const fileUpload = imageUploadForm.querySelector('.img-upload__input');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const descriptionInput = imageUploadForm.querySelector('.text__description');
const imageIncreaseButton = imageUploadForm.querySelector('.scale__control--bigger');
const imageDecreaseButton = imageUploadForm.querySelector('.scale__control--smaller');
const imageScaleControl = imageUploadForm.querySelector('.scale__control--value');
const image = imageUploadForm.querySelector('.img-upload__preview img');
const effectsRadioButtonList = imageUploadForm.querySelector('.effects__list');

let scale = 1;
const SCALE_STEP = 0.25;

imageIncreaseButton.addEventListener('click', () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    imageScaleControl.value = `${scale * 100}%`;
  }
});

imageDecreaseButton.addEventListener('click', () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    imageScaleControl.value = `${scale * 100}%`;
  }
});

const onFormOverlayCloseClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeFormOverlay();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== hashtagInput && evt.target !== descriptionInput) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeFormOverlay();
  }
};

imageUploadForm.addEventListener('change', () => {
  imageUploadFormOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageUploadFormClose.addEventListener('click', onFormOverlayCloseClick);
  document.addEventListener('keydown', onEscKeydown);
  effectsRadioButtonList.addEventListener('click', onEffectButtonClick);
});

const closeFormOverlay = () => {
  imageUploadFormOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormClose.removeEventListener('click', onFormOverlayCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
  resetFilter();
  fileUpload.value = '';
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onHashtagInputChange = () => {
  isHashtagValid(hashtagInput.value);
};

const onDescriptionInputChange = () => {
  isDescriptionValid(descriptionInput.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replace(/\s+/g, ' ');
    imageUploadForm.submit();
  }
};

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

pristine.addValidator(descriptionInput, isDescriptionValid, error, 2, false);

hashtagInput.addEventListener('input', onHashtagInputChange);

descriptionInput.addEventListener('input', onDescriptionInputChange);

imageUploadForm.addEventListener('submit', onFormSubmit);
