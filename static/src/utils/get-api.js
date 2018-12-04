import axios from "axios";

export function getAPI(author, title, genre, limit) {
    let formData = new FormData();
    formData.append("author", author);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("limit", limit);

    return axios.post("/posts", formData);
}
