import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSearch = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const loading = document.querySelector('.loading');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formSearch.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;

  imageList.innerHTML = '';

  if (!searchQuery.trim()) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#f96c6c',
      backgroundColor: '#f5d1d1',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  loading.classList.remove('is-hidden');

  fetchImages(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          theme: 'dark',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageSize: '16px',
          messageColor: '#f96c6c',
          backgroundColor: '#f5d1d1',
          position: 'topRight',
          timeout: 5000,
        });
      }
      imageList.innerHTML = createMarkup(data.hits);
      gallery.refresh();
    })
    .catch(handleError)
    .finally(() => loading.classList.add('is-hidden'));

  event.currentTarget.reset();
}

function fetchImages(value) {
  const BASE_URL = 'https://pixabay.com/api';

  const searchParams = new URLSearchParams({
    key: '42093886-563b8eca1b4570c32a235ec3c',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}/?${searchParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
      `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          width="360"
        />
      </a>
      <div class="info">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${likes}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${views}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${comments}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');
}

function handleError(err) {
  console.error(err);
  imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: 'Sorry, there is a problem with connection with the server.',
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'center',
    timeout: 5000,
  });
}