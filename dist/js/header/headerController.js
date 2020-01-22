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
        button.addEventListener('click', () => {
            button.classList.toggle('_active');
            button.classList.toggle('_not-active');
        })
    }
}