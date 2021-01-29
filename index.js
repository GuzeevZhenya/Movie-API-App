// const APIURL = 'https://api.themoviedb.org/3/';
// const APIKEY = '04c35731a5ee918f014970082a0088b1';
let page = 1;
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const buttonNext = document.querySelector('.button-next');
const buttonPrev = document.querySelector('.button-prev');

buttonNext.addEventListener('click', (e) => {
    ++page;
    const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
    getMovies(APIURL);
})

buttonPrev.addEventListener('click', (e) => {
    page--;
    const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
    getMovies(APIURL);
})


getMovies(APIURL);

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    console.log(respData.page);
    if(respData.page ===1){
        buttonPrev.style.display="none";
    }
    else{
        buttonPrev.style.display="block";
    }

    showMovies(respData.results);

}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
				<img src="${IMGPATH + poster_path}" 
				alt="${title}">
				<div class="movie-info">
						<h3>${title}</h3>
						<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
        </div>
        
		<div class="overview">
		<h4>Overview:</h4>
		${overview}
		</div>
	`;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else if(vote ==0) {
        return 'red';
    }else{
        return "white"
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});