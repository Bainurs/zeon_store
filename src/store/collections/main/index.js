import {makeAutoObservable} from "mobx";
import Collections from "../../dispatch/collections";

export default class MainCollections {

    collections = []
    limit= 4
    offset = 0
    isLast = false
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    async getProducts() {
        try {
            const response = await Collections.getAll(this.limit)
            this.collections = await response.data.results
        } catch (e) {
            console.log(e)
        }
    }

    async getNext() {
        try {
            this.offset = this.offset + 4
            const response = await Collections.getAll(this.limit, this.offset)
            this.collections = this.collections.concat(response.data.results)
            this.count = response.data.count
            if(this.collections.length === this.count) {
                this.isLast = true
            }
        } catch (e) {
            console.log(e)
        }

    }
}