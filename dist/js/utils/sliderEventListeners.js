import checkTargetClassInPath from './sliderPathChecker.js';

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

export default addSliderEventListeners;