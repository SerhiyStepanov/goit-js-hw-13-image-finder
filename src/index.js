import templateCards from './template-cards.hbs'
import ApiService from './apiService.js'


const form = document.querySelector('#search-form')
const searchInputEl = document.querySelector('INPUT') 
const cardContainer = document.querySelector('.gallery')
const btnLoadMore = document.querySelector('.load-more')

const apiService = new ApiService()

searchInputEl.addEventListener('input', onInputSearch)
btnLoadMore.addEventListener('click', onClickBtnLoadMore)



function onInputSearch(event) {
    if (event.currentTarget.value === '') {
        cardContainer.innerHTML = ""
       return 
    }
    apiService.searchQuery = event.currentTarget.value

    apiService.resetPage()

    apiService.fetchCard().then(renderCard).catch(onError)
    
    
}


function onClickBtnLoadMore(event) {

    apiService.incrementPage()

    apiService.fetchCard().then(renderCard).catch(onError)
    
}


function renderCard(cards) {
    cardContainer.insertAdjacentHTML('beforeend',templateCards(cards))
}

function onError() {
    alert('Упс . Щось пійшло не так !')
}
