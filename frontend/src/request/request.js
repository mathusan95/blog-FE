import axios from "axios";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
  API_BASE_URL2,
} from "@/config/serverApiConfig";
import { token as tokenCookies } from "@/auth";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

// const headersInstance = { [ACCESS_TOKEN_NAME]: tokenCookies.get() };

const axiosInstance = axios.create({
  baseURL: API_BASE_URL2,
  withCredentials: false,
  timeout: 30000,
  // headers: {
  //   ...headersInstance,
  // },
});

const request = {
  create: async (entity, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    console.log("jsonData", jsonData);
    try {
      const response = await axiosInstance.post(entity + "/create", jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  createTagsData: async (entity, jsonData) => {
    // axiosInstance.defaults.headers = {
    //   ...headersInstance,
    // };
    try {
      const response = await axiosInstance.post(entity, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async (entity, id) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entity + "/read/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async (entity, id, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(
        entity + "/update/" + id,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (entity, id, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.delete(entity + "/delete/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async (entity, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      let filter = option.filter ? "filter=" + option.filter : "";
      let equal = option.equal ? "&equal=" + option.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axiosInstance.get(entity + "/filter" + query);
      return { ...response.data, success: true };
      // return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async (entity, source, option = {}) => {
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    try {
      let query = "";
      if (option !== {}) {
        let fields = option.fields ? "fields=" + option.fields : "";
        let question = option.question ? "&q=" + option.question : "";
        query = `?${fields}${question}`;
      }
      // headersInstance.cancelToken = source.token;
      const response = await axiosInstance.get(entity + "/search" + query, {
        cancelToken: source.token,
      });

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (entity, option = {}) => {
    // axiosInstance.defaults.headers = {
    //   [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    // };
    // console.log(tokenCookies.get());
    try {
      let query = "";
      if (option !== {}) {
        let page = option.page ? "page=" + option.page : "";
        let limit = option.limit ? "&limit=" + option.limit : "";
        let filters = option.filters ? "&filters=" + option.filters : "";
        let searchString = option.searchString
          ? "&searchString=" + option.searchString
          : "";
        let sortBy = option.sortingObj
          ? "&sortBy=" + option.sortingObj.field
          : "";
        let sorting = option.sortingObj
          ? "&sorting=" + option.sortingObj.order
          : "";

        query = `?${page}${filters}${searchString}${limit}${sortBy}${sorting}`;
      }
      const response = await axiosInstance.get(entity + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  getTags: async (entity) => {
    try {
      const response = await axiosInstance.get(entity + `?page=1&limit=20`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  post: async (entityUrl, jsonData, option = {}) => {
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async (entityUrl) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
      s;
    }
  },
  patch: async (entityUrl, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    // const CancelToken = await axiosInstance.CancelToken;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
