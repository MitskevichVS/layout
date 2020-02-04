import Slider from './slider/slider.js';
import InteractiveGallery from './gallery/interactiveGallery.js';
import StaticGallery from './gallery/staticGallery.js';
import HeaderController from './header/headerController.js';
import QueriesController from './queries/queries.js';

window.onload = () => {
  const slidersArray = Array.from(document.querySelectorAll('.section__content-slider'));
  const [staticGallery, interactiveGallery] = document.querySelectorAll('.section__gallery-list');
  const headerMenuContainer = document.querySelector('.header__content-top');
  const headerHeading = document.querySelector('.header__heading');

  const interactGalleryClass = new InteractiveGallery(interactiveGallery);
  const staticGalClass = new StaticGallery(staticGallery);
  const headerClass = new HeaderController(headerMenuContainer, headerHeading);
  const queriesClass = new QueriesController();

  slidersArray.forEach((slider) => {
    const sliderClass = new Slider(slider);
    sliderClass.init();
  });

  interactGalleryClass.init();

  headerClass.init();

  if (window.pageYOffset >= 64) {
    headerClass.handleScrollEvent();
  }

  queriesClass.getJSONfromImageService().then((data) => {
    staticGalClass.fillStaticGallery(data);
  });

  setTimeout(() => document.querySelector('.hide').classList.remove('hide'), 250);
};
