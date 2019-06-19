const searchForm = document.querySelector('#search-form')
const movie = document.querySelector('#movies')
const apiHost = 'https://api.themoviedb.org'
const imgHost = 'https://image.tmdb.org/t/p/w500'
const apiKey = 'f2136ccacb0977dc008d5ea49c768321'

searchForm.addEventListener('submit', apiSearch);

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
        server = `${apiHost}/3/search/multi?api_key=${apiKey}&language=ru&query=${searchText}`;

  movie.innerHTML = "Загрузка";

  fetch(server)
    .then(function (value) {
      if(value.status !== 200) {
        return Promise.reject(value);
      }
      return value.json();
    })
    .then(function (output) {
      let inner = '';
      output.results.forEach((item) => {
        let nameItem = item.name || item.title,
            img = item.poster_path === null ? '' : `<img src="${imgHost}${item.poster_path}"class="card-img-top img-fluid img-thumbnail" alt="${nameItem}">`,
            overview = item.overview,
            itemDate = (item.release_date !== "" && item.release_date !== undefined) ? (new
              Date(Date.parse(item.release_date))).toLocaleString("ru", {
                day: 'numeric', month: 'long', year: 'numeric',
              }) : 'неизвестно'
        console.log("nameItem : " + nameItem);
        inner += `
          <div class="col-12 col-md-4 mb-5">
            <div class="card">
              ${img}
              <div class="card-body">
                <h5 class="card-title text-success text-center">${nameItem}</h5>
                <p class="text-center text-info">Дата выхода: ${itemDate}</p>
                <p class="text-sm-left">${overview}</p>
              </div>
            </div>
          </div>
          `
      })
      movie.innerHTML = inner;
    })
    .catch(function (reason) {
      movie.innerHTML = 'Упс, что-то пошло не так ';
      console.error('error ' + reason.status);
    })
}


