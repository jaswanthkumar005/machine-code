// script.js
const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

// Optional: Auto-play
//setInterval(showNext, 3000); // Change slide every 3 seconds
