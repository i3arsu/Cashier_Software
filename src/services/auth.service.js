import axios from "axios";

const API_URL = "10.51.2.230:8080/api/auth/";

class AuthService {
    login(username, password){
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.acessToken){
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            });
    }

    logout(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();