document.getElementById('name-film').addEventListener('input', filterToName);
document.getElementById('genre-film').addEventListener('input', filterToGenre);
document.getElementById('year-release').addEventListener('input', filterToYear);
document.getElementById("sort-select").addEventListener('change', filterToWatch);
document.getElementById("sort-select").addEventListener('change', filterToWatch);


const removeAllButton = document.querySelector('.remove-all');
removeAllButton.addEventListener('click', function (e) {
  deleteAllFilms();
});

function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const isWatched = document.getElementById("isWatched").checked;

  const film = {
    title,
    genre,
    releaseYear,
    isWatched,
  };
  
  addFilm(film);
}

async function addFilm(film) {
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
    body: JSON.stringify(film),
    
  });
  fetchFilms();
}

async function renderTable(films) {
  const filmTableBody = document.getElementById("film-tbody");
  filmTableBody.innerHTML = "";

  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button class="btn-remove" id="${film.id}">Удалить</button></td>

    `;
    filmTableBody.appendChild(row);

  });
  
  const removeBtn = document.querySelectorAll('.btn-remove');
  removeBtn.forEach((btn) =>{
    btn.addEventListener('click',  (e) => {
      const btnId = e.target.getAttribute('id');
     deleteFilm(btnId);
    });
  });
 
}

async function deleteFilm(btnId) {
  await fetch(`https://sb-film.skillbox.cc/films/${btnId}`, {
    method: "DELETE",
    headers: {
      email: "ovikdevil@gmail.com"
    }
  })
  fetchFilms();
}

async function deleteAllFilms() {
  await fetch("https://sb-film.skillbox.cc/films/", {
  method: "DELETE",
  headers: {
    email: "ovikdevil@gmail.com"
  }
})
fetchFilms();
}

allFilms = [];



async function fetchFilms() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com"
    }
  });

  allFilms = await filmsResponse.json();
  renderTable(allFilms);
}

function filterToName(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredFilms = allFilms.filter(film => film.title.toLowerCase().includes(searchText));
  renderTable(filteredFilms);
}

function filterToGenre(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredFilms = allFilms.filter(film => film.genre.toLowerCase().includes(searchText))
  renderTable(filteredFilms);
}

function filterToYear(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredFilms = allFilms.filter(film => film.releaseYear.toLowerCase().includes(searchText))
  renderTable(filteredFilms);
}

function filterToWatch(event) {
  const searchValue = event.target.value;

  if (searchValue === 'watch') {
    const filteredWatch = allFilms.filter(film => film.isWatched === true);
    renderTable(filteredWatch);
  } else if (searchValue === 'unwatch') {
    const filteredUnwatch = allFilms.filter(film => film.isWatched === false);
    renderTable(filteredUnwatch);
  } else {
    renderTable(allFilms);
  }
}


document.getElementById("film-form").addEventListener("submit", handleFormSubmit);


fetchFilms();

