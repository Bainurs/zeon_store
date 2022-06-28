import {makeAutoObservable} from "mobx";
import News from "../dispatch/news";

export default class StoreNews {

    news = []
    limit= 8
    offset = 0

    constructor() {
        makeAutoObservable(this)
    }

    async getNews() {
        try {
            const response = await News.getAll(this.limit)
            this.news = await response.data.results
        } catch (e) {
            console.log(e)
        }
    }

    async getNextNews() {
        try {
            this.offset = this.offset + 8
            const response = await News.getAll(this.limit, this.offset)
            this.news = [...this.news, ...response.data.results]
        } catch (e) {
            console.log(e)
        }
    }
}