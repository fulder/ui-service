/* global axios, axiosTokenInterceptor */
/* exported ShowsApi */
class ShowsApi {
  constructor () {
    this.apiAxios = axios.create({
      baseURL: 'https://api.show.moshan.tv/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiAxios.interceptors.request.use(axiosTokenInterceptor, function (error) {
      console.log(error);
      return Promise.reject(error);
    });
  }

  getItemById(qParams) {
    return this.apiAxios.get(`/shows/${qParams.id}`);
  }

  getItemByApiId (qParams) {
    return this.apiAxios.get(`/shows?${qParams.api_name}_id=${qParams.api_id}`);
  }

  addItem(qParams) {
    const data = {
      api_name: qParams.api_name,
      api_id: qParams.api_id,
    };
    return this.apiAxios.post('/shows', data);
  }
}