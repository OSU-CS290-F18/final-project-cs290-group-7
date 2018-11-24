import axios from "axios";
import { authHeader } from "./auth-api"

export function postAPI(token, title, genre, file) {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("music", file);

    let headers = authHeader(token);
    headers['headers']["Content-Type"] = 'multipart/form-data';

    return axios.post("/upload", formData, headers);
}
