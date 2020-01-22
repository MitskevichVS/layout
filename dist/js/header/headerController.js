export default class HeaderController {
    constructor(headerMenuContainer, headerHeading) {
        this.headerMenuContainer = headerMenuContainer;
        this.headerHeading = headerHeading;
    }

    init() {
        this.pageScrollListener();
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
}