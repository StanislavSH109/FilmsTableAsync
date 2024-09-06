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
  renderTable();
}

async function renderTable() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  
  const films =  await filmsResponse.json();
  const filmTableBody = document.getElementById("film-tbody");

  filmTableBody.innerHTML = "";

  films.forEach((film, index) => {
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
  renderTable();
}

async function deleteAllFilms() {
  await fetch("https://sb-film.skillbox.cc/films/", {
  method: "DELETE",
  headers: {
    email: "ovikdevil@gmail.com"
  }
})
renderTable()
}

allFlims = [];
document.getElementById('name-film').addEventListener('input', filterFilms);

async function fetchFilms() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com"
    }
  });

  allFlims = await filmsResponse.json();

}

function filterFilms(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredFilms = allFlims.filter(film => film.title.toLowerCase().includes(searchText));
  renderTable(filteredFilms);
}

document.getElementById("film-form").addEventListener("submit", handleFormSubmit);

renderTable();
filterFilms();

