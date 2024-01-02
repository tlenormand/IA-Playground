import axios from 'axios';
import { useContext } from 'react';
import Cookies from 'js-cookie';

// TODO: Move this to a config file
const config = {
  API_URL: `http://localhost:3000/api`,
};

let controller;
let canAbort = false; // if a request is running, we can abort it

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const get = async (endpoint, data, params = {}, options = {}) => {
  controller = new AbortController();
  canAbort = true;

  try {
    const response = await axiosInstance.get(endpoint, {
      signal: controller.signal,
      data,
      headers: {},
      params,
      options
    });

    return response.data;
  } catch (err) {
    handleError(err);
  } finally {
    canAbort = false;
  }
};

const post = async (endpoint, data, params = {}, options = {}) => {
  controller = new AbortController();
  canAbort = true;

  try {
    const response = await axiosInstance.post(endpoint, data, {
      signal: controller.signal,
      headers: {},
      params,
      options
    });

    return response.data;
  } catch (err) {
    return err.response.data;
    handleError(err);
  } finally {
    canAbort = false;
  }
};

const put = async (endpoint, data, params = {}, options = {}) => {
  controller = new AbortController();
  canAbort = true;

  try {
    const response = await axiosInstance.put(endpoint, data, {
      signal: controller.signal,
      headers: {},
      params,
      options
    });

    return response.data;
  } catch (err) {
    handleError(err);
  } finally {
    canAbort = false;
  }
};

const del = async (endpoint, data, params = {}, options = {}) => {
  controller = new AbortController();
  canAbort = true;

  try {
    const response = await axiosInstance.delete(endpoint, data, {
      signal: controller.signal,
      headers: {},
      params,
      options
    });

    return response.data;
  } catch (err) {
    handleError(err);
  } finally {
    canAbort = false;
  }
};

const cancelRequest = () => {
  if (canAbort) { controller.abort(); }
  canAbort = false;
};

const handleError = (err) => {
  // Request canceled by the user
  if (axios.isCancel(err)) {
    console.log('Request canceled by the user.');
    return;
  } else {
    console.log(err);
  }
};

const API = () => {
  return {
    get,
    post,
    put,
    del,
    cancelRequest,
    canAbort
  };
};

export default API;