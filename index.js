const accessKey = "mNrD-ZlvAjrDZ9OAAVq9dVgQhGz1zyt5nj7DuB5zJx0";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("searchInput");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  // Dynamic url
  const url = `https://api.unsplash.com/search/photos?page=${page}&query
=${inputData}&client_id=${accessKey}`;

  const responce = await fetch(url);
  const data = await responce.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHtml = "";
  }

  //   map

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  // more Page
  page++;
  // Show more Button
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  event.preventDefault();
  page = 1;
  searchImages();
});
