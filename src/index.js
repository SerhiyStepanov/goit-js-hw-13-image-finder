import templateCards from './template-cards.hbs'
import ApiService from './apiService.js'
import debounce from 'lodash.debounce'


const form = document.querySelector('#search-form')
const searchInputEl = document.querySelector('INPUT') 
const cardContainer = document.querySelector('.gallery')
const btnLoadMore = document.querySelector('.load-more')

const apiService = new ApiService()

searchInputEl.addEventListener('input',debounce(onInputSearch,1000))
btnLoadMore.addEventListener('click', onClickBtnLoadMore)



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
    if (event.target.value === '') {
        clearContainer()
       return 
    }
    apiService.searchQuery = event.target.value
    apiService.resetPage()
    try {
    const images = await apiService.fetchCard()
    const render = await renderCard(images)
    } catch (error) {
        onError()
    }
    
}


// function onClickBtnLoadMore(event) {
//     apiService.incrementPage()
//     apiService.fetchCard()
//         .then(renderCard)
//         .catch(onError)
// }

async function onClickBtnLoadMore(event) {
    apiService.incrementPage()
    try {  
        const images = await apiService.fetchCard()
        const render = await renderCard(images)
    } catch (error) {
        onError
    }
        
}


function renderCard(cards) {
    cardContainer.insertAdjacentHTML('beforeend',templateCards(cards))
}


function onError() {
    alert('Упс . Щось пійшло не так !')
}

function clearContainer() {
   cardContainer.innerHTML = "" 
}
