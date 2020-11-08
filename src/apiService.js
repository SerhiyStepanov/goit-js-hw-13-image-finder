export default class ApiService {
  constructor() {
    this.query = "";
    this.page = 1;
  }

  // fetchCard() {
  //     const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'
  //     return fetch(`${BASE_URL}&q=${this.query}&page=${this.page}&per_page=12&key=8315600-a916a243d8ea2edafddc43bfd`)
  //         .then(res => res.json())
  //         .then(data => {
  //             return data.hits
  //         })
  // }

  async fetchCard() {
    const BASE_URL =
      "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
    const response = await fetch(
      `${BASE_URL}&q=${this.query}&page=${this.page}&per_page=12&key=8315600-a916a243d8ea2edafddc43bfd`
    );
    const data = await response.json();
    const rezult = await data.hits;
    return rezult;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newquery) {
    this.query = newquery;
  }
}
