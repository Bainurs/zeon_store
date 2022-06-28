import axios from "axios";

export default class Products {
    static async getAll(limit = 8, offset = 0) {
        const response = await axios.get('http://localhost:8000/products/', {
            params: {
                limit: limit,
                offset: offset
            }
        })

        return response;
    }

    static async getById(id) {
        const response = await axios.get(`http://localhost:8000/products/${id}/`)
        return response;
    }

    static async search(text, cancelToken, limit = 8, offset = 0) {
        const response = await axios.get(`http://localhost:8000/products/`, {
            params: {
                search: text,
                limit,
                offset,
            },
            cancelToken: cancelToken.token
        })
        return response;
    }
}