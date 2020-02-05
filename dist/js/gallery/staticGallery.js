export default class StaticGallery {
  constructor(targetGallery) {
    this.gallery = targetGallery;
  }

  fillStaticGallery(dataArray) {
    // create gallery nodes array:
    const galleryHTMLcollection = this.gallery.children;
    const galleryArray = Array.from(galleryHTMLcollection);

    dataArray.forEach((item, index) => {
      // create html image element
      const image = new Image();
      // add img props
      image.src = item.urls.regular;
      image.alt = item.description || item.alt_description;

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
