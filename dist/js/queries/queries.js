export default class QueriesController {
  constructor() {
    this.imgApiUrl = 'https://api.unsplash.com/search/photos?';
    this.imgApiKey = '006c60908ccf1e3d0cc97d6a3cccb8bc6ca0ad21be33e45275da97139738ac0f';
    this.imgItemsPerPage = 9;
    this.imgResponsePage = Math.floor(Math.random() * 50) + 1; // random page
    this.receivedData = null;
  }

  init() {
    this.getJSONfromImageService();
  }

  async getJSONfromImageService() {
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
        this.receivedData = receivedData;
      })
      .catch((err) => {
        // log error or show error screen
        console.log(err);
      });
  }
}
