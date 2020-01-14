export default class Slider {
    constructor(element) {
        this.firstSliderControlsNode = element.children[0];
        this.firstSliderContentNode = element;
        this.firstSliderControls = Array.from(this.firstSliderControlsNode.children);
        this.firstSliderContent = Array.from(this.firstSliderContentNode.children);
    }

    addSliderEventListeners() {
        this.firstSliderControlsNode.addEventListener('click', (event) => {
            if (!event.target.classList.contains('controls__control')) {
                return;
            }

            const selectedIndex = this.firstSliderControls.indexOf(event.target);

            this.firstSliderControls.forEach((item) => {
                item.classList.remove('selected__control');
            });

            event.target.classList.add('selected__control');

            this.firstSliderContent.forEach((item, index) => {
                item.classList.remove('selected__image');
                if (index === selectedIndex + 1) {
                    item.classList.add('selected__image');
                }
            });
        });
    }
}