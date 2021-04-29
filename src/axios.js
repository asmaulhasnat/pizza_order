import axios from  'axios'
axios.defaults.baseURL = 'http:localhost/';
//axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('user_token');