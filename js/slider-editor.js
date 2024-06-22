import {getEffectsSelector} from './util';
import {StyleFilterByEffects, Effects} from './data';

const imageUploadWrapper = document.querySelector('.img-upload__wrapper');
const effectSlider = imageUploadWrapper.querySelector('.effect-level__slider');
const effectLevelInput = imageUploadWrapper.querySelector('.effect-level__value');
effectLevelInput.value = 100;
const effectRadioButtons = imageUploadWrapper.querySelectorAll('.effects__radio');
const effectSliderContainer = imageUploadWrapper.querySelector('.img-upload__effect-level');
const image = imageUploadWrapper.querySelector('.img-upload__preview img');
const imageSelector = image.classList;

const updateSliderOptions = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  image.style.removeProperty('filter');
  effectSliderContainer.classList.add('hidden');
  image.classList.replace(imageSelector, 'effect__preview--none');
};

const onEffectButtonClick = (evt) => {
  const currentRadioButton = evt.target.closest('.effects__radio');
  if (currentRadioButton) {
    const effectButtonValue = currentRadioButton.value;
    image.classList.replace(imageSelector, getEffectsSelector(effectButtonValue));
    updateSliderOptions(effectButtonValue, effectSlider);
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 10,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioButtons.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        effectSliderContainer.classList.remove('hidden');
        image.style.filter = StyleFilterByEffects[item.value](effectLevelInput.value);
      } else {
        resetFilter();
      }
    }
  });
});

export {onEffectButtonClick, resetFilter};
