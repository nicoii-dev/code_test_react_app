import Axios from "axios";
// import { getLocalStorageItem } from "../util/getLocalStorage";

const apiService = Axios.create();

const withToken = (config: { headers: any; }) => {
//   const authToken = getLocalStorageItem("userToken");

  return {
    ...config,
    headers: {
      Accept: "application/json",
      ...config.headers,
    //   ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  };
};

apiService.interceptors.request.use(withToken);
// eslint-disable-next-line no-undef
apiService.defaults.baseURL = `${process.env.REACT_APP_API_LOCAL_URL}`;
// eslint-disable-next-line no-undef
export default apiService;