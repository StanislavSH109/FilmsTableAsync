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
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  // films.push(film);
  // localStorage.setItem("films", JSON.stringify(films));

  // console.log(film);
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
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  const films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button class="btn-remove" style="padding: 16px; border: none; border-radius: 8px; background-color: red; color: #fff; cursor: pointer; font-weight: 700; width: 150px">Удалить</button></td>
    `;
    filmTableBody.appendChild(row);
  });
}

document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

// Display films on load
renderTable();
