// const sortSelect = document.querySelector('.sort-select');
// console.log(sortSelect.options[sortSelect.selectedIndex]);

// sortSelect.addEventListener('change',  (e) => {
//   const selectOptions = sortSelect.options[sortSelect.selectedIndex];
//   console.log(selectOptions);
//   if (selectOptions.classList.contains('watch')) {
//     console.log('Выбрано "Просмотренные"! ');
//   }
// });

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

document.getElementById("film-form").addEventListener("submit", handleFormSubmit);

renderTable();

