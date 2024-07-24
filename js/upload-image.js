const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const imagePreviewEffects = document.querySelectorAll('.effects__preview');

imageUploadInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const url = URL.createObjectURL(file);
    imageUploadPreview.src = url;
    imagePreviewEffects.forEach((effect) => {
      effect.style.backgroundImage = `url(${url})`;
    });
  }
});
