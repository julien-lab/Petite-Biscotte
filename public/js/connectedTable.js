const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const track = document.querySelector('.track')
const carouselWidth = document.querySelector('.carousel-container').offsetWidth

next.addEventListener('click', () => {
    track.style.transform = `translateX(-${carouselWidth}px)`;
})

prev.addEventListener('click', () => {
    track.style.transform = `translateX(-${0}px)`;
})

