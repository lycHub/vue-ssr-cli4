import request from '../configs/http';

class HomeService {
  constructor() {}
  getBaseInfo() {
    return new Promise((resolve, reject) => {
      request.get('app_v3/api/baseInfo.php').then(response => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          reject(response);
        }
      });
    })
  }
}

export default new HomeService();