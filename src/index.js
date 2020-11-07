import templateCards from './template-cards.hbs'
import ApiService from './apiService.js'
import debounce from 'lodash.debounce'
import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'


const form = document.querySelector('#search-form')
const searchInputEl = document.querySelector('INPUT') 
const cardContainer = document.querySelector('.gallery')
const btnLoadMore = document.querySelector('.load-more')

const apiService = new ApiService()

searchInputEl.addEventListener('input', debounce(onInputSearch, 1000))
cardContainer.addEventListener('click',onClickImage)
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
        // window.scrollTo({ top: 0, behavior: 'instant' })
        renderCard(images)
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
        renderCard(images)
    } catch (error) {
        onError
    }  
}


function renderCard(cards) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    cardContainer.insertAdjacentHTML('beforeend', templateCards(cards))
    
}

function onError() {
    alert('Упс . Щось пійшло не так !')
}

function clearContainer() {
   cardContainer.innerHTML = "" 
}

function onClickImage(event) {
    
    if (event.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(`<img src="${event.target.src}" width="800" height="600">`)
        instance.show()
    }
}