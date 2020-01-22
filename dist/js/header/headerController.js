export default class HeaderController {
    constructor(headerMenuContainer, headerHeading) {
        this.headerMenuContainer = headerMenuContainer;
        this.headerHeading = headerHeading;
        this.previousCoordinate = window.pageYOffset;
    }

    init() {
        this.pageScrollListener();
    }

    pageScrollListener() {
        document.addEventListener('scroll', this.scrollEvent.bind(this));
    }

    scrollEvent() {

        if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
            return;
        }

        if (this.previousCoordinate < pageYOffset && pageYOffset >= 100) {
            this.headerMenuContainer.classList.add('_hidden');
        } else {
            this.headerMenuContainer.classList.remove('_hidden');
        }

        if (pageYOffset >= 118) {
            this.headerMenuContainer.classList.add('_stick');
        } else {
            this.headerMenuContainer.classList.remove('_stick');
        }

        this.previousCoordinate = pageYOffset;
    }
}