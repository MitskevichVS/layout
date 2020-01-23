import checkTargetClassInPath from '../utils/pathChecker.js';

export default class HeaderController {
    constructor(headerMenuContainer, headerHeading) {
        this.headerMenuContainer = headerMenuContainer;
        this.headerHeading = headerHeading;
    }

    init() {
        this.pageScrollListener();
        this.headerMenuButtonEventListener();
    }

    pageScrollListener() {
        document.addEventListener('scroll', this.scrollEvent.bind(this));
    }

    scrollEvent() {
        if (pageYOffset >= 64) {
            this.headerMenuContainer.classList.add('_stick');
            this.headerHeading.classList.add('_indented');
        } else {
            this.headerMenuContainer.classList.remove('_stick');
            this.headerHeading.classList.remove('_indented');
        }
    }

    headerMenuButtonEventListener() {
        const button = document.querySelector('.header__menu-button');
        const animatedHeaderMenu = document.querySelector('.header__menu');
        button.addEventListener('click', () => {
            button.classList.toggle('_active');
            button.classList.toggle('_not-active');
            animatedHeaderMenu.classList.toggle('_active');
            animatedHeaderMenu.classList.toggle('_not-active');
        });
        document.addEventListener('click', (event) => {
            const targetContainer = event.currentTarget;
            const eventPath = event.path || (event.composedPath && event.composedPath());
            const menuButton = checkTargetClassInPath(eventPath, targetContainer,'header__menu-button');
            const menuBody = checkTargetClassInPath(eventPath, targetContainer, 'header__menu');

            if (!menuButton && !menuBody) {
                button.classList.remove('_active');
                animatedHeaderMenu.classList.remove('_active');

                button.classList.add('_not-active');
                animatedHeaderMenu.classList.add('_not-active');
            }

        });
    }
}