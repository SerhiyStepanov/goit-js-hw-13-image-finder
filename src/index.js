fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=cat&page=1&per_page=12&key=8315600-a916a243d8ea2edafddc43bfd')
    .then(res => res.json()).then(date => console.log(date))