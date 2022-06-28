import axios from "axios";

export default class Collections {
    static async getAll(limit = 8, offset = 0) {
        const response = await axios.get('http://localhost:8000/collections/', {
            params: {
                limit: limit,
                offset: offset
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8000/collections/' + id)
        return response;
    }
}