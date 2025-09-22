const track = document.querySelector('.promocard-track');
const bars = document.querySelectorAll('.progress-bar');
let currentIndex = 0;
const totalSlides = 3;
const delay = 1000;
let interval;

function animateBar(index) {
  bars.forEach((bar, i) => {
    bar.innerHTML = ""; // clear previous
    if (i === index) {
      const animDiv = document.createElement("div");
      animDiv.style.cssText = `
        height: 100%;
        width: 100%;
        background: white;
        transform: scaleX(0);
        transform-origin: left;
        animation: fill 1s linear forwards;
      `;
      bar.appendChild(animDiv);
    }
  });
}

function updateSlide() {
  track.style.transform = `translateX(-${currentIndex * 100}vw)`;
  animateBar(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function startAutoPlay() {
  interval = setInterval(nextSlide, delay);
}

function stopAutoPlay() {
  clearInterval(interval);
}

updateSlide();
startAutoPlay();

document.querySelector('.promocard-container').addEventListener('mouseover', stopAutoPlay);
document.querySelector('.promocard-container').addEventListener('mouseleave', startAutoPlay);