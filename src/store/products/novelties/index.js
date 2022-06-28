import {makeAutoObservable} from "mobx";
import Products from "../../dispatch/products";

export default class StoreNovelties {
    products = []
    limit= 4
    offset = 0
    count = 0
    isLast = false

    constructor() {
        makeAutoObservable(this)
    }

    async getProducts() {
        try {
            const response = await Products.getAll(this.limit)
            this.products = await response.data.results
        } catch (e) {
            console.log(e)
        }

    }

    async getNext() {
        try {
            this.offset = this.offset + 4
            const response = await Products.getAll(this.limit, this.offset)
            this.products = this.products.concat(response.data.results)
            this.count = response.data.count
            if(this.products.length === this.count) {
                this.isLast = true
            }
        } catch (e) {
            console.log(e)
        }
    }
}