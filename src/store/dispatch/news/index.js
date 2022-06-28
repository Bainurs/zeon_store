import axios from "axios";

export default class News {
    static async getAll(limit = 4, offset = 0) {
        const response = await axios.get('http://localhost:8000/news/', {
            params: {
                limit: limit,
                offset: offset
            }
        })
        return response;
    }
}