
const base_url = 'http://localhost:8000/api/v1/titles/';
const url_best_movies_by_imdb_score = '?imdb_score_min=9&sort_by=-imdb_score';
const url_best_movies_by_rating = '?sort_by=-votes';
const url_best_movies_by_rating2 = '?page=2&sort_by=-votes';
const url_best_movies_action1 = '?genre=Action&sort_by=-votes';
const url_best_movies_action2 = '?genre=Action&page=2&sort_by=-votes';
const url_best_movies_sci_fi1 = '?genre=Sci-Fi&sort_by=-votes';
const url_best_movies_sci_fi2 = '?genre=Sci-Fi&page=2&sort_by=-votes';
const url_best_movies_crime1 = '?genre=Crime&sort_by=-votes';
const url_best_movies_crime2 = '?genre=Crime&page=2&sort_by=-votes';


let best_rating_ids = [];
const action_ids = [];
const sci_fi_ids = [];
const crime_ids = [];


class FindBestMovie {
    constructor(base_url) {
        this.base_url = base_url;
        this.id = '';
    }
    getBestMovieId() {
        return fetch(`${base_url}${url_best_movies_by_imdb_score}`)
            .then(res => res.json())
            .then(data => {
                this.id = data.results[0]['id'];
                return this.id;
            })
    }


    getAllIdForCategory(url_page_1, url_page_2) { // METTRE URL1 & URL 2 pour réuse.
        return Promise.all([
            fetch(base_url+url_page_1).then(res => res.json()),
            fetch(base_url+url_page_2).then(res => res.json())
            ]).then(data => {
                console.log(data)
                return data;
        })
    }

    getInfosById () {
        return fetch(`${base_url}`+this.id)
            .then(res => res.json())
            .then(infos => {
                this.title = infos["title"];
                this.img_url = infos["image_url"];
                this.genre = infos["genres"];
                this.year = infos["year"];
                this.avg_vote = infos["avg_vote"];
                this.imdb_score = infos["imdb_score"];
                this.duration = infos["duration"];
                this.description = infos["description"];
                this.long_description = infos["long_description"];
                this.countries = infos["countries"];
                this.rated = infos["rated"];
                this.writers = infos["writers"];
                this.actors = infos["actors"];
                return [this.img_url, this.title, this.genre, this.year, this.avg_vote, this.imdb_score,
                this.duration, this.description, this.long_description, this.countries, this.rated, this.writers,
                this.actors];
            })
    }
}

/* ----------------------- FILL BEST MOVIES SECTION -----------------------*/
const best_movie = new FindBestMovie(base_url);

best_movie.getBestMovieId().then(id => {
    best_movie.getInfosById().then(infos => {
        const best_movie = document.getElementById('best_movie');
        const best_movie_content = document.getElementById('best_movie_content');
        const best_movie_title = document.getElementById('best_movie_title');
        const best_movie_resume = document.getElementById('best_movie_resume');
        const best_movie_img = document.getElementById('best_movie_img');
        const best_movie_infos_1 = document.getElementById('best_movie_infos_1');
        const best_movie_infos_resume = document.getElementById('best_movie_infos_resume');
        let resume = document.createElement('p');
        let title = document.createElement('h1');
        let movie_img = document.createElement('img');
        let genre = document.createElement('li');
        let year = document.createElement('li');
        let avg_vote = document.createElement('li');
        let imdb_score = document.createElement('li');
        let duration = document.createElement('li');
        let description = document.createElement('li');
        let long_description = document.createElement('li');
        let countries = document.createElement('li');
        let rated = document.createElement('li');
        let writters = document.createElement('li');
        let actors = document.createElement('li');
        genre.innerHTML = 'Genres:&nbsp;&nbsp;';
        year.innerHTML = 'Année de sortie:&nbsp;&nbsp;';
        avg_vote.innerHTML = 'Votes:&nbsp;&nbsp;';
        imdb_score.innerHTML = 'Score IMDB:&nbsp;&nbsp;';
        duration.innerHTML = 'Durée:&nbsp;&nbsp;';
        countries.innerHTML = 'Pays d\'origine:&nbsp;&nbsp;';
        rated.innerHTML = 'Box office:&nbsp;&nbsp;';
        writters.innerHTML = 'Réalisateur(s):&nbsp;&nbsp;';
        actors.innerHTML = 'Acteurs:&nbsp;&nbsp;';
        title.textContent = infos[1];
        resume.textContent = infos[7];
        best_movie_resume.appendChild(resume);
        best_movie_title.appendChild(title);
        best_movie.style.backgroundImage = `url(${infos[0]})`;
        best_movie_content.style.backgroundImage = `url(${infos[0]})`;

        /*-------------MODAL------------------*/
        movie_img.src = `${infos[0]}`;
        genre.textContent += infos[2];
        year.textContent += infos[3];
        avg_vote.textContent += infos[4];
        imdb_score.textContent += infos[5];
        duration.textContent += infos[6];
        description.textContent = infos[7];
        long_description.textContent = infos[8];
        countries.textContent += infos[9];
        rated.textContent += infos[10];
        writters.textContent += infos[11];
        actors.textContent += infos[12];

        best_movie_img.appendChild(movie_img);
        best_movie_infos_1.appendChild(genre);
        best_movie_infos_1.appendChild(year);
        best_movie_infos_1.appendChild(avg_vote);
        best_movie_infos_1.appendChild(imdb_score);
        best_movie_infos_1.appendChild(duration);
        best_movie_infos_1.appendChild(countries);
        best_movie_infos_1.appendChild(rated);
        best_movie_infos_1.appendChild(writters);
        best_movie_infos_1.appendChild(actors);
        best_movie_infos_resume.appendChild(long_description);
    })
})

let modal = document.getElementById("my_best_movie_modal");
let btn = document.getElementById("btn-infos");
let bk_img = document.getElementById("best_movie_content");
let span = document.getElementsByClassName('best_movie_close')[0];

btn.onclick = function() {
  modal.style.display = "flex";
}

bk_img.onclick = function() {
    modal.style.display = "flex";
    console.log('open')
}

span.onclick = function() {
  modal.style.display = "none";
  console.log('span')
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    console.log('windows click')
  }
}

/*------------------------------ CATEGORIES ----------------------------*/

const best_movies_by_rating = new FindBestMovie(base_url);
best_movies_by_rating.getAllIdForCategory(url_best_movies_by_rating, url_best_movies_by_rating2)
    .then(data => {
    data.forEach( function (value, index) {
        for (let idx in data[index].results) {
            best_rating_ids.push(data[index].results[idx]['id']);
        }
    })
})

const best_movies_action = new FindBestMovie(base_url);
best_movies_action.getAllIdForCategory(url_best_movies_action1, url_best_movies_action2).then(data => {
    data.forEach( function (value, index) {
        for (let idx in data[index].results) {
            action_ids.push(data[index].results[idx]['id']);
        }
    })
})

const best_movies_sci_fi = new FindBestMovie(base_url);
best_movies_sci_fi.getAllIdForCategory(url_best_movies_sci_fi1, url_best_movies_sci_fi2).then(data => {
    data.forEach( function (value, index) {
        for (let idx in data[index].results) {
            sci_fi_ids.push(data[index].results[idx]['id']);
        }
    })
})

const best_movies_crime = new FindBestMovie(base_url);
best_movies_crime.getAllIdForCategory(url_best_movies_crime1, url_best_movies_crime2).then(data => {
    data.forEach( function (value, index) {
        for (let idx in data[index].results) {
            crime_ids.push(data[index].results[idx]['id']);
        }
    })
})

console.log(best_rating_ids[0])
console.log(best_rating_ids.length)
console.log(typeof best_rating_ids)
console.log(best_rating_ids)

/*
console.log(action_ids);
console.log(sci_fi_ids);
console.log(crime_ids);
*/

/*------------------------------ CAROUSEL -------------------------------------*/

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const track = document.querySelector('.track');
let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

/*----------------FILL CAROUSEL -----------*/
let cover_one = document.querySelector('#cover_one');
let image_one = document.querySelector('#title_one');




//Resize carousel when windows change
window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
    index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${(index * carouselWidth * 80) / 100 }px)`; //index * carouselWidth - 400
    if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        next.classList.add('hide');
    }
})

prev.addEventListener('click', () => {
    index--;
    next.classList.remove('hide');
    if(index === 0) {
        prev.classList.remove('show');
        console.log('sdgfbhjkl')
    }
    track.style.transform = `translateX(${index * carouselWidth + 300}px)`; // index * carouselWidth + 300 (- devant)
})



