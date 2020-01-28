import checkTargetClassInPath from '../utils/pathChecker.js';

export default class HeaderController {
  constructor(headerMenuContainer, headerHeading) {
    this.headerMenuContainer = headerMenuContainer;
    this.headerHeading = headerHeading;
    this.previousYCoordinate = 0;
    this.scrollEventExecutionFlag = false;
    this.headerMenuContainerSize = 0;
    this.isHeaderLineShow = false;
    this.docElement = document.documentElement;
    this.headerMenuClassList = this.headerMenuContainer.classList;
    this.headerMenuButton = document.querySelector('.header__menu-button');
    this.headerElement = document.querySelector('.header');
    this.headerClassList = this.headerElement.classList;
    this.closeMenuByMissclick = this.closeMenuByClick.bind(this);
    this.isMenuShow = false;
  }

  init() {
    this.getHeaderElementSize();
    this.addScrollListener();
    this.addButtonEventListener();
    this.smoothScrollInit();
  }

  smoothScrollInit() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (event) {
        event.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }

  addScrollListener() {
    document.addEventListener('scroll', () => {
      if (!this.scrollEventExecutionFlag) {
        requestAnimationFrame(this.handleScrollEvent.bind(this));
        this.scrollEventExecutionFlag = true;
      }
    });
  }

  handleScrollEvent() {
    const scrollTopSafeSpace = 50; // 50px scroll top to show sticky menu
    const scrollBounceValueForSafari = this.docElement.scrollHeight - this.docElement.clientHeight - this.docElement.scrollTop;
    const scrollBounce = scrollBounceValueForSafari < 0; // boolean scroll bounce value

    const deltaOfPreviousAndCurrentCoords = this.previousYCoordinate - window.pageYOffset;
    const scrollTopValueWithSafeInterval = window.pageYOffset + scrollTopSafeSpace;

    // Check bounce (for Safari)
    if (scrollBounce) {
      this.scrollEventExecutionFlag = false; // set event execution flag to false
      return;
    }

    // hide header menu list, if necessary
    if (this.isMenuShow) {
      this.hideMenuList();
      document.removeEventListener('click', this.closeMenuByMissclick);
    }

    // Checking conditions to fix the menu
    if (window.pageYOffset >= this.headerMenuContainerSize) {
      this.stickHeaderLine();
    } else {
      this.unstickHeaderLine();
    }

    // Checking conditions for dynamic menu display
    if (this.previousYCoordinate <= scrollTopValueWithSafeInterval
      && window.pageYOffset >= this.headerMenuContainerSize
      && !(deltaOfPreviousAndCurrentCoords >= 0 && this.isHeaderLineShow)) { // scroll bottom or check scroll more than default menu location
      this.hideHeaderLine();
    } else { // other
      this.showHeaderLine();
    }

    this.previousYCoordinate = window.pageYOffset; //  update previous coordinate
    this.scrollEventExecutionFlag = false; // set event execution flag to false
  }

  addButtonEventListener() {
    this.headerMenuButton.addEventListener('click', () => {
      if (!this.isMenuShow) { // if menu not shown, show it and add event listener to close menu if click was outside
        this.showMenuList();
        requestAnimationFrame(() => document.addEventListener('click', this.closeMenuByMissclick));
      } else {
        this.hideMenuList(); // else hide menu list
      }
    });
  }

  closeMenuByClick(event) {
    console.log(event);
    const targetContainer = event.currentTarget;
    const eventPath = event.path || (event.composedPath && event.composedPath());

    const menuButton = checkTargetClassInPath(eventPath, targetContainer, 'header__menu-button'); // check click on button
    const menuBody = checkTargetClassInPath(eventPath, targetContainer, 'header__menu'); // check click on memu

    if (!menuButton && !menuBody) { // if missclick, hide menu
      this.hideMenuList();
      document.removeEventListener('click', this.closeMenuByMissclick);
    }
  }

  getHeaderElementSize() {
    const elementHeight = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('height'), 10);
    const elementMargin = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('top'), 10);

    this.headerMenuContainerSize = elementHeight + elementMargin;
  }

  stickHeaderLine() {
    if (this.headerMenuClassList.contains('_stick')) {
      return;
    }

    this.headerMenuClassList.add('_stick');
  }

  unstickHeaderLine() {
    if (!this.headerMenuClassList.contains('_stick')) {
      return;
    }

    this.headerMenuClassList.remove('_stick');
  }

  hideHeaderLine() {
    if (this.headerMenuClassList.contains('_hidden')) {
      return;
    }

    this.headerMenuClassList.add('_hidden');
    this.isHeaderLineShow = false;
  }

  showHeaderLine() {
    if (!this.headerMenuClassList.contains('_hidden')) {
      return;
    }

    this.headerMenuClassList.remove('_hidden');
    this.isHeaderLineShow = true;
  }

  showMenuList() {
    this.headerClassList.add('_active');
    this.isMenuShow = true;
  }

  hideMenuList() {
    this.headerClassList.remove('_active');
    this.isMenuShow = false;
  }
}
