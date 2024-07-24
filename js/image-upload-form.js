import {isEscapeKey} from './util';
import {isDescriptionValid, isHashtagValid, error} from './validate-form';
import {onEffectButtonClick, resetFilter} from './slider-editor';
import {appendNotification} from './notification-module.js';
import {sendData} from './api.js';

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
const formSubmitButton = imageUploadForm.querySelector('.img-upload__submit');
const templateError = document.querySelector('#error').content;
const templateSuccess = document.querySelector('#success').content;

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

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__hashtags-label',
  errorTextParent: 'text__hashtags-label',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const closeFormOverlay = () => {
  imageUploadForm.reset();
  imageUploadFormOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormClose.removeEventListener('click', onFormOverlayCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
  resetFilter();
  image.style.removeProperty('transform');
  imageScaleControl.value = '100%';
  scale = 1;
  fileUpload.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  pristine.reset();
};

const onHashtagInputChange = () => {
  isHashtagValid(hashtagInput.value);
};

const onDescriptionInputChange = () => {
  isDescriptionValid(descriptionInput.value);
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const disableButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

const enableButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;
};

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    disableButton(SubmitButtonText.SENDING);

    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess, () => closeFormOverlay());
    } catch (e) {
      appendNotification(templateError);
    } finally {
      enableButton(SubmitButtonText.IDLE);
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendFormData(evt.target);
};

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

pristine.addValidator(descriptionInput, isDescriptionValid, error, 2, false);

hashtagInput.addEventListener('input', onHashtagInputChange);

descriptionInput.addEventListener('input', onDescriptionInputChange);

imageUploadForm.addEventListener('submit', onFormSubmit);
