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
            let targetElParentContainer;
            const eventPath = event.path || (event.composedPath && event.composedPath());
            const pressedElement = checkTargetClassInPath(eventPath, event.currentTarget, 'item__text-button') || 
                                    checkTargetClassInPath(eventPath, event.currentTarget, 'item__info-button');

            if (!pressedElement) {
                return;
            }

            targetElParentContainer = pressedElement;
            while (!targetElParentContainer.classList.contains('section__gallery-item')) {
                targetElParentContainer = targetElParentContainer.parentNode;
            }

            const targetElMessage = targetElParentContainer.querySelector('.item__info-wrapper');

            if (pressedElement.classList.contains('item__text-button')) {
                targetElMessage.classList.remove('_transparent', '_hidden');
            } else if (pressedElement.classList.contains('item__info-button')) {
                targetElMessage.classList.add('_transparent', '_hidden');
            }
        });
    }
}
