// advatise
const track = document.querySelector('.advatise-track');
    const bars = document.querySelectorAll('.progress-bar');
    let currentIndex = 0;
    const totalSlides = 4;
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

    // Start
    updateSlide();
    startAutoPlay();

    // Optional: Pause on hover
    document.querySelector('.advatise-container').addEventListener('mouseover', stopAutoPlay);
    document.querySelector('.advatise-container').addEventListener('mouseleave', startAutoPlay);
