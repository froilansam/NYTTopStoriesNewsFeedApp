import axios from 'axios';

import { API_CONFIG, ENDPOINTS } from '~/constants/api';

const instance = axios.create({
	baseURL: ENDPOINTS.BASE_URL,
	timeout: API_CONFIG.timeout,
});

export default instance;
