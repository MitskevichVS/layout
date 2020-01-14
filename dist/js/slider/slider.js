export default class Slider {
    constructor(element) {
        this.sliderControlsNode = element.children[0];
        this.sliderContentNode = element;
        this.sliderControls = Array.from(this.sliderControlsNode.children);
        this.sliderContent = Array.from(this.sliderContentNode.children);
    }

    addSliderEventListeners() {
        this.sliderControlsNode.addEventListener('click', (event) => {
            if (!event.target.classList.contains('controls__control')) {
                return;
            }

            const selectedIndex = this.sliderControls.indexOf(event.target);

            this.sliderControls.forEach((item) => {
                item.classList.remove('selected__control');
            });

            event.target.classList.add('selected__control');

            this.sliderContent.forEach((item, index) => {
                item.classList.remove('selected__image');
                if (index === selectedIndex + 1) {
                    item.classList.add('selected__image');
                }
            });
        });
    }
}