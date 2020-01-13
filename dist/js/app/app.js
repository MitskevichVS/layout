export default class App {
    constructor() {
        this.firstSliderControlsNode = document.querySelector('.slider__controls');;
        this.firstSliderContentNode = document.querySelector('.content__slider');;
        this.firstSliderControls = null;
        this.firstSliderContent = null;
    }

    start() {
        this.firstSliderControls = Array.prototype.slice.call(this.firstSliderControlsNode.children);
        this.firstSliderContent = Array.prototype.slice.call(this.firstSliderContentNode.children);

        this.addSliderEventListeners();
    }

    addSliderEventListeners() {
        this.firstSliderControlsNode.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('controls')){
                return;
            }
            const selectedIndex = this.firstSliderControls.indexOf(target);

            this.firstSliderControls.forEach((item) => {
                item.classList.remove('selected__control');
            });

            target.classList.add('selected__control');

            this.firstSliderContent.forEach((item, index) => {
                item.classList.remove('selected__image');
                if (index === selectedIndex + 1) {
                    item.classList.add('selected__image');
                }
            });
        });
    }
}