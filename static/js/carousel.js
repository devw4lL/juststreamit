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
    x_index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${(x_index * width * 80) / 200 }px)`; //index * carouselWidth - 400
    if (track.offsetWidth - (x_index * width) < width) {
        next.classList.add('hide');
    }
    return x_index;
}

function toThePrev (next, prev, track, x_index, width) {
    x_index--;
    next.classList.remove('hide');
    if(x_index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(${x_index * width + 200}px)`;
    return x_index;
}
