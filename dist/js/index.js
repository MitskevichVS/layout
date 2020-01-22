import Slider from './slider/slider.js';
import Gallery from './gallery/gallery.js';
import HeaderController from './header/headerController.js';

window.onload = () => {
    const slidersArray = Array.from(document.querySelectorAll('.section__content-slider'));
    const serviceGalleryElement = document.querySelectorAll('.section__gallery-list')[1];
    const headerMenuContainer = document.querySelector('.header__content-top');
    const headerHeading = document.querySelector('.header__heading');

    const serviceGalleryClass = new Gallery(serviceGalleryElement);
    const headerClass = new HeaderController(headerMenuContainer, headerHeading);
    
    slidersArray.forEach((slider) => {
        const sliderClass = new Slider(slider);
        sliderClass.init();
    });
    
    serviceGalleryClass.init();

    headerClass.init();

    if (pageYOffset >= 64){
        headerClass.scrollEvent();
    }
};