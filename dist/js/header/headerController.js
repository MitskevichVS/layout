export default class HeaderController {
    constructor(headerMenuContainer, headerHeading) {
        this.headerMenuContainer = headerMenuContainer;
        this.headerHeading = headerHeading;
        this.previousYCoordinate = 0;
        this.scrollEventExecutionFlag = false;
        this.headerMenuContainerSize;
    }

    init() {
        this.getHeaderElementSize();
        this.pageScrollListener();
    }

    pageScrollListener() {
        document.addEventListener('scroll', () => {
            if (!this.scrollEventExecutionFlag) {
                requestAnimationFrame(this.scrollEvent.bind(this));
            }
            this.scrollEventExecutionFlag = true;
        });
    }

    scrollEvent() {
        this.scrollEventExecutionFlag = false;  // set event execution flag to false

        const safeIntervalForDebounce = 130; // 150px for debounce (Safari)
        const scrollTopSafeSpace = 50;       // 50px scroll top to show sticky menu
        const scrollValueWithSafeInterval = document.documentElement.scrollHeight - document.documentElement.clientHeight - safeIntervalForDebounce;
        const scrollBounce = scrollValueWithSafeInterval < document.documentElement.scrollTop;      // boolean scroll bounce value

        const deltaOfPreviousAndCurrentCoords = this.previousYCoordinate - pageYOffset;
        const scrollTopValueWithSafeInterval = pageYOffset + scrollTopSafeSpace;


        // Check bounce (for Safari)
        if (scrollBounce) {
            return;
        }

        // Checking conditions for dynamic menu display
        if (deltaOfPreviousAndCurrentCoords >= 0 && this.scrollUpFlag) {
            // this.headerMenuContainer.classList.remove('_hidden');
            // this.scrollUpFlag = true;
        } else if (this.previousYCoordinate <= scrollTopValueWithSafeInterval && pageYOffset >= this.headerMenuContainerSize) {
            this.headerMenuContainer.classList.add('_hidden');
            this.scrollUpFlag = false;
        } else {
            this.headerMenuContainer.classList.remove('_hidden');
            this.scrollUpFlag = true;
        }

        // Checking conditions to fix the menu
        if (pageYOffset >= this.headerMenuContainerSize) {
            this.headerMenuShouldStick();
        } else {
            this.headerMenuShouldStickOut();
        }

        this.previousYCoordinate = pageYOffset; //  update previous coordinate
    }

    getHeaderElementSize() {
        const elementHeight = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('height'), 10);
        const elementMargin = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('top'), 10);

        this.headerMenuContainerSize = elementHeight + elementMargin;
    }

    headerMenuShouldStick() {
        if (this.headerMenuContainer.classList.contains('_stick')) {
            return;
        }
        this.headerMenuContainer.classList.add('_stick');
    }

    headerMenuShouldStickOut() {
        if (!this.headerMenuContainer.classList.contains('_stick')) {
            return;
        }
        this.headerMenuContainer.classList.remove('_stick');
    }
}