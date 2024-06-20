import {isEscapeKey} from './util';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadFormOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadFormClose = imageUploadForm.querySelector('.img-upload__cancel');
const fileUpload = imageUploadForm.querySelector('.img-upload__input');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const descriptionInput = imageUploadForm.querySelector('.text__description');

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

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
});

const closeFormOverlay = () => {
  imageUploadFormOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormClose.removeEventListener('click', onFormOverlayCloseClick);
  document.removeEventListener('keydown', onEscKeydown);
  fileUpload.value = '';
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const hashtagRules = [
    {
      check: inputArray.some((item) => item === '#'),
      errorMessage: 'Хештег не может состоять только из одной решётки'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      errorMessage: 'Хештег должен начинаться с символа \'#\''
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      errorMessage: 'Хештеги должны разделяться пробелами'
    },
    {
      check: inputArray.some((item , num, array) => array.includes(item, num + 1)),
      errorMessage: 'Хештеги не должны повторяться'
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      errorMessage: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      errorMessage: 'Хештег не может быть больше 20 символов, включая решётку'
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      errorMessage: 'Хештег содержит недопустимые символы'
    }
  ];

  return hashtagRules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.errorMessage;
    }

    return !isInvalid;
  });
};

const isDescriptionValid = (value) => {
  errorMessage = '';
  if (value.length > 140) {
    errorMessage = `Комментарий не может привышать ${MAX_DESCRIPTION_LENGTH} символов`;
    return false;
  }
  return true;
};

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
