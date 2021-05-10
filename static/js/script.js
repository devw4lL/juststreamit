
const base_url = 'http://localhost:8000/api/v1/titles/'
const allUrls = [
    ['http://localhost:8000/api/v1/titles/?sort_by=-imdb_score',
    'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2'],
    ['http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-votes',
    'http://localhost:8000/api/v1/titles/?genre=Action&page=2&sort_by=-votes'],
    ['http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-votes',
    'http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page=2&sort_by=-votes'],
    ['http://localhost:8000/api/v1/titles/?genre=Crime&sort_by=-votes',
    'http://localhost:8000/api/v1/titles/?genre=Crime&page=2&sort_by=-votes']
]

const allCategories = [
    '#best_rating',
    '#action',
    '#sci-fi',
    '#crime'
]

let allResults = [
    [], //best_ratings
    [], //action
    [], //sci-fi
    [], // crime
]


function main() {
    allUrls.forEach((url_value, url_index) => {
        getApiInfos(url_value[0], url_index,5);
        getApiInfos(url_value[1], url_index,2);

    })
}

function getApiInfos(url_value, index, max_get) {
    fetch(url_value)
        .then(response => response.json())
        .then( data => {
            for (let element = 0; element < max_get; element++) { // element by cat
                fetch(base_url + data.results[element]['id']) // get more infos by ids
                    .then(response => response.json())
                    .then(data => {
                        allResults[index].push(data);
                        if(index === 3 && allResults[0].length === 7 && allResults[1].length === 7
                            && allResults[2].length === 7 && allResults[3].length === 7) { // Fetch finish
                            fillTheBestRating(allResults);
                            fillAllCategory(allResults);
                            fillAllModals(allResults);
                        }
                    })
            }
        })
}


main()


function fillTheBestRating(results) {
    let big_image = document.querySelector('#the_best_rating');
    let small_image = document.querySelector('#the_best_ranting_content');
    let the_best_rating_description = document.querySelector('#the_best_rating_description');
    let the_best_movie_title = document.querySelector('#the_best_rating_title');
    big_image.style.backgroundImage = `url(${results[0][0].image_url})`;
    small_image.style.backgroundImage = `url(${results[0][0].image_url})`;
    the_best_movie_title.innerHTML = results[0][0].title;
    the_best_rating_description.innerHTML = results[0][0].description;
    //add modal
    document.querySelector('#best_rating_img_img').src = `${results[0][0].image_url}`;
    document.querySelector('#best_title').innerHTML = `Genres:&nbsp;&nbsp;${results[0][0].title}`;
    document.querySelector('#best_genre').innerHTML = `Genres:&nbsp;&nbsp;${results[0][0].genres}`;
    document.querySelector('#best_year').innerHTML = `Année de sortie:&nbsp;&nbsp;${results[0][0].year}`;
    document.querySelector('#best_avg_vote').innerHTML = `Votes:&nbsp;&nbsp;${results[0][0].avg_vote}`;
    document.querySelector('#best_imdb_score').innerHTML = `Score IMDB:&nbsp;&nbsp;${results[0][0].imdb_score}`;
    document.querySelector('#best_duration').innerHTML = `Durée:&nbsp;&nbsp;${results[0][0].duration}`;
    document.querySelector('#best_countries').innerHTML = `Pays d\'origine:&nbsp;&nbsp;${results[0][0].countries}`;
    document.querySelector('#best_rated').innerHTML = `Box office:&nbsp;&nbsp;${results[0][0].rated}`;
    document.querySelector('#best_writers').innerHTML = `Réalisateur(s):&nbsp;&nbsp;${results[0][0].writers}`;
    document.querySelector('#best_actors').innerHTML = `Acteurs:&nbsp;&nbsp;${results[0][0].actors}`;
    document.querySelector('#best_resume').innerHTML = `Résumé:&nbsp;&nbsp;${results[0][0].long_description}`;


}

function fillAllCategory(results) {
    let max_series_view = 6;
    allCategories.forEach((category, index) => {
        for (let imageCounter = 0; imageCounter <= max_series_view; imageCounter++) {
            let carouselImage = document.querySelector(`${category}_${imageCounter}`);
            let carouselTitle = document.querySelector(`${category}_title_${imageCounter}`);
            carouselImage.style.backgroundImage = `url(${results[index][imageCounter].image_url})`;
            carouselTitle.innerHTML = `${results[index][imageCounter].title}`;
        }
    })
}



/*-----------------------------BEST RATING MODAL----------------------------------------*/

let modal = document.getElementById("my_best_rating_modal");
let btn = document.getElementById("btn-infos");
let bk_img = document.getElementById("the_best_ranting_content");
let span = document.getElementsByClassName('best_rating_close')[0];

btn.onclick = function() {
  modal.style.display = "flex";
}

bk_img.onclick = function() {
    modal.style.display = "flex";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

/*-----------------------------GENERIC MODAL----------------------------------------*/

let generic_modal = document.getElementById("my_generic_modal");
let generic_span = document.getElementsByClassName('generic_modal_close')[0];

generic_span.onclick = function() {
  generic_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === generic_modal) {
    modal.style.display = "none";
  }
}


let movies = document.getElementsByClassName('img');

for (let i = 0; i < movies.length; i++) {
    let element = movies[i];
    element.onclick = function () {
        genericModal(element.attributes['data-cat'].value, element.attributes['data-id'].value);
    }
}

function genericModal (cat_id, data_id) {
    document.querySelector('#generic_modal_img_img').src = `${allResults[cat_id][data_id].image_url}`;
    document.querySelector('#generic_modal_title').innerHTML = `Genres:&nbsp;&nbsp;${allResults[cat_id][data_id].title}`;
    document.querySelector('#generic_modal_genre').innerHTML = `Genres:&nbsp;&nbsp;${allResults[cat_id][data_id].genres}`;
    document.querySelector('#generic_modal_year').innerHTML = `Année de sortie:&nbsp;&nbsp;${allResults[cat_id][data_id].year}`;
    document.querySelector('#generic_modal_avg_vote').innerHTML = `Votes:&nbsp;&nbsp;${allResults[cat_id][data_id].avg_vote}`;
    document.querySelector('#generic_modal_imdb_score').innerHTML = `Score IMDB:&nbsp;&nbsp;${allResults[cat_id][data_id].imdb_score}`;
    document.querySelector('#generic_modal_duration').innerHTML = `Durée:&nbsp;&nbsp;${allResults[cat_id][data_id].duration}`;
    document.querySelector('#generic_modal_countries').innerHTML = `Pays d\'origine:&nbsp;&nbsp;${allResults[cat_id][data_id].countries}`;
    document.querySelector('#generic_modal_rated').innerHTML = `Box office:&nbsp;&nbsp;${allResults[cat_id][data_id].rated}`;
    document.querySelector('#generic_modal_writers').innerHTML = `Réalisateur(s):&nbsp;&nbsp;${allResults[cat_id][data_id].writers}`;
    document.querySelector('#generic_modal_actors').innerHTML = `Acteurs:&nbsp;&nbsp;${allResults[cat_id][data_id].actors}`;
    document.querySelector('#generic_resume').innerHTML = `Résumé:&nbsp;&nbsp;${allResults[cat_id][data_id].long_description}`;
    generic_modal.style.display = "flex";
}