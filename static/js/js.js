
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

let allModalsInfos = [

]

function main() {
    console.log('start API');
    allUrls.forEach((url_value, url_index) => {
        getApiInfos(url_value[0], url_index,5);
        getApiInfos(url_value[1], url_index,2);

    })
}

function getApiInfos(url_value, index, max_get) {
    console.log('start_getApiInfos' + url_value);
    fetch(url_value)
        .then(response => response.json())
        .then( data => {
            //console.log(data)
            for (let element = 0; element < max_get; element++) { // element by cat
                //console.log(data.results[element]);
                //console.log(data.results[element]['id'])
                fetch(base_url + data.results[element]['id']) // get more infos by ids
                    .then(response => response.json())
                    .then(data => {
                        //console.log(data)
                        allResults[index].push(data);
                        if(index === 3 && allResults[0].length === 7 && allResults[1].length === 7
                            && allResults[2].length === 7 && allResults[3].length === 7) { // Fetch finish
                            //console.log('bip');
                            //console.log(allResults);
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
    console.log('fill_all')
    let max_series_view = 6;
    allCategories.forEach((category, index) => {
        //console.log(category);
        for (let imageCounter = 0; imageCounter <= max_series_view; imageCounter++) {
            //console.log(`${results[index][imageCounter].image_url}`)
            //console.log(`${category}_${imageCounter}`)
            //console.log(`${category}_title_${imageCounter}`)
            let carouselImage = document.querySelector(`${category}_${imageCounter}`);
            let carouselTitle = document.querySelector(`${category}_title_${imageCounter}`);
            carouselImage.style.backgroundImage = `url(${results[index][imageCounter].image_url})`;
            carouselTitle.innerHTML = `${results[index][imageCounter].title}`;
        }
    })
}

function fillAllModals(results) {

}

/*------------------------------ CAROUSEL -------------------------------------*/

let best_rating_prev = document.querySelector('.best_rating_prev');
let best_rating_next = document.querySelector('.best_rating_next');
let track_best_rating = document.querySelector('.track_best_rating');

let action_prev = document.querySelector('.action_prev');
let action_next = document.querySelector('.action_next');
let track_action = document.querySelector('.track_action');

let sci_fi_prev = document.querySelector('.sci_fi_prev');
let sci_fi_next = document.querySelector('.sci_fi_next');
let track_sci_fi = document.querySelector('.track_sci_fi');

let crime_prev = document.querySelector('.crime_prev');
let crime_next = document.querySelector('.crime_next');
let track_crime = document.querySelector('.track_crime');

let best_rating_width = document.querySelector('.best_rating_carousel-container').offsetWidth;
let action_width = document.querySelector('.action_carousel-container').offsetWidth;
let sci_fi_width = document.querySelector('.sci_fi_carousel-container').offsetWidth;
let crime_width = document.querySelector('.crime_carousel-container').offsetWidth;

let best_index = 0;
let action_index = 0;
let sci_fi_index = 0;
let crime_index = 0;

//Resize carousel when windows change
window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.best_rating_carousel-container.action_carousel-container.sci_fi_carousel-container.crime_carousel-container').offsetWidth;
})


best_rating_next.addEventListener('click', () => {
    best_index = toTheNext(best_rating_next, best_rating_prev, track_best_rating, best_index, best_rating_width);
})

best_rating_prev.addEventListener('click', () => {
    best_index = toThePrev(best_rating_next, best_rating_prev, track_best_rating, best_index, best_rating_width);
})

action_next.addEventListener('click', () => {
    action_index = toTheNext(action_next, action_prev, track_action, action_index, action_width);
})

action_prev.addEventListener('click', () => {
    action_index = toThePrev(action_next, action_prev, track_action, action_index, action_width);
})

sci_fi_next.addEventListener('click', () => {
    sci_fi_index = toTheNext(sci_fi_next, sci_fi_prev, track_sci_fi, sci_fi_index, sci_fi_width);

})

sci_fi_prev.addEventListener('click', () => {
    sci_fi_index = toThePrev(sci_fi_next, sci_fi_prev, track_sci_fi, sci_fi_index, sci_fi_width);
})

crime_next.addEventListener('click', () => {
    crime_index = toTheNext(crime_next, crime_prev, track_crime, crime_index, crime_width);
})

crime_prev.addEventListener('click', () => {
    crime_index = toThePrev(crime_next, crime_prev, track_crime, crime_index, crime_width);
})

function toTheNext (next, prev, track, x_index, width) {
    //console.log('tothenext:' + next + prev + track + x_index);
    x_index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${(x_index * width * 80) / 100 }px)`; //index * carouselWidth - 400
    if (track.offsetWidth - (x_index * width) < width) {
        next.classList.add('hide');
    }
    return x_index;
}

function toThePrev (next, prev, track, x_index, width) {
    //console.log('totheprev:' + next + prev + track + x_index);
    x_index--;
    next.classList.remove('hide');
    if(x_index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(${x_index * width + 300}px)`;
    return x_index;
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
    //console.log('open')
}

span.onclick = function() {
  modal.style.display = "none";
  //console.log('span')
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    //console.log('windows click')
  }
}

/*-----------------------------GENERIC MODAL----------------------------------------*/

let generic_modal = document.getElementById("my_generic_modal");
let generic_span = document.getElementsByClassName('generic_modal_close')[0];

generic_span.onclick = function() {
  generic_modal.style.display = "none";
  //console.log('span')
}

window.onclick = function(event) {
  if (event.target === generic_modal) {
    modal.style.display = "none";
    //console.log('windows click')
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
    //console.log(cat_id + '   ' + data_id)
    //console.log(allResults[cat_id][data_id])
    //console.log(allResults[cat_id][data_id].image_url)
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