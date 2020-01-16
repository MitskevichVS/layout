import checkTargetClassInPath from '../utils/pathChecker.js'; 

export default class Gallery {
    constructor(element) {
        this.container = element;
    }

    init() {
        this.addGalleryEventListener();
    }

    addGalleryEventListener() {
        this.container.addEventListener('click', (event) => {
            const eventPath = event.path || (event.composedPath && event.composedPath());
            const pressedElement = checkTargetClassInPath(eventPath, event.currentTarget, 'item__text-button') || checkTargetClassInPath(eventPath, event.currentTarget, 'item__info-button');
            if (!pressedElement) return;
            const targetElParentContainer = pressedElement.parentNode.parentNode;
            if (pressedElement.classList.contains('item__text-button')) {
                targetElParentContainer.children[2].classList.remove('_transparent', '_hidden');
            } else if (pressedElement.classList.contains('item__info-button')) {
                targetElParentContainer.children[2].classList.add('_transparent', '_hidden');
            }
        });
    }
}