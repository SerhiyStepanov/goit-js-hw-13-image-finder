import templateCards from "./template-cards.hbs";
import ApiService from "./apiService.js";
import debounce from "lodash.debounce";
// import throttle from "lodash.throttle";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const form = document.querySelector("#search-form");
const searchInputEl = document.querySelector("INPUT");
const cardContainer = document.querySelector(".gallery");
// const btnLoadMore = document.querySelector(".load-more");

const apiService = new ApiService();

searchInputEl.addEventListener("input", debounce(onInputSearch, 1000));
cardContainer.addEventListener("click", onClickImage);
// btnLoadMore.addEventListener("click", onClickBtnLoadMore);

// function onInputSearch(event) {
//     if (event.currentTarget.value === '') {
//         clearContainer()
//        return
//     }
//     apiService.searchQuery = event.currentTarget.value

//     apiService.resetPage()
//     apiService.fetchCard().then(renderCard).catch(onError)

// }

async function onInputSearch(event) {
  clearContainer();
  // btnLoadMore.classList.add("hidden");
  if (event.target.value === "") {
    return;
  }

  apiService.searchQuery = event.target.value;
  apiService.resetPage();

  try {
    const images = await apiService.fetchCard();
    renderCard(images);
    if (images.length === 12) {
      sectionObserver();
      // btnLoadMore.classList.remove("hidden");
    }
  } catch (error) {
    onError();
  }
}

function sectionObserver() {
  const targetObserver = document.querySelector(".observer");

  const callback = (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && apiService.searchQuery !== "") {
        apiService.incrementPage();
        const images = await apiService.fetchCard();
        renderCard(images);
      }
    });
  };

  const observer = new IntersectionObserver(callback, { rootMargin: "100px" });
  observer.observe(targetObserver);
}

// function onClickBtnLoadMore(event) {
//     apiService.incrementPage()
//     apiService.fetchCard()
//         .then(renderCard)
//         .catch(onError)
// }

// async function onClickBtnLoadMore(event) {
//   apiService.incrementPage();

//   try {
//     const images = await apiService.fetchCard();
//     renderCard(images);
//     scrollTo({
//       top: document.body.scrollHeight,
//       behavior: "smooth",
//     });
//     if (images.length < 12) {
//       console.log(images);
//       btnLoadMore.classList.add("hidden");
//     }
//   } catch (error) {
//     onError;
//   }
// }

function renderCard(cards) {
  cardContainer.insertAdjacentHTML("beforeend", templateCards(cards));
}

function onError() {
  alert("Упс . Щось пійшло не так !");
}

function clearContainer() {
  cardContainer.innerHTML = "";
}

function onClickImage(event) {
  // console.log(event.target.src);
  // console.log(event.target.dataset.source);
  if (event.target.nodeName === "IMG") {
    const instance = basicLightbox.create(
      `<img src="${event.target.dataset.source}" width="800" height="600">`
    );
    instance.show();
  }
}
