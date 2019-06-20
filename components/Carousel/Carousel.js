class Slideshow {
  constructor(element, duration) {
    this.element = element;
    // How long each slide will stay before moving on to the next
    this.duration = duration;
    this.currentSlideIndex = 0;
    this.slides = Array.from(this.element.querySelectorAll('.slide')).map(
      slide => new Slide(slide, this)
    );
    // Controllers for the prev/next buttons
    this.prevButton = this.element.querySelector('.slide-arrow-prev');
    this.nextButton = this.element.querySelector('.slide-arrow-next');
    this.prevButton.addEventListener('click', () => {
      this.prevSlide();
      this.resetTimer();
    });
    this.nextButton.addEventListener('click', () => {
      this.nextSlide();
      this.resetTimer();
    });
    this.timer = this.startTimer();
  }

  // Resets the timer, mainly for pressing the next/prev buttons so the timer won't conflict with the user
  resetTimer() {
    clearInterval(this.timer);
    this.timer = this.startTimer();
  }

  startTimer() {
    return setInterval(
      () =>
        slideshows.forEach(slideshow => {
          slideshow.nextSlide();
        }),
      this.duration
    );
  }

  nextSlide() {
    const tmp = this.currentSlideIndex;
    this.currentSlideIndex >= this.slides.length - 1
      ? (this.currentSlideIndex = 0)
      : this.currentSlideIndex++;
    this.slides[tmp].deselect();
    this.slides[this.currentSlideIndex].select();
  }

  prevSlide() {
    const tmp = this.currentSlideIndex;
    this.currentSlideIndex <= 0
      ? (this.currentSlideIndex = this.slides.length - 1)
      : this.currentSlideIndex--;
    this.slides[tmp].deselect();
    this.slides[this.currentSlideIndex].select();
  }
}

class Slide {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
  }

  select() {
    this.element.classList.add('current-slide');
  }

  deselect() {
    this.element.classList.remove('current-slide');
  }
}

const slideshows = Array.from(document.querySelectorAll('.slide-show')).map(
  ss => new Slideshow(ss, 10000)
);
