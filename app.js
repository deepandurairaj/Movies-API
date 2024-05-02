
const movieName=document.getElementById('searchMovie')
const search=document.getElementById('searchBtn')
const divContainer=document.querySelector('.cardContainer')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '312d15c7f6mshdf4f3c2e753a11ep181ebejsne3c4c1595810',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

search.addEventListener('click',(e)=>{
    const movie=movieName.value;
    divContainer.textContent='';
    if(movie ===''){
        setError("Enter the movie name,Don't Accept Empty Box")
    }
    else{
        //  fetchMovieData(movie);
        setSuccess();
        fetchMovieData(movie);
    }
   
});

async function fetchMovieData(movie){
    try {
        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${movie}`;
        const response = await fetch(url, options);
        console.log(response);
        const data = await response.json();
        console.log(data);
        console.log('----------------------------------------------');
        const listOfData=data.d;

        listOfData.map((lists => {
            console.log(lists);
            // let imgURL;
            const cardData=document.createElement('div');
            cardData.classList.add('col-lg-4');
            cardData.innerHTML=`
            <div class="card">
                <img src="${lists.i.imageUrl}" class="img-fluid w-100" alt="${lists.l}">
                <p>Movie Name: <span>${lists.l}</span><p>
                <p>Year : <span>${lists.y}</span></p>
                <p>rank :<span> ${lists.rank}</span></p>
                <p>Type :<span> ${lists.qid}</span></p>
                <p>Cast :<span> ${lists.s}</span></p>
            </div>
            `;
            divContainer.appendChild(cardData);
        }))
    } catch (error) {
        console.error(error);
    }
}

function setError(message){
    let errorData =document.createElement('p');
    errorData.textContent=message;
    errorData.classList.add('error-text');
    divContainer.appendChild(errorData);
    // errorData.textContent='';
}
function setSuccess(){
    divContainer.textContent='';
}
