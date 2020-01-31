import checkTargetClassInPath from '../utils/pathChecker.js';

export default class Gallery {
  constructor(staticGallery, dynamicGallery) {
    this.dynamicGallery = dynamicGallery;
    this.staticGallery = staticGallery;
  }

  init() {
    this.addClickEventListener();
    this.addTransitionEventlistener();
  }

  addClickEventListener() {
    this.dynamicGallery.addEventListener('click', (event) => {
      let targetElParentContainer;

      // event path for differents browser:
      const eventPath = event.path || (event.composedPath && event.composedPath());

      // check what button was pressed
      const pressedElement = checkTargetClassInPath(eventPath, event.currentTarget, 'item__text-button')
        || checkTargetClassInPath(eventPath, event.currentTarget, 'item__info-button');

      // if not button, return
      if (!pressedElement) {
        return;
      }

      // get an html element of list
      targetElParentContainer = pressedElement;
      while (!targetElParentContainer.classList.contains('section__gallery-item')) {
        targetElParentContainer = targetElParentContainer.parentNode;
      }

      // message element
      const targetElMessage = targetElParentContainer.querySelector('.item__info-wrapper');

      // add/remove classes on message element
      if (pressedElement.classList.contains('item__text-button')) {
        targetElMessage.classList.remove('_hidden');
        targetElMessage.classList.remove('_transparent');
      } else if (pressedElement.classList.contains('item__info-button')) {
        targetElMessage.classList.add('_transparent');
      }
    });
  }

  addTransitionEventlistener() {
    this.dynamicGallery.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'opacity') {
        return;
      }

      event.target.classList.add('_hidden');
    });
  }

  fillStaticGallery(dataArray) {
    // create gallery nodes array:
    const galleryHTMLcollection = this.staticGallery.children;
    const galleryArray = Array.from(galleryHTMLcollection);

    dataArray.forEach((item, index) => {
      // create html image element
      const image = new Image();
      // add img props
      image.src = item.urls.regular;
      image.alt = item.description;

      image.onload = () => {
        galleryArray[index].children[0].classList.add('_hidden'); // hide loader
        // if image portrait orientation: stretch width
        if (item.width < item.height) {
          image.classList.add('_portrait');
        }

        // append image to list
        galleryArray[index].appendChild(image);
      };
    });
  }
}
