import { message } from "ant-design-vue";
import router from "@/router";
import Request from "./request";

const request = new Request({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 10,
  interceptors: {
    requestInterceptors: (config) => {
      // console.log("实例请求拦截器");
      if (localStorage.getItem("token")) {
        config.headers = {
          ...config.headers,
          Authorization: localStorage.getItem("token") as string,
        };
      }
      return config;
    },
    responseInterceptors: (res: any) => {
      if (res.data.code === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        message.error(res.data.message);
        router.push("/login");
      } else {
        return res;
      }
    },
  },
});

export function cancelRequest(url: string) {
  return request.cancelRequest(url);
}
export function cancelAllRequest() {
  return request.cancelAllRequest();
}

export default request;
