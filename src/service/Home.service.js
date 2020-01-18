import request from '../configs/http';
import axios from 'axios';

class HomeService {
  constructor() {}
  getBaseInfo() {
    return new Promise((resolve, reject) => {
      request.get('/app_v3/api/baseInfo.php', {
        // 服务端地址需要写全
        baseURL: 'https://m.zuzuche.com/'
      }).then(response => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          reject(response);
        }
      });
    })
  }

  getTT() {
    return new Promise((resolve, reject) => {
      request.post('/tantu/api/app_index.php').then(response => {
        resolve(response);
      });
    })
  }



  getTestList() {
    return new Promise((resolve, reject) => {
      axios.get('/test/list', {
        proxy: {
          host: '127.0.0.1',
          port: 3333,
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          resolve(data.list);
        } else {
          reject(data);
        }
      });
    })
  }
}

export default new HomeService();
