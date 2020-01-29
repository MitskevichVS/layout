import addSliderEventListeners from '../utils/sliderEventListeners.js';

export default class Slider {
  constructor(element) {
    [this.sliderControlsNode, this.sliderContentNode] = element.children;
    this.sliderControls = Array.from(this.sliderControlsNode.children);
    this.sliderContent = Array.from(this.sliderContentNode.children);
  }

  init() {
    addSliderEventListeners.call(this);
  }
}
