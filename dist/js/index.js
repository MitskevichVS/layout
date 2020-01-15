import Slider from './slider/slider.js';

window.onload = () => {
    const slidersArray = Array.from(document.querySelectorAll('.section__content-slider'));
    slidersArray.forEach((slider) => {
        const sliderClass = new Slider(slider);
        sliderClass.init();
    });
};