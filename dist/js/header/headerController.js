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
    this.headerMenuClassList = this.headerMenuContainer.classList;
    this.headerMenuButton = document.querySelector('.header__menu-button');
    this.header = document.querySelector('.header');
    this.headerClassList = this.header.classList;
    this.closeMenuByMissclick = this.closeMenuByClick.bind(this);
    this.menuListShowFlag = false;
  }

  init() {
    this.getHeaderElementSize();
    this.pageScrollListener();
    this.headerMenuButtonEventListener();
    this.smoothScrollInit();
  }

  smoothScrollInit() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (event) {
        event.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
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

    //hide header menu list, if necessary
    if (this.menuListShowFlag) {
      this.hideMenuList();
      document.removeEventListener('click', this.closeMenuByMissclick);
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
    this.headerMenuButton.addEventListener('click', () => {
      if (!this.menuListShowFlag) {
        this.showMenuList();
        requestAnimationFrame(() => document.addEventListener('click', this.closeMenuByMissclick));
      } else {
        this.hideMenuList();
      }
    });
  }

  closeMenuByClick() {
    const targetContainer = event.currentTarget;
    const eventPath = event.path || (event.composedPath && event.composedPath());
    
    const menuButton = checkTargetClassInPath(eventPath, targetContainer,'header__menu-button');
    const menuBody = checkTargetClassInPath(eventPath, targetContainer, 'header__menu');

    if (!menuButton && !menuBody) {
      this.hideMenuList();
      document.removeEventListener('click', this.closeMenuByMissclick);
    }
  }

  getHeaderElementSize() {
    const elementHeight = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('height'), 10);
    const elementMargin = parseInt(document.defaultView.getComputedStyle(this.headerMenuContainer, '').getPropertyValue('top'), 10);

    this.headerMenuContainerSize = elementHeight + elementMargin;
  }

  headerMenuShouldStick() {
    if (this.headerMenuClassList.contains('_stick')) {
      return;
    }

    this.headerMenuClassList.add('_stick');
  }

  headerMenuShouldStickOut() {
    if (!this.headerMenuClassList.contains('_stick')) {
      return;
    }

    this.headerMenuClassList.remove('_stick');
  }

  headerMenuShouldHide() {
    if (this.headerMenuClassList.contains('_hidden')) {
      return;
    }

    this.headerMenuClassList.add('_hidden');
    this.menuShowFlag = false;
  }

  headerMenuShouldShow() {
    if (!this.headerMenuClassList.contains('_hidden')) {
      return;
    }

    this.headerMenuClassList.remove('_hidden');
    this.menuShowFlag = true;
  }

  showMenuList() {
    this.headerClassList.add('_active');
    this.menuListShowFlag = true;
  }

  hideMenuList() {
    this.headerClassList.remove('_active');
    this.menuListShowFlag = false;
  }
}
