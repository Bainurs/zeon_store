import axios from "axios";

export default class Questions {
    static async getAll() {
        const response = await axios.get('http://localhost:8000/questions/')
        return response;
    }
}