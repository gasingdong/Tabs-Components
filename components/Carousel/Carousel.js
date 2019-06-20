class Slideshow {
  constructor(element) {
    this.element = element;
    this.currentSlideIndex = 0;
    this.slides = Array.from(this.element.querySelectorAll('.slide')).map(
      slide => new Slide(slide, this)
    );
    // this.prevButton = this.element.querySelector('.slide-arrow-prev');
    // this.nextButton = this.element.querySelector('.slide-arrow-next');
    // this.prevButton.addEventListener('click', () => this.nextSlide());
    // this.nextButton.addEventListener('click', () => this.prevSlide());
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
  ss => new Slideshow(ss)
);
setInterval(
  () =>
    slideshows.forEach(slideshow => {
      slideshow.nextSlide();
    }),
  5000
);
