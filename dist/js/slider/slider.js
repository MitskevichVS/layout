import addSliderEventListeners from '../utils/sliderEventListeners.js';

export default class Slider {
    constructor(element) {
        this.sliderControlsNode = element.children[0];
        this.sliderContentNode = element.children[1];
        this.sliderControls = Array.from(this.sliderControlsNode.children);
        this.sliderContent = Array.from(this.sliderContentNode.children);
    }

    init() {
        addSliderEventListeners.call(this);
    }
}
