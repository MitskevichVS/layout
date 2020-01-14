const checkTargetClassInPath = (pathPseudoArray) => {
    let requiredNode = false;
    const pathArray = Array.from(pathPseudoArray);
    pathArray.forEach((node) => {
        if (node.classList !== undefined && node.classList.contains('controls__control-item')){
            requiredNode = node;
        }
    });
    return requiredNode;
}

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

const addSliderEventListeners = function() {
    this.sliderControlsNode.addEventListener('click', (event) => {
        const eventPath = event.path || (event.composedPath && event.composedPath());
        const selectedControl = checkTargetClassInPath(eventPath);

        if (!selectedControl || event.target.classList.contains('_selected-control')) {
            return;
        }

        const selectedIndex = this.sliderControls.indexOf(selectedControl);
        this.sliderControls.forEach((item) => {
            item.classList.remove('_selected-control');
        });

        selectedControl.classList.add('_selected-control');

        this.sliderContent.forEach((item, index) => {
            item.children[0].classList.remove('_selected-item');
            if (index === selectedIndex) {
                item.children[0].classList.add('_selected-item');
            }
        });
    });
}
