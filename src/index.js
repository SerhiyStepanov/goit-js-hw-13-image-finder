import templateCards from './template-cards.hbs'

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'

const form = document.querySelector('#search-form')
const searchInputEl = document.querySelector('INPUT') 
const cardContainer = document.querySelector('.gallery')

searchInputEl.addEventListener('input',onInputSearch)

function onInputSearch(event) {
    const searchQuery = event.currentTarget.value
    console.log(searchQuery)

    fetchCard(searchQuery)
    .then(renderCard)
    .catch(onError)
    .finally()
}


function fetchCard(search) {
        return fetch(`${BASE_URL}&q=${search}&page=1&per_page=12&key=8315600-a916a243d8ea2edafddc43bfd`)
        .then(res => {return res.json()})
}


function renderCard(cards) {
    const markup = templateCards(cards.hits)
    cardContainer.innerHTML = markup
}

function onError() {
    alert('Упс . Щось пійшло не так !')
}

