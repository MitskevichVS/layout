export default class HeaderController {
    constructor(headerMenuContainer, headerHeading) {
        this.headerMenuContainer = headerMenuContainer;
        this.headerHeading = headerHeading;
        this.previousCoordinate = 0;
        this.scrollUpFlag = false;
    }

    init() {
        this.pageScrollListener();
        //set timer to update scroll coordinate
        setInterval(this.checkPreviousCoordinate.bind(this), 300);
    }

    pageScrollListener() {
        document.addEventListener('scroll', this.scrollEvent.bind(this));
    }

    scrollEvent() {
        const scrollValueWithSafeInterval = document.documentElement.scrollHeight - document.documentElement.clientHeight - 150;
        const scrollBounce = scrollValueWithSafeInterval <= document.documentElement.scrollTop;

        // Check bounce (for Safari)
        if (scrollBounce) {
            return;
        }

        // Checking conditions for dynamic menu display
        if (this.previousCoordinate - pageYOffset >= 0 && this.scrollUpFlag === true) {
            this.headerMenuContainer.classList.remove('_hidden');
            this.scrollUpFlag = true;
        } else if (this.previousCoordinate <= pageYOffset + 70 && pageYOffset >= 100) {
            this.headerMenuContainer.classList.add('_hidden');
            this.scrollUpFlag = false;
        } else {
            this.headerMenuContainer.classList.remove('_hidden');
            this.scrollUpFlag = true;
        }

        // Checking conditions to fix the menu
        if (pageYOffset >= 118) {
            this.headerMenuContainer.classList.add('_stick');
        } else {
            this.headerMenuContainer.classList.remove('_stick');
        }
    }

    checkPreviousCoordinate() {
        // update coordinate
        this.previousCoordinate = pageYOffset;
    };
}