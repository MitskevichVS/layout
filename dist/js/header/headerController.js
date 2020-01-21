export default class HeaderController {
    constructor(headerContainer) {
        this.headerContainer = headerContainer;
    }

    init() {
        this.scrollListener();
    }

    scrollListener() {
        document.addEventListener('scroll', () => {
            if (pageYOffset >= 64) {
                this.headerContainer.classList.add('_stick');
            } else {
                this.headerContainer.classList.remove('_stick');
            }
        });
    }
}