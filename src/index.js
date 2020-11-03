import templateCards from './template-cards.hbs'

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'

const inputEl = document.querySelector('INPUT') 
const cardContainer = document.querySelector('.gallery')

fetchCard().then(renderCard)

function fetchCard() {
        return fetch(`${BASE_URL}&q=dog&page=1&per_page=12&key=8315600-a916a243d8ea2edafddc43bfd`)
        .then(res => {return res.json()})
}

function renderCard(cards) {
    const markup = templateCards(cards.hits)
    cardContainer.innerHTML = markup
}
