import axios from "axios";
import { useHistory } from "react-router-dom";

export default class authService {
  init = () => {
    this.setInterceptors();
  };

  setInterceptors = () => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Reject promise if usual error
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        axios.interceptors.response.eject(interceptor);

        const refreshInstance = axios.create();

        const data = {
          accessToken: sessionStorage.getItem("accessToken"),
          refreshToken: sessionStorage.getItem("refreshToken"),
          userId: sessionStorage.getItem("userId")
        };

        return refreshInstance
          .post(`http://localhost:3001/auth/refreshToken`, data)
          .then((response) => {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            error.response.config.headers["Authorization"] =
               "Bearer " + response.data.accessToken;
            return axios(error.response.config);
          })
          .catch((error) => {
            let history = useHistory();
            history.push("/login");
            console.log("Can't refresh token!")
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("name");
            return Promise.reject(error);
          })
      }
    );
  };
}
