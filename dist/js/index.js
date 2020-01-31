import Slider from './slider/slider.js';
import Gallery from './gallery/gallery.js';
import HeaderController from './header/headerController.js';
import QueriesController from './queries/queries.js';

window.onload = () => {
  const slidersArray = Array.from(document.querySelectorAll('.section__content-slider'));
  const serviceGalleryElement = document.querySelectorAll('.section__gallery-list')[1];
  const headerMenuContainer = document.querySelector('.header__content-top');
  const headerHeading = document.querySelector('.header__heading');

  const serviceGalleryClass = new Gallery(serviceGalleryElement);
  const headerClass = new HeaderController(headerMenuContainer, headerHeading);
  const queriesClass = new QueriesController();

  slidersArray.forEach((slider) => {
    const sliderClass = new Slider(slider);
    sliderClass.init();
  });

  serviceGalleryClass.init();

  headerClass.init();

  if (window.pageYOffset >= 64) {
    headerClass.handleScrollEvent();
  }

  queriesClass.init();

  setTimeout(() => document.querySelector('.hide').classList.remove('hide'), 250);
};
