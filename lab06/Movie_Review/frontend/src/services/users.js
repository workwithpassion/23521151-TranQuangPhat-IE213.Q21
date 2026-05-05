import axios from "axios";

class UserDataService{
    static async login(username, id){
        return await axios.post(`http://localhost:80/api/v1users/login`, {username, id});
    }
}

export default new UserDataService();