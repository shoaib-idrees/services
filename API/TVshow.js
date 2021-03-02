const form = document.querySelector('#searchForm');
form.addEventListener('submit' , async function(e) {
    e.preventDefault();
    const searchTerm = form.ELEMENT_NODE.query.value;
    const config = { params: {q: searchTerm, isFunny: 'colt'}}
    const res =await axios.get('http://api.tvmaze.com/singlesearch/shows?q=${searchTerm}');
    makeImages(res.data)
    form.ELEMENT_NODE.query.value ='';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
            
        }
    }
}