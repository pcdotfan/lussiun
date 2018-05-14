// http request 拦截器
export default function({ $axios, redirect, store }) {
  $axios.onResponse(
    response => {
      return response;
    }, 
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
        }
      }
      return Promise.reject(error.response.data);
    }
  );
  $axios.onRequest(
    config => {
      if (store.state.token) {
        config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
    }, 
    err => {
      return Promise.reject(err);
    }
  );
}
