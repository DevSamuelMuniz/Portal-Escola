// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dados.recife.pe.gov.br/dataset/4d3a3b39-9ea9-46ed-bf21-a2670de519c1/resource/7c613836-9edd-4c0f-bc72-495008dd29c3/download/info_escolas_2023_27122023.csv',
});

export default api;
