const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const apiHost = 'https://api.themoviedb.org';
const imgHost = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'f2136ccacb0977dc008d5ea49c768321';

const apiSearch = (event) => {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
        server = `${apiHost}/3/search/multi?api_key=${apiKey}&language=ru&query=${searchText}`;
        movies.innerHTML = `<button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Загрузка...
                        </button>`;

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
            img = item.poster_path === null ? `<img src="./img/noposter.jpg" class="card-img-top img-fluid img-thumbnail" alt=" no poster}">`: `<img src="${imgHost}${item.poster_path}"class="card-img-top img-fluid img-thumbnail" alt="${nameItem}">`,
            overview = item.overview,
            itemDate = (item.release_date !== "" && item.release_date !== undefined) ? (new
              Date(Date.parse(item.release_date))).toLocaleString("ru", {
                day: 'numeric', month: 'long', year: 'numeric',
              }) : 'неизвестно'
        // console.log("nameItem : " + nameItem);
        inner += `
          <div class="col-12 col-md-4 ">
            <div class="card shadow mb-5">
              ${img}
              <div class="card-body">
                <h5 class="card-title text-success text-center">${nameItem}</h5>
                <h6 class="text-center text-info font-weight-light">Дата выхода: ${itemDate}</h6>
                <p class="text-sm-left"><small>${cutText(overview, 40, '...')}</small></p>
              </div> 
            </div>
          </div>
          `
      })
      movie.innerHTML = inner;
    })
    .catch( (reason) => {
      movie.innerHTML = 'Упс, что-то пошло не так ';
      console.error('error ' + reason.status);
    })
}

searchForm.addEventListener('submit', apiSearch);

const cutText = (str, num, str2) => {
  let words = str.split(' ');
  if (words.length > num) 
  { return words.slice(0, num).join(' ') + str2 ;}
  else return str;
}

