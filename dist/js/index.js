import Slider from './slider/slider.js';
import Gallery from './gallery/gallery.js';

window.onload = () => {
    const slidersArray = Array.from(document.querySelectorAll('.section__content-slider'));
    const serviceGalleryElement = document.querySelectorAll('.section__gallery-list')[1];
    const serviceGalleryClass = new Gallery(serviceGalleryElement);

    
    slidersArray.forEach((slider) => {
        const sliderClass = new Slider(slider);
        sliderClass.init();
    });
    
    serviceGalleryClass.init();
};