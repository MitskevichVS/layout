import checkTargetClassInPath from '../utils/pathChecker.js';

export default class HeaderController {
  constructor(headerMenuContainer, headerHeading) {
    this.headerMenuContainer = headerMenuContainer;
    this.headerHeading = headerHeading;
    this.previousYCoordinate = 0;
    this.scrollEventExecutionFlag = false;
    this.headerMenuContainerSize = 0;
    this.menuShowFlag = false;
    this.docElement = document.documentElement;
    this.headerClassList = this.headerMenuContainer.classList;
  }

  init() {
    this.getHeaderElementSize();
    this.pageScrollListener();
    this.headerMenuButtonEventListener();
  }

  pageScrollListener() {
    document.addEventListener('scroll', () => {
      if (!this.scrollEventExecutionFlag) {
        requestAnimationFrame(this.scrollEvent.bind(this));
        this.scrollEventExecutionFlag = true;
      }
    });
  }

  scrollEvent() {
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

    // Checking conditions to fix the menu
    if (window.pageYOffset >= this.headerMenuContainerSize) {
      this.headerMenuShouldStick();
    } else {
      this.headerMenuShouldStickOut();
    }

    // Checking conditions for dynamic menu display
    if (this.previousYCoordinate <= scrollTopValueWithSafeInterval
      && window.pageYOffset >= this.headerMenuContainerSize
      && !(deltaOfPreviousAndCurrentCoords >= 0 && this.menuShowFlag)) { // scroll bottom or check scroll more than default menu location
      this.headerMenuShouldHide();
    } else { // other
      this.headerMenuShouldShow();
    }

    this.previousYCoordinate = window.pageYOffset; //  update previous coordinate
    this.scrollEventExecutionFlag = false; // set event execution flag to false
  }


  headerMenuButtonEventListener() {
    const headerMenuButton = document.querySelector('.header__menu-button');
    const animatedHeaderMenu = document.querySelector('.header__menu');

    headerMenuButton.addEventListener('click', () => {

        headerMenuButton.classList.toggle('_active');
        headerMenuButton.classList.toggle('_not-active');

        animatedHeaderMenu.classList.toggle('_active');
        animatedHeaderMenu.classList.toggle('_not-active');
    });
    
    document.addEventListener('click', (event) => {
        const targetContainer = event.currentTarget;
        const eventPath = event.path || (event.composedPath && event.composedPath());
        
        const menuButton = checkTargetClassInPath(eventPath, targetContainer,'header__menu-button');
        const menuBody = checkTargetClassInPath(eventPath, targetContainer, 'header__menu');

        if (!menuButton && !menuBody) {
            headerMenuButton.classList.remove('_active');
            animatedHeaderMenu.classList.remove('_active');

            headerMenuButton.classList.add('_not-active');
            animatedHeaderMenu.classList.add('_not-active');
        }

    });
  }

  getHeaderElementSize() {
    const elementHeight = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('height'), 10);
    const elementMargin = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('top'), 10);

    this.headerMenuContainerSize = elementHeight + elementMargin;
  }

  headerMenuShouldStick() {
    if (this.headerClassList.contains('_stick')) {
      return;
    }

    this.headerClassList.add('_stick');
  }

  headerMenuShouldStickOut() {
    if (!this.headerClassList.contains('_stick')) {
      return;
    }

    this.headerClassList.remove('_stick');
  }

  headerMenuShouldHide() {
    if (this.headerClassList.contains('_hidden')) {
      return;
    }

    this.headerClassList.add('_hidden');
    this.menuShowFlag = false;
  }

  headerMenuShouldShow() {
    if (!this.headerClassList.contains('_hidden')) {
      return;
    }

    this.headerClassList.remove('_hidden');
    this.menuShowFlag = true;
  }
}
