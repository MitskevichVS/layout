export default class QueriesController {
  constructor(galleryClass) {
    this.galleryClass = galleryClass;
    this.imgApiUrl = 'https://api.unsplash.com/search/photos?';
    this.imgApiKey = '006c60908ccf1e3d0cc97d6a3cccb8bc6ca0ad21be33e45275da97139738ac0f';
    this.imgItemsPerPage = 6;
    this.imgResponsePage = Math.floor(Math.random() * 50) + 1; // random page
    this.receivedData = /* JSON.parse(localStorage.getItem('data')) || */ null; // remove localstorage after debugging
  }

  init() {
    this.getJSONfromImageService();
  }

  async getJSONfromImageService() {
    /* if (this.receivedData) { // remove localstorage after debugging
      this.galleryClass.fillStaticGallery(this.receivedData);
      return;
    } */

    const url = `${this.imgApiUrl}query=minimal&client_id=${this.imgApiKey}&per_page=${this.imgItemsPerPage}&page=${this.imgResponsePage}`;

    await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => response.json())
      .then((receivedData) => {
        const { results } = receivedData;
        this.receivedData = results;
        this.galleryClass.fillStaticGallery(this.receivedData);
        // localStorage.setItem('data', JSON.stringify(results)); // remove localstorage after debugging
      })
      .catch((err) => {
        // log error or show error screen
        console.log(err);
      });
  }
}
