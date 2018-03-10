import axios from 'axios';
import qs from 'qs';

// 登录
export const login = params => { return axios.post(`/admin/login`, qs.stringify(params)); };
export const logout = params => { return axios.get(`/admin/logout`, { params: params }); };

// 获取列表
export const getCardList = params => { return axios.get('/card/list', {params: params}); };
export const getCardEntity = params => { return axios.get('/card/entity', {params: params}); };