import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://10.51.2.230:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    axios.post(API_URL+'logout',{"userId" : this.getCurrentUser().id});
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role
    },
    {
      headers: authHeader()
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  } 

  updateCredentials() {
    if (!localStorage.hasOwnProperty("user")) {
      return new Promise((resolve, reject) => {resolve("Not logged in")});
    }
    return axios.post(API_URL + "refreshtoken",{"refreshToken" : this.getCurrentUser().refreshToken}
    ).then(response => {
      if (response.data.accessToken) {
        let user = this.getCurrentUser();
        user['accessToken'] = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
      }
      return response.data;
    },
    error => {
      if (error.response && error.response.status === 403) {
        this.logout();
      }
      return error.response.data;
    });

  }
}

export default new AuthService();