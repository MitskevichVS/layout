export default class QueriesController {
  constructor() {
    // api params: method=flickr.photos.search&api_key=ca574d1cbfff79e8e0d2cfc4de745f3a&tags=winter&format=json&nojsoncallback=1&auth_token=72157712902742938-4811ce1783c86aa4&api_sig=ed94f8b22cfceee2bc07a65e788305ea
    this.flickrApiUrl = 'https://www.flickr.com/services/rest/?';
    this.flickrApiKey = '41f8896bf49f34b7c4a7ba3dc7fbbd06';
  }

  init() {
    this.getJSONfromImageService();
  }

  async getJSONfromImageService() {
    const flickrURl = `${this.flickrApiUrl}`;

    await fetch(flickrURl)
      .then((response) => response.json())
      .then((receivedData) => {
        console.log(receivedData);
      });
  }
}
