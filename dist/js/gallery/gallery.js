import checkTargetClassInPath from '../utils/pathChecker.js'; 

export default class Gallery {
    constructor(element) {
        this.container = element;
    }

    init() {
        this.addClickEventListener();
        this.addTransitionEventlistener();
    }

    addClickEventListener() {
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
                targetElMessage.classList.remove('_hidden');
                targetElMessage.classList.remove('_transparent');
            } else if (pressedElement.classList.contains('item__info-button')) {
                targetElMessage.classList.add('_transparent');
                // targetElMessage.classList.add('_hidden');
            }
        });
    }

    addTransitionEventlistener() {
        this.container.addEventListener('transitionend', (event) => {

            if (event.propertyName !== 'opacity') {
                return;
            }

            event.target.classList.add('_hidden');
        }); 
    }
}
