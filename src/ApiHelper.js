import axios from "axios";
import defaultInterceptors from "./interceptors.js";

const defaultOptions = {
  baseURL: window.location.origin,
  timeout: 20000,
  headers: {
    "Content-type": "application/json"
  }
};

function xhr(options = {}, interceptors = defaultInterceptors) {
  const agent = axios.create({ ...defaultOptions, ...options });
  if (interceptors && interceptors.request) {
    agent.interceptors.request.use(
      interceptors.request.fulfilled,
      interceptors.request.rejected
    );
  }
  if (interceptors && interceptors.response) {
    agent.interceptors.response.use(
      interceptors.response.fulfilled,
      interceptors.response.rejected
    );
  }
  return agent;
}

export default xhr;
