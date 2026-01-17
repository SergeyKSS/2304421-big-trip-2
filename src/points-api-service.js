import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'big-trip/points'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `big-trip/points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }

}
