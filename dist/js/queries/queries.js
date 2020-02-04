export default class QueriesController {
  constructor() {
    this.imgApiUrl = 'https://api.unsplash.com/search/photos?';
    this.imgApiKey = '006c60908ccf1e3d0cc97d6a3cccb8bc6ca0ad21be33e45275da97139738ac0f';
    this.imgItemsPerPage = 6;
    this.imgResponsePage = Math.floor(Math.random() * 50) + 1; // random page
    this.receivedData = null;
    // flickr url:
    // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=41f8896bf49f34b7c4a7ba3dc7fbbd06&tags=minimal&per_page=6&format=json&nojsoncallback=1
    // get photos from flickr: https://www.flickr.com/services/api/misc.urls.html
  }

  getJSONfromImageService() {
    const url = `${this.imgApiUrl}query=minimal&client_id=${this.imgApiKey}&per_page=${this.imgItemsPerPage}&page=${this.imgResponsePage}`;

    return fetch(url,
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
        return results;
      })
      .catch((err) => {
        // log error or show error screen
        console.log(err);
      });
  }
}
